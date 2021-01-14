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

function ShoppingCartItem(props) {
  const handleDelete = () => {
    props.removePurchasedGood(props.item[1]);
  };
  return (
    <div>
      <Card>
        <CardContent>
          <ListItem
            className={props.classes.listItem}
            key={props.item[1].ItemVariation}
          >
            <ListItemText
              primary={props.item[1].BakedItem}
              secondary={props.item[1].flavor}
            />
            <Typography variant="body2" color="textSecondary" component="p">
              ${props.item[1].cost}
              <IconButton color="default" onClick={() => handleDelete()}>
                <DeleteIcon />
              </IconButton>
            </Typography>
          </ListItem>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShoppingCartItem;
