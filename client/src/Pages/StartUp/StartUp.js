import React, { useState } from "react";
import { Link } from "react-router-dom";

// Styles.
import "./StartUp.css";

// Icons.
import { SiTrello } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";
import { Button, Form } from "react-bootstrap";

function StartUp() {
  const isAuth = {
    token: localStorage.getItem("auth-token"),
  };
  const [Navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 70) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div className="startup">
      {/* header */}
      <div className={Navbar ? "header_startup active" : "header_startup"}>
        {/* Left */}
        <div className="header_left">
          <div className="header_icon">
            <SiTrello size="25" color="blue" />
          </div>
          <h2>
            <strong>Trello</strong>
          </h2>
        </div>

        {/* Right */}
        {isAuth.token ? (
          <div className="header_button">
            <Button href="/admin" variant="primary">
              <strong>Go to your boards</strong>
            </Button>
          </div>
        ) : (
          <div className="header_right">
            <a href="/login">
              <strong>Log in</strong>
            </a>
            <div className="header_button">
              <Button href="/register" variant="primary">
                <strong>Sign up</strong>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* body */}
      <div className="startup_body">
        <div className="body_text_img">
          <div className="body_text">
            {/* text */}
            <h1>
              Trello helps teams move work <br /> forward.
            </h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks.
              <br /> From high rises to the home office, the way your team works
              is <br /> unique—accomplish it all with Trello.
            </p>
            <div className="body_inp_btn">
              <Form.Control
                style={{ height: 42 }}
                type="email"
                placeholder="Email"
              />
              <Link
                to={{
                  pathname: `/register`,
                }}
              >
                <Button style={{ width: 240, height: 42 }} variant="primary">
                  <strong>Sign up-it's free</strong>
                </Button>
              </Link>
            </div>
          </div>
          <div className="body_image">
            <img src="hero.png" height="580px" width="430px" alt=""></img>
          </div>
        </div>

        <div className="body2_text">
          <h2>It’s more than work. It’s a way of working together.</h2>
          <p>
            Start with a Trello board, lists, and cards. Customize and expand
            with more features as your <br /> teamwork grows. Manage projects,
            organize tasks, and build team spirit—all in one place.
          </p>
          {isAuth.token ? (
            <Link
              to={{
                pathname: `/admin`,
              }}
            >
              <Button className="body2_button" variant="outline-primary">
                <b>Start doing</b> <BsArrowRight />
              </Button>
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/register`,
              }}
            >
              <Button className="body2_button" variant="outline-primary">
                <b>Start doing</b> <BsArrowRight />
              </Button>
            </Link>
          )}
          <div className="body2_image">
            <img src="board.png" height="800px" width="1150px" alt=""></img>
          </div>
          <p>
            Join over 1,000,000 teams worldwide that are using Trello to get
            more done.
          </p>
        </div>
        <p>© Copyright 2021. All rights reserved.</p>
      </div>
    </div>
  );
}

export default StartUp;
