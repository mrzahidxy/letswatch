import { Container } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./component/Header/Header";
import MainNav from "./component/MainNav";
import Trending from './pages/Trending/Trending';

import Series from './pages/Series/Series';
import Search from './pages/Search/Search';
import "./App.css";

import Movies from "./pages/Movies/Movies";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
          <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
