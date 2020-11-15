import { Button, Card, CardContent, Typography } from '@material-ui/core';
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


function FinalOrder(props) {
    const [cart, setCart] = useState([]);
    const classes = useStyles();

    let temp = useSelector(state => state.token.shoppingCart);
    useEffect(() => {
        setCart(temp);
    }, [temp])

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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                        </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                        </Typography>
                    <Grid container>
                        {/* {payments.map((payment) => (
                                <React.Fragment key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))} */}
                    </Grid>
                </Grid>
            </Grid>
            <div className={props.style.buttons}>
                <Button onClick={props.handleBack}>
                    Back
                    </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.handleNext}

                >
                    Submit
                </Button>
            </div>
        </React.Fragment>
    )


}



export default FinalOrder;