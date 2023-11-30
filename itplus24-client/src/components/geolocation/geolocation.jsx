import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import styles from './geolocation.module.css'
import "leaflet/dist/leaflet.css";
import './leaflet.css'
import { Icon } from 'leaflet'

export function Geolocation({position}){

    console.log(position)
    const customIcon = new Icon({
        iconSize:[38, 38],
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png"

    })
    return(
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position} icon={customIcon}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>


    )
}