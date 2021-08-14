import React from "react";

// Styles.
import "./Login.css";
import { Form, Button } from "react-bootstrap";

// Icons.
import { SiTrello } from "react-icons/si";

// Packages.
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

// Api.
import { API } from "../../api/axios";

function Login() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await API.post("users/login", data)
      .then((res) => {
        // Save JWT token in localStorage
        localStorage.setItem("auth-token", res.data);
      })
      .catch((err) => alert(err));

    await history.push("/admin");
  };

  return (
    <div className="login">
      <div className="login_title">
        <SiTrello size="35" color="blue" />
        <p>
          <strong>Trello</strong>
        </p>
      </div>

      <div className="login_form">
        <p>
          <strong>Log in to Trello</strong>
        </p>
        <Form.Control
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Please Enter a valid Email",
            },
          })}
          name="email"
          type="email"
          placeholder="Email"
        />
        <small className="error_email">
          {errors.email && <div>{errors.email.message}</div>}
        </small>
        <p></p>
        <Form.Control
          id="password"
          name="password"
          type="password"
          {...register("password", {
            required: true,
          })}
          placeholder="Password"
        />
        <small className="error_password">
          {errors.password && <div>{errors.password.message}</div>}
        </small>
        <p></p>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="form_button"
          variant="success"
        >
          <strong>Log in</strong>
        </Button>
        <p></p>
        <p>OR</p>
        <p>
          Don't have an Account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
