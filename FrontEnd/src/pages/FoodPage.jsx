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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/foods/${foodId}`);
        setFood(res.data.data);
        console.log(res.data.data);
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
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`); // Assuming you have an endpoint to fetch the current user
      setCurrentUser(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const [reviewIdParam, setReviewIdParam] = useState("");
  const [updatedReview, setUpdatedReview] = useState("");
  const onChangeHandler = (e) => {
    SetReview(e.target.value);
  };
  const { reviewId } = useParams();
  const onChangeUpdatedReview = (e) => {
    setUpdatedReview(e.target.value);
  };

  const handleEditReview = (id, currentText) => {
    setUpdatedReview(currentText);
    setReviewIdParam(id); // Store the reviewId in a separate state variable
  };
  const updateReview = async (id) => {
    try {
      const res = await axios.patch(`${API_URL}/foods/${foodId}/${id}`, {
        text: updatedReview, // Use the updatedReview state variable for the new review text
      });
      setReviewIdParam(""); // Clear the review input field
      setConfirmMessage(res.data.msg); // Display success message
      setTimeout(() => {
        setConfirmMessage("");
      }, 3000);
      const res1 = await axios.get(`${API_URL}/foods/${foodId}`);
      setFood(res1.data.data);
      // Refresh the review list or update the specific review in the UI
    } catch (err) {
      setError(err.response.data.message); // Display error message
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
                        {currentUser &&
                          review.createdBy === currentUser._id && (
                            <Button
                              variant="light"
                              onClick={() =>
                                handleEditReview(review._id, review.text)
                              }
                            >
                              Edit
                            </Button>
                          )}
                      </li>
                    ))}
                  <div className="review-flexbox">
                    <form
                      className="review-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (reviewIdParam) {
                          updateReview(reviewIdParam);
                        } else {
                          addReview(foodId);
                        }
                      }}
                    >
                      {confirmMessage && (
                        <h4 className="success-review">{confirmMessage}</h4>
                      )}
                      {error && <h4 className="error-review">{error}</h4>}
                      {loggedIn ? (
                        <div className="input-review">
                          <input
                            className="review-input"
                            type="text"
                            placeholder="Submit or edit a review"
                            onChange={onChangeUpdatedReview}
                            value={updatedReview}
                          />
                          <Button variant="light" type="submit">
                            {reviewId ? "Update" : "Submit"}{" "}
                          </Button>
                        </div>
                      ) : (
                        <h2>Log in to submit or add a review</h2>
                      )}
                    </form>
                  </div>
                </div>
              </Tab>
              <Tab className="recipe" eventKey="home" title="Recipe">
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
