import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// take note of this
import { useAppDispatch } from './store';
import * as sessionActions from './store/session';
import { getLocations}  from './store/locations';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import LocationCardIndex from './components/LocationCardIndex'
import AddLocationForm from './components/addLocationForm';
import EditLocationForm from './components/editLocationForm';
import UserLocations from './components/UserLocations';
import ViewLocation from './components/ViewLocation';
import HomePage from './components/HomePage';

function App() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/location-details/:locId'>
              <ViewLocation />
            </Route>
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
