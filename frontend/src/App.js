import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  //- login & logout 
  const [user, setUser] = React.useState(null); //react hooks, useState crea una variable de estado su estado inicial es null

  async function login(user = null) {
    setUser(user); //si sellama esta funcion la variable de estado user se actualizara con el usuario que se pase
  }

  async function logout() {
    setUser(null)
  }
//-=====este fue solo a basic login system no estamos nisiquira guardando el usuario en la base de datos=========
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" > 
            { user ? (
              <a href="!#" onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path={"/restaurants"} element={<RestaurantsList/>} />
          <Route 
            path="/restaurants/:id/review"
            element = {<AddReview />}
          />
          <Route 
            path="/restaurant/:id"
            element={<Restaurant />}
          />
          <Route 
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
