import "./App.css";
import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import parse from "html-react-parser";
import MarkerClusterGroup from "react-leaflet-markercluster";

import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";

import Geo from "./data/Geo";
import AllCategory from "./data/AllCategory";

const data = Geo.features;
const radios = AllCategory.name;

// let numberCategory = [];

// for (const category of radios) {
//   let i = 0;
//   for (const element of data) {
//     if (element.properties.description.includes(category)) {
//       i++;
//     }
//   }
//   numberCategory.push(i);
// }

function App() {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [position, setPosition] = useState([50.8571, 1.9473, 10]);
  const [filterEntry, setFilterEntry] = useState("");

  return (
    <div className="app">
      <Logo />
      <SearchBar
        placeholder="Recherche"
        entry={data}
        stateChanger={setPosition}
        filter={setFilterEntry}
      />
      <ul className="radio-container">
        {radios.map((category, index) => (
          <li>
            <button
              className="button-category"
              style={{
                color: category === selectedRadio ? "rgb(0, 51, 99)" : ""
              }}
              htmlFor={category}
              id={category}
              onClick={(e) =>
                selectedRadio === e.target.id
                  ? setSelectedRadio("")
                  : setSelectedRadio(e.target.id)
              }
            >
              {category}{" "}
              {/* <sup className="numberCategory">{numberCategory[index]}</sup> */}
            </button>
          </li>
        ))}
      </ul>
      <LeafletMap
        center={[position[0], position[1]]}
        zoom={position[2]}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors <a href="https://www.sevadec.fr/">SEVADEC</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {data
            .filter((marker) =>
              marker.properties.description.includes(selectedRadio)
            )
            .filter((marker) =>
              marker.properties.description.toLowerCase().includes(filterEntry)
            )
            .map((marker, index) => (
              <Marker
                key={index}
                position={[
                  marker.geometry.coordinates[1],
                  marker.geometry.coordinates[0]
                ]}
                icon={
                  new L.icon({
                    iconUrl:
                      marker.properties.logo !== ""
                        ? marker.properties.logo + ".png"
                        : "defaultLogo.png",
                    iconSize: [40, 40],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40]
                  })
                }
              >
                <Popup>
                  <span class="dashicons dashicons-admin-tools" />
                  <strong>Nom</strong> : {marker.properties.name}
                  <br />
                  <strong>Information</strong> :
                  <br />
                  {parse(marker.properties.description)}
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </LeafletMap>
    </div>
  );
}

export default App;
