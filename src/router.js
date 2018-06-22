import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/Login';
import WordPage from './routes/WordPage';
import ArticlePage from './routes/ArticlePage';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/word/wordList" exact component={WordPage} />
        <Route exact path="/articleList"  component={ArticlePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
