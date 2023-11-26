import PlantList from "../components/PlantList";
import '@ionic/react/css/core.css';
import {IonContent, setupIonicReact} from '@ionic/react';
import {Header} from "../components/Header";

setupIonicReact();

const Home = () => {

  return (
      <>
          <Header></Header>
          <IonContent className="ion-padding">
              <PlantList/>
          </IonContent>
      </>
  );
}
 
export default Home;
