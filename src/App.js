import React from "react";
import Home from './Home';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {AddPlant} from "./AddPlant";
import SignIn from "./UserAccount/SignIn";
import Login from "./UserAccount/Login";
import AuthDetails from "./UserAccount/AuthDetails";

function App() {

  return (
      <Router>
          <div className="App">
              <header className="App-header">
                  <h1>Boustiflor</h1>
                  <span>Une filiale Toxiplants</span>
                  <AuthDetails/>
              </header>
              <nav>
                  <Link to="/">Accueil</Link>
                  <br />
                  <Link to="/add">Ajouter une plante</Link>
                  <br />
                  <Link to="/signin">S'inscrire</Link>
                  <br />
                  <Link to="/login">Se connecter</Link>
              </nav>
              <div className="content">
                  <Routes>
                      <Route exact path="/" element={<Home/>}/>
                      <Route exact path="/add" element={<AddPlant/>}/>
                      <Route exact path="/signin" element={<SignIn/>}/>
                      <Route exact path="/login" element={<Login/>}/>
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;
