import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Landing from './pages/Landing';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Group from './pages/Group';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>

        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile/:id?" component={ProfilePage} />
            <Route exact path="/group/:id" component={Group} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
