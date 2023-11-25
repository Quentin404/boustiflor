import React from "react";
import Home from './pages/Home';
import {Route} from "react-router-dom";
import {AddPlant} from "./pages/AddPlant";
import SignIn from "./UserAccount/SignIn";
import Login from "./UserAccount/Login";
import PlantDetails from "./pages/PlantDetails";
import EditPlant from "./pages/EditPlant";
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css'
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

setupIonicReact();

function App() {

  return (
      <IonApp>
          <IonReactRouter>
              <IonRouterOutlet>
                  <Route path="/" exact component={Home} />
                  <Route path="/add" exact component={AddPlant} />
                  <Route path="/signin" exact component={SignIn} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/plant/:id" exact component={PlantDetails} />
                  <Route path="/plant/edit/:id" exact component={EditPlant} />
              </IonRouterOutlet>
          </IonReactRouter>
      </IonApp>
  );
}

export default App;
