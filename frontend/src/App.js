import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from './store/session';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
