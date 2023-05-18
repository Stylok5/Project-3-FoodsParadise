import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from "react-bootstrap/Dropdown";
import FoodCard from "../components/FoodCard";

const Explore = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState(foods);
  // nik's code
  const [usersList, setUsersList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
  }, [location]);

  const navigate = useNavigate();
  const handleChange = async (e) => {
    try {
      e.preventDefault();
      const inputValue = e.target.value;
      setSearchInput(inputValue);
      console.log(inputValue);
      const res = await axios.get(`${API_URL}/foods`);
      const foodsArray = res.data.data;
      console.log(res);
      foodsArray.sort((a, z) => {
        return parseInt(z.name) - parseInt(a.name);
      });
      if (inputValue.trim() === "") {
        setSearchFilter([]);
      } else {
        setFoods(foodsArray);
        const filteredFoods = foodsArray.filter((food) =>
          food.origin.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSearchFilter(filteredFoods);
        console.log(searchFilter);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = async (e) => {
    navigate(`/foods/${e}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods`);
        const foodsArray = res.data.data;
        foodsArray.sort((a, z) => {
          return parseInt(z.name) - parseInt(a.name);
        });
        setIsLoading(false);
        setFoods(foodsArray);
        const token = localStorage.getItem("token");
        if (token) {
          // if the user is authenticated, retrieve their my-list data
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const res1 = await axios.get(`${API_URL}/my-list`);
          setUsersList(res1.data.foods);
        } else {
          // if the user is not authenticated, set usersList to an empty array
          setUsersList([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="explore">
      <section className="explore-header">
        <h1 className="explore-title">Welcome to the foods padadise</h1>
      </section>
      <form className="search-form">
        <input
          className="input-search icon-right"
          type="text"
          placeholder="Search by country"
          onChange={handleChange}
          value={searchInput}
        />
        {searchFilter.map((element) => (
          <Dropdown.Item
            key={element._id}
            onClick={() => onClick(element._id)}
            to={`/foods/${element._id}`}
          >
            <span className="dropdown-search">
              <img className="flag-card" src={element.flagUrl} />
              <p>{element.name}</p>
            </span>
          </Dropdown.Item>
        ))}
      </form>
      <h1 className="bigTitle">Check out the top 10 foods in the world</h1>
      {!loggedIn && (
        <h4 className="subTitle">
          Log in to add a food with its recipe to your own list
        </h4>
      )}
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className="food-card">
          {foods.map((element) => (
            <FoodCard
              element={element}
              key={element._id}
              usersList={usersList}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
