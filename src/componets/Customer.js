import React, { useEffect, useState } from 'react';

function Customer() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/store/customerList", {
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
          setCategories(result);
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
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Customers</th>
              <th scope="col">Name</th>
              <th scope="col">Member Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(item => (
              <tr>
                <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.member}</td>  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Customer;