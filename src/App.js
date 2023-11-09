import React from "react";
import Home from './Home';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {AddPlant} from "./AddPlant";
import PlantDetails from "./PlantDetails";
import EditPlant from "./EditPlant";

function App() {

  return (
      <Router>
          <div className="App">
              <header className="App-header">
                  <h1>Boustiflor</h1>
                  <span>Une filiale Toxiplants</span>
              </header>
              <nav>
                  <Link to="/">Accueil</Link>
                  <Link to="/add">Ajouter une plante</Link>
              </nav>
              <div className="content">
                  <Routes>
                      <Route exact path="/" element={<Home/>}/>
                      <Route exact path="/add" element={<AddPlant/>}/>
                      <Route path="/plant/:id" element={<PlantDetails/>}></Route>
                      <Route path="/plant/edit/:id" element={<EditPlant/>}></Route>
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;
