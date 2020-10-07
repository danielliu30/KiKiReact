import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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


function ShoppingCart() {

    const classes = useStyles();
    let cart = useSelector(state => state.token.shoppingCart);

    if (cart.length > 0) {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <List disablePadding>
                    {cart.map(item =>
                        <Card>
                            <CardContent>
                                <ListItem className={classes.listItem} key={item.ItemVariation}>
                                    <ListItemText primary={item.BakedItem} secondary={item.flavor} />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        $6.99
                                </Typography>
                                </ListItem>
                            </CardContent>
                        </Card>
                    )}
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" className={classes.total}>
                            $34.06
                        </Typography>
                    </ListItem>
                </List>
               
            </React.Fragment>
        )
    } else {
        return (
            <Typography variant="subtitle2" className={classes.total}>Cart is Empty</Typography>
        )
    }

}



export default ShoppingCart;