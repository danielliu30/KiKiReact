import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { remove } from "hookrouter";
import ShoppingCartItem from "./ShoppingCartItems";
import { removeItemFromCart, addToShoppingCart } from "../Security/JWTSlice";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function ShoppingCart(props) {
  const [removeItem, setRemoveItem] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  let cart = useSelector((state) => state.token.shoppingCart);
  let totalCost = useSelector((state) => state.token.totalCost);

  useEffect(() => {
    if (removeItem != null) {
      dispatch(removeItemFromCart(removeItem));
    }
  }, [removeItem]);
  const removePurchasedGood = (item) => {
    setRemoveItem(item);
  };

  if (cart != null && Object.keys(cart).length) {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {Object.entries(cart).map((item) => (
            <ShoppingCartItem
              classes={classes}
              item={item[1]}
              removePurchasedGood={removePurchasedGood}
            ></ShoppingCartItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              ${totalCost.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
        <div className={props.style.buttons}>
          <Button href="/">Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleNext}
          >
            Next
          </Button>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <Typography variant="subtitle2" className={classes.total}>
        Cart is Empty
      </Typography>
    );
  }
}

export default ShoppingCart;
