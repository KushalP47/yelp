import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  //   const [val, setVal] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricerange, setPricerange] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await RestaurantFinder.get(`/${id}`);
        setName(result.data.data.restaurant.restaurant_name);
        setLocation(result.data.data.restaurant.restaurant_location);
        setPricerange(result.data.data.restaurant.restaurant_price_range);
        //   console.log(val);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = await RestaurantFinder.put(`/${id}`, {
        name: name,
        location: location,
        price_range: pricerange,
      });
      //   console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center">Update Restaurant</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>

        <div className="form-group justify-content-center flex-fill">
          <label htmlFor="pricerange">Price Range</label>
          <select
            className="form-select me-2"
            value={pricerange}
            onChange={(e) => {
              setPricerange(e.target.value);
            }}
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
