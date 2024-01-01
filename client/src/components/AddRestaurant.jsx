import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricerange, setPricerange] = useState("Price Range");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePricerangeChange = (event) => {
    setPricerange(event.target.value);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const result = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: pricerange,
      });
      console.log(result);
      addRestaurant(result.data.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="d-flex flex-row justify-content-center">
          <div className="pe-3 flex-fill">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="pe-3 flex-fill">
            <input
              type="text"
              value={location}
              className="form-control"
              placeholder="Location"
              onChange={handleLocationChange}
            />
          </div>
          <div className="d-flex flex-row justify-content-center flex-fill">
            <select
              className="form-select me-2"
              value={pricerange}
              onChange={handlePricerangeChange}
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
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
