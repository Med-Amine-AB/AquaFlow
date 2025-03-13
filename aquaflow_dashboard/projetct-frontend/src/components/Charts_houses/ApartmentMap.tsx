import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import apartments_data from "../../data/houses_data.json";

// Define the interface for the data
interface Apartment {
  Type: string;
  Localisation: string;
  Latitude: number;
  Longitude: number;
  "Price in DH": number;
}

// Load JSON data
const apartments: Apartment[] = apartments_data as Apartment[];

// Filter data for Casablanca only
const casablancaApartments = apartments.filter((apartment) =>
  apartment.Localisation.toLowerCase().includes("casablanca")
);

// Choose a single apartment for the marker
const singleApartment = casablancaApartments[0]; // Select the first apartment

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const ApartmentMap: React.FC = () => {
  // Guard: Ensure there's at least one apartment to render
  if (!singleApartment) {
    return <div>No apartments available for Casablanca.</div>;
  }

  return (
    <div className="w-full h-screen">
      {/* One MapContainer */}
      <MapContainer
        center={[singleApartment.Latitude, singleApartment.Longitude]} // Centered on the selected apartment
        zoom={14} // Close focus on the location
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }} // Ensure full-width map
      >
        {/* Map Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Single Marker */}
        <Marker
          position={[singleApartment.Latitude, singleApartment.Longitude]} // Marker position
          icon={customIcon}
        >
          <Popup>
            <strong>{singleApartment.Type}</strong>
            <br />
            Prix : {singleApartment["Price in DH"]} DH
            <br />
            Localisation : {singleApartment.Localisation}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ApartmentMap;
