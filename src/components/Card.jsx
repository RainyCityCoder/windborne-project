import React from 'react'
import '../App.css'

function Card({ index, lat, lon, alt, isOverWater }) {
  const icon = isOverWater ? "/ocean.jpg" : "/land.jpg" // Vite serves /public as root, so only need "/filename.ext"
  
  return (
    <div className="m-2" style={{ width: "250px" }}>
      <div className="card text-center border border-info position-relative">
        <img
          src={icon}
          alt="terrain type"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <div className="card-img-overlay overlay-text d-flex flex-column justify-content-between">
          <div className="card-subtitle-group">
            <h5 className="card-title">Balloon #{index}</h5>
            <h6 className="card-subtitle mb-1">Latitude: {lat}°</h6>
            <h6 className="card-subtitle mb-1">Longitude: {lon}°</h6>
            <h6 className="card-subtitle mb-1">Altitude: {alt} units*</h6>
          </div>
          <a
            className="card-text text-decoration-underline"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/place/${lat},${lon}/@${lat},${lon},4z`}
          >
            Link to balloon location
          </a>
        </div>
      </div>
    </div>
  )
}
export default Card