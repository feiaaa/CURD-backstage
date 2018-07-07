import React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch, } from 'dva/router';
import Login from './routes/Login';
// import { browserHistory  } from 'dva/router'
// import {  createHistory } from 'history/createBrowserHistory';
// // var history=createHistory();
// console.log(browserHistory ,'browserHistory ',{ browserHistory } ,'browserHistory ',createHistory,'createHistory() in router',{ createHistory },'{createHistory}');

function RouterConfig({ history,app }) {
  const WordPage = dynamic({
    app,
    models: () => [
      import('./models/word'),
    ],
    component: () => import('./routes/WordPage'),
  });
  const ArticlePage = dynamic({
    app,
    models: () => [
      import('./models/article'),
    ],
    component: () => import('./routes/ArticlePage'),
  });
  const QuestionPage = dynamic({
    app,
    models: () => [
      import('./models/question'),
    ],
    component: () => import('./routes/QuestionPage'),
  });


  return (
    <Router  history={history}>
      <Switch>
        {/*<IndexRoute path="/" component={Login} />*/}
        <Route path="/" exact={true} component={Login} />
        <Route path="/login" exact={true} component={Login} />
        <Route exact path="/word/wordList" component={WordPage} />
        <Route exact path="/word/questionList" component={QuestionPage} />
        <Route exact path="/articleList"  component={ArticlePage} />


      </Switch>
    </Router>
  );
}

export default RouterConfig;
