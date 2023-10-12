import { useState } from "react";
import PlantList from "./PlantList";

const Home = () => {

  const[plants, setPlants] = useState([
    {name: 'Pirahna plant', img: '../public/plants'},
    {name: 'Autre pirahna plant', img: '../public/plants'}
  ])

  return (
    <div className="home">
      { plants && <PlantList plants={plants} /> }
    </div>
  );
}
 
export default Home;
