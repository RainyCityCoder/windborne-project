import { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css'

function App() {
  const [balloons, setBalloons] = useState([]); // stores balloon JSON array
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/treasure/00.json`)
      .then((reply) => {
        if (!reply.ok) throw new Error(`Balloon server returned ${reply.status}`);
        return reply.json();
      })
      .then((json) => {setBalloons(json)})
      .catch((err) => {
        console.error("Fetch failed. Details: ", err);
        setError(err.message);
      });
    }, []);

  return (
    <div>
      <header className="title-bar">
        <h1>Windborne Balloon Indicator</h1>
      </header>
      <div className="subtitle-text">
        <p>
          Each card shows a balloon's latitude, longitude, and altitude. The background image indicates whether the balloon is currently over land or water. These are randomly selected from&nbsp;
          <a className="subtitle-link page-link" href="https://a.windbornesystems.com/treasure/00.json">
             this Windborne API
          </a>
          &nbsp;&&nbsp;checked&nbsp;against&nbsp;the&nbsp;
          <a className="subtitle-link page-link" href="https://is-on-water.balbona.me/">
            Is On Water API
          </a>.
        </p>
      </div>
      <div className="container">
        {error && <p className="text-danger">{error}</p>}
        {balloons.map(([lat, lon, alt, isOverWater], index) => (
          <Card 
            key={index}
            index={index+1} // avoids starting at 0
            lat={lat}
            lon={lon}
            alt={alt}
            isOverWater={isOverWater}
          />
        ))}
      </div>
      <div className="page-footer">
        <div>
          <p>* Units are not given in Windborne API</p>
          <p>Are they meters? Feet? Kilometers?</p>
          <p>Leagues? Fathoms? Parsecs?</p>
          <p>Who knows!!</p>
          <p>This code is open-sourced <a className="fs-6 page-link" href="https://github.com/RainyCityCoder/windborne-project">on Github.</a></p>
        </div>
      </div>
    </div>
  )
}

export default App