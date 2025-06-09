import React, { useState } from 'react';
import './App.css';

// Helper component to fetch and display a single tile image
function TileImage({ z, x, y }) {
  const [imgUrl, setImgUrl] = useState(null);

  React.useEffect(() => {
    let urlObject = null;
    const url = `https://challenge-tiler.services.propelleraero.com/tiles/${z}/${x}/${y}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaW50ZXJuIiwiaWF0IjoxNzQ3OTY5OTAyfQ._nFA8un2_IMz23difs56tX4ono-oXApWk8y8YSkGkAw`;
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        urlObject = URL.createObjectURL(blob);
        setImgUrl(urlObject);
      });

    return () => {
      if (urlObject) URL.revokeObjectURL(urlObject);
    };
  }, [z, x, y]);

  return (
    <div className="tile">
      {imgUrl ? <img src={imgUrl} alt={`Tile with coordinates ${z}-${x}-${y}`}/> : <div>Loading...</div>}
    </div>
  );
}

export default function App() {
  // State for zoom level
  const [z, setZ] = useState(1);

  // Calculate the range for x and y (from 0 to 2^z - 1)
  const maxCoord = Math.pow(2, z);
  // 1 , 2, 4, 8 values for the 
  // for loops to populate the page with images row by row

  // Create a 2D array of tile coordinates
  const rows = [];
  for (let y = 0; y < maxCoord; y++) {
    const row = [];
    for (let x = 0; x < maxCoord; x++) {
      row.push({ x, y }); // populate row array
    }
    rows.push(row); // add row to rows
  }

  return (
    <div className="App">
      <div className="outerMapWrapper">
        <div className="mapContainer">
          <div className="imageGrid">
            {rows.map((row, rowIndex) => (
              <div className="imageRow" key={`row-${rowIndex}`}>
                {row.map(({ x, y }) => (
                  <TileImage key={`${z}-${x}-${y}`} z={z} x={x} y={y} />
                ))}
              </div>
            ))}
          </div>
          </div>
          <div className="zoomButtons">
            <button onClick={() => setZ(z + 1)} disabled={z === 3}>+</button>
            <button onClick={() => setZ(z - 1)} disabled={z === 0}>-</button>
          </div>
        </div>
      </div>
    
  );
}


