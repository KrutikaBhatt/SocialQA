import './App.css';
import SocialQA from './components/SocialQA/SocialQA';
import Login from './components/auth/login';
import Register from './components/auth/register';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
  
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={SocialQA} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register}/>

        <Redirect to="/login" />
      </Switch>
    </Router>
    </>
  );
}

export default App;
