import './App.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import geoData from './data/Geo.json'
import React, { useEffect, useState } from "react";
import Logo from './components/Logo';
import L from "leaflet";
import parse from "html-react-parser";


function App() {
const [data, setData] = useState(geoData.features);
const radios = ["Réemploi", "Vente vrac", "Atelier de réparation", "Tomate"]
const [selectedRadio, setSelectedRadio] = useState("")

  return (
    <div className="app">
      <Logo/>
      <ul className='radio-container'>
                 {
                    radios.map((category)=>(
                    <li>
                        <input type="radio" id={category} checked={category === selectedRadio} onClick={(e)=> selectedRadio==e.target.id ?  setSelectedRadio("") :
                setSelectedRadio(e.target.id)}></input>
                        <label htmlFor={category}>{category}</label>
                    </li> 
                ))}
            </ul> 
            
     <MapContainer center={[50.8571,1.9473]} zoom={11} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors <a href="https://www.sevadec.fr/">SEVADEC</a>'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />



{data
.filter((marker)=> marker.properties.category.includes(selectedRadio))
.map((marker, index) => (
            <Marker
            key={index}
            position={[
              marker.geometry.coordinates[1],
              marker.geometry.coordinates[0]
            ]} icon={new L.icon({
              iconUrl: marker.properties.category+".png",
              iconSize: [40, 40],
              iconAnchor: [10, 41],
              popupAnchor: [2, -40]
            })}
            
            >
              <Popup>
              <span class="dashicons dashicons-admin-tools"/>
              <strong>Logo</strong> : {marker.properties.symbol}
              <br/>
              <strong>Information</strong> :
              <br />
              {parse(marker.properties.information)}
              </Popup>
            </Marker>                   
          ))}
</MapContainer>
    </div>
  );
}

export default App;
