import React, { useState, useEffect } from "react";
import Movies from "./components/Movies/Movies";
import MovieDetails from "./components/Movies/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route path="/movie" component={MovieDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
