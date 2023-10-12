const PlantList = ({ plants }) => {
    return (
      <div className="plant-list">
        {plants.map(plant => (
          <div className="plant-card" key={plant.id} >
            <figure>
                <img src={plant.img} alt="" />
            </figure>
            <span>{plant.name}</span>
          </div>
        ))}
      </div>
    );
}

export default PlantList;