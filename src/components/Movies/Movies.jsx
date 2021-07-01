import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import movieImg from "../../assets/movie.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
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
    width: "300px",
    margin: "20px",
    maxWidth: 345,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  media: {
    height: 140,
  },
}));

function Movies() {
  const [movies, setMovies] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/movies");
      const payload = await response.json();
      setMovies(payload);
    }
    getData();
  }, []);

  const onMovieClick = (id) => {
    history.push({
      pathname: "/movie",
      search: `?id=${id}`,
      state: { data: id },
    });
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
          {movies &&
            movies.length > 0 &&
            movies.map((movie, i) => (
              <Card
                className={classes.cardRoot}
                key={i}
                style={{ position: "relative" }}
              >
                <CardActionArea onClick={() => onMovieClick(movie.id)}>
                  <CardMedia
                    className={classes.media}
                    image={movieImg}
                    title={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {movie.tagline ? movie.tagline : "Movie Tag"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      width: "100%",
                    }}
                  >
                    Vote average : {movie.vote_average} (Out of 10)
                  </Typography>
                  <Button size="small" color="primary"></Button>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Movies;
