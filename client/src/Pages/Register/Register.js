import React from "react";

// Styles.
import "../Login/Login.css";
import { Form, Button } from "react-bootstrap";

// Icons.
import { SiTrello } from "react-icons/si";

// Packages.
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

// Api.
import { API } from "../../api/axios";

function Register() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    API.post("users/register", data)
      .then((res) => {
        // Save JWT token in localStorage
        localStorage.setItem("auth-token", res.data);
      })
      .catch((err) => alert(err));
    history.push("/admin");
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
          <strong>Sign up for your account</strong>
        </p>
        <Form.Control
          id="username"
          {...register("username", {
            required: "This field is required",
          })}
          name="username"
          type="text"
          placeholder="Username"
        />
        <small className="error_username">
          {errors.username && <div>{errors.username.message}</div>}
        </small>
        <p></p>
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
          autoComplete="current-password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              message:
                "Password must be contain UpperCase, LowerCase, Number/special Charecter and min 8 charecters",
            },
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
          <strong>Continue</strong>
        </Button>
        <p></p>
        <p>OR</p>
        <p>
          Already have an Account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
