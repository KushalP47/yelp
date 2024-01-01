import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
const RestaurantTable = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await RestaurantFinder.get("/");
        setRestaurants(result.data.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    try {
      e.stopPropogation();
      const result = await RestaurantFinder.delete(`/${id}`);
      console.log(result);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.restaurant_id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropogation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };
  return (
    <div className="list-group">
      <table className="table table-dark table-hover align-middle">
        <thead>
          <tr className="table-info">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  key={restaurant.restaurant_id}
                  onClick={() =>
                    handleRestaurantSelect(restaurant.restaurant_id)
                  }
                >
                  <td>{restaurant.restaurant_name}</td>
                  <td>{restaurant.restaurant_location}</td>
                  <td>{"$".repeat(restaurant.restaurant_price_range)}</td>
                  <td>reviews</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.restaurant_id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.restaurant_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
            <td>Subway</td>
            <td>Mumai</td>
            <td>$$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTable;
