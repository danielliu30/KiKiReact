import React, { useEffect, useState } from 'react';

function Cake() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/store/Cake", {
      headers: {
        'Access-Control-Allow-Origin': "http://localhost:3000",
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTk4MzI3NjgxLCJpYXQiOjE1OTgzMDk2ODF9.XdosRp7rc_JgZmxf20x5DBUR6qgj6OrogE1tFlOhspEjey17njXECg012XCtfMfHsR_HzD0L6iPzPzjneWvXyA'
      }
    }
    )
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategories(result.Cake);
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
              <th scope="col">Cake</th>
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


export default Cake;