import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import movieImg from "../../assets/movie.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    flexGrow: 1,
    maxWidth: 360,
    marginTop: theme.spacing(5),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MovieDetails(props) {
  const [movie, setMovie] = useState([]);

  const location = useLocation();

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/movie/?id=${location.state.data}`, {
        method: "GET",
      });
      const payload = await response.json();
      setMovie(payload);
    }
    getData();
  }, [location]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Movies
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {movie && (
            <Card className={classes.cardRoot}>
              <CardHeader
                avatar={
                  <Avatar aria-label="movie" className={classes.avatar}>
                    {movie.title}
                  </Avatar>
                }
                title={movie.title}
                subheader={movie.release_date}
              />

              <CardMedia
                className={classes.media}
                image={movieImg}
                title={movie.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {movie.tagline}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  Style={{ marginTop: "30px" }}
                >
                  Runtime : {movie.runtime} minutes
                </Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Overview:</Typography>
                  <Typography paragraph>{movie.overview}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieDetails;
