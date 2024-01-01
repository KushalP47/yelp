import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantTable from "../components/RestaurantTable";
const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantTable />
    </div>
  );
};

export default Home;
