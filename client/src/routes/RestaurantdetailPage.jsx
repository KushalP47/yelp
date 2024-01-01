import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  RestaurantContext,
  // RestaurantContextProvider,
} from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const RestaurantdetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await RestaurantFinder.get(`/${id}`);
        // console.log(result);
        setSelectedRestaurant(result.data.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return <div>{selectedRestaurant.restaurant_name}</div>;
};

export default RestaurantdetailPage;
