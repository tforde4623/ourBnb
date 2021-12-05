import { Switch, Route } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        Hello there from React!
      </Route>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
