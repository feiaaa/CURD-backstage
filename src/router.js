import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ArticlePage from './routes/ArticlePage';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route exact path="/articleList"  component={ArticlePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
