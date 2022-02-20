import { React } from 'react';
import LandingPage from './components/LandingPage';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Dogs from './components/Dogs';
import NavBar from './components/NavBar';
import NewDog from './components/NewDog';
import DogDetail from './components/DogDetail';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage/>
        </Route> 
        <Route exact path='/home'>
          <NavBar/> 
          <Dogs/>
        </Route>
        <Route exact path='/dog/:dogId'
          render={({match}) => (<>
          <NavBar/> 
          <DogDetail dogId={match.params.dogId}/>
          </>
        )}>
        </Route>
        <Route exact path='/new-dog' 
          render={({history}) => (<>
          <NavBar/> 
          <NewDog history={history}/>
          </>
        )}/>
        <Route exact path='/about'>
          <NavBar/> 
          <About/>
        </Route>
      </Switch>  
    </div>
  );
}

export default App;
