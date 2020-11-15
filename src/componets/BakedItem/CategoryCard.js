import { IconButton, Collapse, Card, CardMedia, Grid, Box, Typography, CardActions, CardContent, CardActionArea, makeStyles, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import addToShoppingCart from '../Security/JWTSlice'

const cardStyle = makeStyles((theme) => ({
    root: {
        width: 'auto'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),

    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))



function CategoryCard(props) {
    const [expanded, setExpanded] = useState(false);



    function setOrder() {
        props.addToCart(props.item);
    }


    return (
        <Box mx={2} my={2} >
            <Card className={cardStyle.root}>
                <CardActionArea>
                    <CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.item.BakedItem}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Time Made | {props.item.ItemVariation}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Filling | {props.item.fillings}
                            </Typography>
                        </CardContent>
                    </CardMedia>
                </CardActionArea>
                <CardActions>
                    <Tooltip title="Add To Cart">
                        <IconButton
                            onClick={() => setOrder()}
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="More Details">
                        <IconButton
                            className={clsx(cardStyle.expand, {
                                [cardStyle.expandOpen]: expanded,
                            })}
                            onClick={() => setExpanded(!expanded)}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse conta in={expanded} timeout="auto" unmountOnExit>
                    <Card className={cardStyle.root}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Calories | {props.item.calories}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Layers | {props.item.layers}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Toppings | {props.item.toppings}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Layers | {props.item.layers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Collapse>
            </Card>
        </Box>
    )
}

export default CategoryCard;