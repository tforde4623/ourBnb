import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from './store/session';
import * as locationActions from './store/locations';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import LocationCardIndex from './components/LocationCardIndex'
import AddLocationForm from './components/addLocationForm';
import EditLocationForm from './components/editLocationForm';
import UserLocations from './components/UserLocations';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
    dispatch(locationActions.getLocations());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className='content'>
          <Switch>
            <Route path='/add-location'>
              <AddLocationForm />
            </Route>
            <Route path='/user-locations'>
              <UserLocations />
            </Route>
            <Route path='/edit-location/:id'>
              <EditLocationForm />
            </Route>
            <Route path="/any-location">
              <LocationCardIndex />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
