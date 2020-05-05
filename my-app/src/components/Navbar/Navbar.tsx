import * as React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    name: {
        position: 'relative',
        marginLeft: 0,
        width: '100%',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
            display: 'block'
        },
    }
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Crescendo Collective - Recipe Application
                        </Typography>
                        <Typography className={classes.name} variant="h6" noWrap>
                            By: Ryan Oliver
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
    );
}