import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Community from '../containers/Community';
import Profile from '../containers/Profile';
import Editor from '../containers/Editor';
import VideoRecorder from '../containers/VideoRecorder';
import NotFound from '../containers/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        
        <Route exact path="/community" component={Community} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/editor" component={Editor} />
        
        
        
        <Route exact path="/videoRecorder" component={VideoRecorder} />
        
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;