import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../consts-data";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

const FoodPage = () => {
  const [review, SetReview] = useState("");
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const { foodId } = useParams();
  const [error, setError] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const onChangeHandler = (e) => {
    SetReview(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`${API_URL}/foods/${foodId}`);
        setFood(res1.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [foodId]);

  const addReview = async (foodId) => {
    try {
      const res2 = await axios.post(`${API_URL}/foods/${foodId}`, {
        text: review,
      });
      SetReview("");
      setConfirmMessage(res2.data.message);
      const res1 = await axios.get(`${API_URL}/foods/${foodId}`);
      setFood(res1.data.data);
      setTimeout(() => {
        setConfirmMessage("");
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        <div className="food-page">
          <span className="food-header">
            <span className="header-left">
              <li>
                <h1 className="inv-title">{food.name}</h1>
              </li>
              <li>
                <h2 className="inv-origin">{food.origin}</h2>
              </li>
            </span>
            <li className="header-right">
              <img width="100%" src={food.foodUrl} />
            </li>
          </span>
          <li>
            <p className="inv-desc">{food.description}</p>
          </li>
          <section className="tabs-section">
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3 tabs"
              fill
            >
              <Tab eventKey="Reviews" title="Reviews">
                <div className="main-container">
                  {food.reviews &&
                    food.reviews.map((review, ind) => (
                      <li key={ind} className="posted">
                        {review.text}
                      </li>
                    ))}
                  <div className="review-flexbox">
                    <form
                      className="review-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addReview(foodId);
                      }}
                    >
                      {confirmMessage && (
                        <h4 className="success-review">{confirmMessage}</h4>
                      )}
                      {error && <h4 className="error-review">{error}</h4>}
                      <div className="input-review">
                        <input
                          className="review-input"
                          type="text"
                          placeholder="Add your review"
                          onChange={onChangeHandler}
                          value={review}
                        ></input>
                        <Button variant="light" type="submit">
                          Submit{" "}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="home" title="Recipe">
                {food.ingredients}
              </Tab>
            </Tabs>
          </section>
        </div>
      </ul>
    </div>
  );
};

export default FoodPage;
