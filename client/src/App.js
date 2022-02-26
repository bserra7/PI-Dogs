import { React } from 'react';
import LandingPage from './components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dogs from './components/Dogs';
import NavBar from './components/NavBar';
import NewDog from './components/NewDog';
import DogDetail from './components/DogDetail';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Route path='/:a'> <NavBar/> </Route>
      
      <Switch>
      <Route exact path='/'> <LandingPage/> </Route>

      <Route exact path='/home'> <Dogs/> </Route>

      <Route exact path='/dog/:dogId' render={({ match }) => <DogDetail dogId={match.params.dogId}/>} />

      <Route exact path='/new-dog' render={({ history }) => <NewDog history={history}/>} />

      <Route exact path='/about'> <About/> </Route>

      <Route> <NotFound/> </Route>
      </Switch>
    </div>
  );
}

export default App;
