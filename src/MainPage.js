import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPageComp from './LoginPage';
import MainPageMenuComp from './MainPageMenu';
import CreateAccountComp from './CreateAccountPage';

function MainPageComp() {
  return (
    <div>
      <h1 class='font-monospace' style={{ textAlign: 'center' }}>
        Movies-Subscriptions Web Site
      </h1>
      <Switch>
        <Route exact path='/' component={LoginPageComp} />
        <Route path='/createAccountPage' component={CreateAccountComp} />
        <Route path='/mainPageMenu' component={MainPageMenuComp} />
      </Switch>
    </div>
  );
}

export default MainPageComp;
