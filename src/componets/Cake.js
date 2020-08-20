import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Cake() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/store/Cake", {
      headers: {
        //'Access-Control-Allow-Origin': "http://localhost:3000",
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTk3OTUwMjExLCJpYXQiOjE1OTc5MzIyMTF9.w8BBs5eRM1Ikjlpa9kqrLCfFGfJEGjH1jdJ8LLfhSzH0RjeUIOEb1JkWyl18s5VBcGDrEn1p-ETwYL3Swx9zmg'
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
        {categories.map(item => (
          <li key={item.ItemVariation}>
            {item.ItemVariation} {item.fillings}
          </li>
        ))}
      </div>
    );
  }
}
export default Cake;