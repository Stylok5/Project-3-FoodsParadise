import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MyList = () => {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [list, setList] = useState([]);
  const [createFood, setCreateFood] = useState({
    foodUrl: "",
    flagUrl: "",
    name: "",
    origin: "",
    ingredients: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/my-list`);
        setList(res.data.foods);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onChangeHandler = (e) => {
    setCreateFood({
      ...createFood,
      [e.target.name]: e.target.value,
    });
    console.log(createFood);
  };

  const submitFoodForm = async (e) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const res = await axios.post(`${API_URL}/my-list`, createFood);
      setCreateFood({
        foodUrl: "",
        flagUrl: "",
        name: "",
        origin: "",
        ingredients: "",
      });
      const updatedList = await axios.get(`${API_URL}/my-list`);
      setList(updatedList.data.foods);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
  }, []);

  const removeFromList = async (foodId) => {
    try {
      const res = await axios.delete(`${API_URL}/my-list/${foodId}`);
      console.log(res);
      setList(list.filter((item) => item._id !== foodId));
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const updateFood = async (foodId, updatedFood) => {
    try {
      const res = await axios.put(`${API_URL}/my-list/${foodId}`, updatedFood);
      console.log(res);
      setList(
        list.map((item) => (item._id === foodId ? res.data.updatedFood : item))
      );
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="list-page">
      <div className="gradient"></div>
      <div className="gradient2"></div>
      <div className="list">
        {/* <h1 className="list-title">My List</h1> */}
        {/* {confirmMessage && <h4 className="success">{confirmMessage}</h4>} */}
        {error && <h4 className="error">{error}</h4>}
        <ul>
          <div class="food-cards-container">
            {list.map((item) => (
              <Card key={item._id} className="cardList">
                <li>
                  <Card.Body className="list-body">
                    <Card.Header className="card-title">
                      {item.name}
                    </Card.Header>
                    <Card.Title>
                      <img
                        className="img-list"
                        width="150px;"
                        src={item.foodUrl}
                      />
                      <img className="flagList-card" src={item.flagUrl} />
                      <Card.Text className="listOrigin">
                        {item.origin}
                      </Card.Text>
                    </Card.Title>
                    <Card.Text className="listIngredients">
                      {item.ingredients}
                    </Card.Text>
                    <Button
                      variant="danger"
                      className="list-delete"
                      onClick={() => removeFromList(item._id)}
                    >
                      Delete From List
                    </Button>
                  </Card.Body>
                </li>
                <li></li>
              </Card>
            ))}
          </div>
        </ul>
        <form className="list-form" onSubmit={submitFoodForm}>
          <input
            className="review-input"
            type="text"
            placeholder="Food URL"
            name="foodUrl"
            value={createFood.foodUrl}
            onChange={onChangeHandler}
            required
          />
          <input
            className="review-input"
            type="text"
            placeholder="Flag URL(not required)"
            name="flagUrl"
            value={createFood.flagUrl}
            onChange={onChangeHandler}
          />
          <input
            className="review-input"
            type="text"
            placeholder="Name"
            name="name"
            value={createFood.name}
            onChange={onChangeHandler}
            required
          />
          <input
            className="review-input"
            type="text"
            placeholder="Origin"
            name="origin"
            value={createFood.origin}
            onChange={onChangeHandler}
            required
          />
          <input
            className="review-input"
            type="text"
            placeholder="Ingredients(not required)"
            name="ingredients"
            value={createFood.ingredients}
            onChange={onChangeHandler}
          />
          <Button className="listBtn" variant="light" type="submit">
            Add a food of your choice
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyList;
