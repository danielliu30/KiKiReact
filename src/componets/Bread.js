import React, { useEffect, useState } from 'react';


function Bread() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/store/Bread", {
      headers: {
        'Access-Control-Allow-Origin': "http://localhost:3000",
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTk4MzA3OTc1LCJpYXQiOjE1OTgyODk5NzV9.RdSWc-boG74HYpAbnMEISfFzW7qXLCwYKv2mYTjP3ad-2n_AtlauqisBEVX2p2L5EhiABarC5DjEB9qri6savw'
      }
    }
    )
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategories(result.Bread);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Bread</th>
              <th scope="col">Time Baked</th>
              <th scope="col">Filling</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(item => (
              <tr>
                <th scope="row"></th>
                  <td>{item.ItemVariation}</td>
                  <td>{item.fillings}</td>  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Bread;