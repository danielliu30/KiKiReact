import {
  IconButton,
  Collapse,
  Card,
  CardMedia,
  Grid,
  Box,
  Typography,
  CardActions,
  CardContent,
  CardActionArea,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryCard from "./CategoryCard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { addToShoppingCart, addCost } from "../Security/JWTSlice";
import { AddCommentSharp, TextsmsRounded } from "@material-ui/icons";
function Cake() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const extension = window.location.pathname.split("/").pop();
  const formLink = "/AddItemForm/" + extension;
  function determineCategory(result) {
    switch (extension) {
      case "Cake":
        setCategories(result.Cake);
        break;
      case "Donut":
        setCategories(result.Donut);
        break;
      case "Bread":
        setCategories(result.Bread);
        break;
      case "Cookie":
        setCategories(result.Cookie);
        break;
      default:
        break;
    }
  }
  let token = useSelector((state) => state.token.tokenValue);
  let signedIn = useSelector((state) => state.token.loggedIn);
  useEffect(() => {
    if (token.length > 0) {
      fetch("http://localhost:8080/store/" + extension, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            determineCategory(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
    if (cart != null) {
      dispatch(addToShoppingCart(cart));
      dispatch(addCost(cart.cost));
      setCart(null);
    }
  }, [token, cart]);

  function addToCart(newItem) {
    setCart(newItem);
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded && signedIn) {
    return <div>Loading...</div>;
  } else if (!signedIn) {
    return <div>Not Logged In...</div>;
  } else {
    return (
      <div>
        <Box display="flex" mx={5} my={5}>
          <Grid container spacing={4}>
            {categories.map((item) => (
              <CategoryCard
                item={item}
                key={item.ItemVariation}
                addToCart={addToCart}
              />
            ))}
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Cake;
