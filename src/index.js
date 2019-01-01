import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
// import  browserHistory   from 'history/createBrowserHistory';// browserhistory打开这个
// var history=browserHistory();// browserhistory打开这个
var history;// hashhistory 打开这个
// 1. Initialize
const app = dva({
   history: history,
});
// 2. Plugins
 app.use({});

// 3. Model
app.model(require('./models/app').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
