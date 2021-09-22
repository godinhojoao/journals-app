import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// components
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { CreateJournals } from './pages/CreateJournals/CreateJournals';
import { JournalsList } from './pages/JournalsList/JournalsList';
import { NotesList } from './pages/NotesList/NotesList';
import { CreateNotes } from './pages/CreateNotes/CreateNotes';

import { AuthContext } from './context/AuthContext';

function PrivateRoute({ Component, ...rest }: any) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

const Routes = () => {
  const alertOptions = {
    timeout: 3000,
    position: positions.TOP_LEFT,
  };

  return (
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Switch>
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/register" component={() => <Register />} />
          <PrivateRoute
            exact
            path="/journals/create"
            component={() => <CreateJournals />}
          />
          <PrivateRoute
            exact
            path="/journals"
            component={() => <JournalsList />}
          />
          <PrivateRoute
            exact
            path="/journals/:id/notes/create"
            component={() => <CreateNotes />}
          />
          <PrivateRoute
            exact
            path="/journals/:id"
            component={() => <NotesList />}
          />
          <Route component={() => <Redirect to={{ pathname: '/login' }} />} />
        </Switch>
      </AlertProvider>
    </BrowserRouter>
  );
};

export default Routes;
