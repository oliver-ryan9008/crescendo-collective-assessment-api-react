import React, { useState } from 'react';
import { IProps, Ingredient, Direction } from './Recipe.d';
import * as apiUtils from '../../data-access/apiUtils';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        margin: '32px 0',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.15)'
    },
    media: {
        height: 0,
        width: '100%',
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain',
        marginBottom: '1rem'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: 500,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    ingredient: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        textDecoration: 'underline',
        color: 'black',
        textAlign: 'left'
    },
    expandedIngredient: {
        padding: '2px 12px !important'
    },
    underlineLabel: {
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
    directionsLabel: {
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    expandedDirections: {
        textAlign: 'center'
    },
    label: {
        textAlign: 'right',
        width: '90%'
    },
    expandedMedia: {
        paddingTop: '56.25%',
        width: '100%',
        backgroundSize: 'contain',
        marginBottom: '1rem'
    },
    specials: {
        color: '#c11d1d',
        textAlign: 'center'
    },
    specialsHeader: {
        color: '#c11d1d',
        textDecoration: 'underline',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    amountSpan: {
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem'
    },
    directionLine: {
        marginLeft: '1rem',
    }
}));

export default function RecipeReviewCard(props: IProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function renderImage() {
        const { images } = props;
        const imageSize = expanded ? `${apiUtils.baseUrl}${images.medium}` : `${apiUtils.baseUrl}${images.small}`;
        const style = expanded ? classes.expandedMedia : classes.media;

        const imgTags = (
            <React.Fragment>
                <a target={'_blank'} href={`${apiUtils.baseUrl}${images.full}`}>
                <CardMedia
                    className={style}
                    image={imageSize}
                    title={imageSize}
                    />
                </a>
            </React.Fragment>
        );

        return imgTags;
    }

    function renderDirectionsBox() {
        const { directions } = props;
        let i = 0;

        const directionArray = directions.map((direction) => {
            i++;
            return renderDirection(direction, i);
        });

        return (
            <React.Fragment>
                <hr/>
                <CardContent className={classes.expandedDirections}>
                    <Typography paragraph className={classes.directionsLabel}>Directions:</Typography>
                    {directionArray}
                </CardContent>
            </React.Fragment>
        );
    }

    function renderDirection(direction: Direction, key: number) {
        const text = <span className={classes.directionLine}>Step {key} - {direction.instructions}</span>;
        const entry = (
            <React.Fragment key={key}>
                <Typography paragraph>
                    <CheckCircleIcon />
                    {text}
                </Typography>
            </React.Fragment>
        );

        return entry;
    }

    function renderSpecialsForIngredient(ingredientId: string) {
        const { matchingSpecials } = props;
        let specials: (JSX.Element | null)[] = [];

        if (matchingSpecials && matchingSpecials.length >= 1) {
            specials = matchingSpecials.map(special => {
                if (ingredientId === special.ingredientId) {
                    let text = <div></div>;
                    if(special.text)
                        text = <div className={classes.specials} dangerouslySetInnerHTML={{__html: special.text}}></div>;

                    return (
                        <React.Fragment key={special.uuid}>
                            <div>
                                <div className={classes.specialsHeader}>Specials Available: </div>
                                <div className={classes.specials}>-{special.title}</div>
                                <div className={classes.specials}>Type: {special.type}</div>
                                {text}
                            </div>
                        </React.Fragment>
                    );
                }

                return null;
            });
        }

        return specials;
    }

    function renderIngredients(ingredients: Ingredient[]): JSX.Element[] {
        let i = 0;

        const arr = ingredients.map(ingredient => {
            i++;
            
            const entry = (
                <React.Fragment key={i}>
                    <hr/>
                    <CardContent className={classes.expandedIngredient}>
                        <Typography variant="body2" color="textSecondary" component="div">
                            <span className={classes.ingredient}>{ingredient.name}</span><span className={classes.amountSpan}> - {ingredient.amount} {ingredient.measurement}</span>
                            {renderSpecialsForIngredient(ingredient.uuid)}
                        </Typography>
                    </CardContent>
                </React.Fragment>
            );
            return entry;
        });

        return arr;
    }

    const { title, ingredients } = props;

    function renderExpandedRecipe() {
        const ingredientList = renderIngredients(ingredients);
        const directionList = renderDirectionsBox();

        return (
            <React.Fragment>
                <CardContent>
                    {ingredientList}
                </CardContent>
                <Collapse in={expanded} timeout={500} unmountOnExit>
                    {directionList}
                </Collapse>
            </React.Fragment>
        );
    }

    function expandRecipe() {
        const props = {
            className: clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            }),
            onClick: handleExpandClick,
            "aria-expanded": expanded,
            "aria-label": "show more"
        };

        return (
            <CardActions disableSpacing>
                <IconButton {...props}>
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
        );
    }

    return (
        <Grid item xs={12} lg={2}>
            <Card className={classes.root}>
                <CardHeader title={title} />
                {expandRecipe()}
                {renderImage()}
                {/* {renderShowDirections()} */}
                <Collapse in={expanded} timeout={500} unmountOnExit>
                    {renderExpandedRecipe()}
                </Collapse>
            </Card>
        </Grid>
    );
}