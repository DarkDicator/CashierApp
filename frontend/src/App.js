import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import ItemList from "./components/item-list";
import AddItem from "./components/add-item";


function App() {

  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {user ? (
        <a href="#" className="navbar-brand">
          FIBIS
        </a>
        ):(
          <a href="/login" className="navbar-brand">
          FIBIS
        </a>
        )}
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              dashboard
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link to={"/add-item"} className="nav-link">
                Add Item
              </Link>
            </li>
          ) : (
            <div></div>
          )}
          { user ? (            
            <li className="nav-item">            
                <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                  Logout
                </a>
              </li>
            
            ) : (     
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            )}
          

          
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login}/>
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <ItemList {...props} user={user}/>
            )}
          />
          <Route
            path="/add-item"
            render={(props) => (
              <AddItem {...props} user={user}/>
            )}
          />
        </Switch>
      </div>
    </div>
        
  );
}

export default App;
