import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cake() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const extension = window.location.pathname.split('/').pop();
  const formLink = "/AddItemForm/" + extension;
  function determineCategory(result) {
    switch (extension) {
      case 'Cake':
        setCategories(result.Cake);
        break;
      case 'Donut':
        setCategories(result.Donut);
        break;
      case 'Bread':
        setCategories(result.Bread);
        break;
      case 'Cookie':
        setCategories(result.Cookie);
        break;
      default:
        break;
    }
  }
  let token = useSelector(state => state.tokenValue);
  
  useEffect(() => {
    if (JSON.stringify(token).length > 2) {
      fetch("http://localhost:8080/store/" + extension, {
        headers: {
          'Access-Control-Allow-Origin': "http://localhost:3000",
          Authorization: token
        }
      }
      ).then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            determineCategory(result);

          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [token])
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
              <th scope="col">{extension}</th>
              <th scope="col">Time Baked</th>
              <th scope="col">Filling</th>
              <th><Button href={formLink}>Add Item</Button></th>
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