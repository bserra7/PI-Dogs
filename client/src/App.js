import { React } from 'react';
import LandingPage from './components/LandingPage';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Dogs from './components/Dogs';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import NewDog from './components/NewDog';
import DogDetail from './components/DogDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage/>
        </Route> 
        <Route exact path='/home'>
          <NavBar/> 
          <SearchBar/>
          <Dogs/>
        </Route>
        <Route exact path='/dog/:dogId'
          render={({match}) => (<>
          <NavBar/> 
          <DogDetail dogId={match.params.dogId}/>
          </>
        )}>
        </Route>
        <Route exact path='/new-dog'>
          <NavBar/> 
          <NewDog/>
        </Route>
      </Switch>  
    </div>
  );
}

export default App;
