import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantdetailPage from "./routes/RestaurantdetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantContextProvider } from "./context/RestaurantsContext";

const App = () => {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/restaurants/:id"
              element={<RestaurantdetailPage />}
            />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<UpdatePage />}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
};

export default App;
