import Cookies from 'js-cookie';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'DELETE',
  headers?: Record<any, any>,
  body?: string,
}

// a function to make fetch requests with our xsrf token parsed from cookie
export async function csrfFetch(url: string, options: FetchOptions = {}) {
  // setting some "default" values for the options obj
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  // check if mth is not GET
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  // simply call fetch with our fancy options
  const res = await window.fetch(url, {
    body: options.body,
    method: options.method,
    headers: options.headers
  });

  // if we get an error response (above 400) throw that baby
  if (res.status >= 400) throw res;

  // if we get a valid response, or code under 400 return that baby
  return res;
};

// function for use in dev to get xsrf token from "server"
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
};
