import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts-data";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonActive, setButtonActive] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonActive(true);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password.length < 7 || formData.userName.length < 3) {
        setError("Invalid input please try again");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        const res = await axios.post(`${API_URL}/register`, formData);
        console.log(res);
        setMessage(res.data.message);
        setFormData(formData);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="main-form">
      <div className="back-form-register"></div>
      <span className="form-body">
        <h1 className="form-title">Register</h1>
        <form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Username"
              name="userName"
              onChange={onChange}
              value={formData.userName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="password"
              onChange={onChange}
              placeholder="Password"
              name="password"
              value={formData.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={onChange}
              value={formData.confirmPassword}
            />
          </Form.Group>
          {buttonActive ? (
            <Button
              className="form-btn"
              variant="primary"
              type="submit"
              size="lg"
              active
            >
              Register
            </Button>
          ) : (
            <Button
              className="form-btn"
              variant="secondary"
              type="submit"
              size="lg"
              disabled
            >
              Register
            </Button>
          )}
          {message && <h4 class="success">{message}</h4>}
          {error && <h4 className="error">{error}</h4>}
        </form>
      </span>
    </div>
  );
};

export default Register;
