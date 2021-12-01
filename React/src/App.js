import './App.css';
import ListContacts from './components/ListContactsComponent';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import React from 'react';
import UpdateContact from './components/UpdateContactComponent';
import Login from './components/LoginComponent';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/add/:id">
            <UpdateContact />
          </Route>
          <Route exact path="/contact">
            <ListContacts />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
