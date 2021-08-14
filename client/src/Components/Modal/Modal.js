import React from "react";
import ReactDom from "react-dom";

// Styles.
import "./Model.css";
import { Button } from "react-bootstrap";

// Icons.
import { BiGroup } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrello } from "react-icons/fa";

// Images.
import bricks from "../../Images/bricks.jpg";
import autumn from "../../Images/autumn.jpg";
import classs from "../../Images/classs.jpg";
import color from "../../Images/color.jpg";
import farm from "../../Images/farm.jpg";
import fish from "../../Images/fish.jpg";
import fun from "../../Images/fun.jpg";
import gradiant from "../../Images/gradiant.jpg";
import wood from "../../Images/wood.jpg";

const BackDrop = (props) => {
  return <div className="model" onClick={props.handleClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="board_modal">
      <div  className="modal_input_theme">
        <div style={{backgroundImage: `url(${wood})`}} className="modal_input">
          <input
            className="input_style"
            id="name"
            {...props.register("name", {
              required: "This field is required",
            })}
            name="name"
            type="text"
            placeholder="Add Board title"
            autocomplete="off"
            autoFocus
          />
          <small className="error_username">
            {props.errors.username && (
              <div>{props.errors.username.message}</div>
            )}
          </small>
          <p>{props.username}'s Team</p>
          <div className="input_workspace">
            <BiGroup />
            <p>Workspace visible</p>
            <IoIosArrowDown />
          </div>
        </div>
        <div className="modal_theme_selector">
          <div className="theme_first_row">
            <div className="theme_box">
              <img
                src={autumn}
                height="30px"
                width="30px"
                alt="autumn"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <div className="theme_box">
              <img
                src={bricks}
                height="30px"
                width="30px"
                alt="bricks"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <div className="theme_box">
              <img
                src={classs}
                height="30px"
                width="30px"
                alt="classs"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
          <div className="theme_first_row">
            <div className="theme_box">
              <img
                src={color}
                height="30px"
                width="30px"
                alt="color"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <div className="theme_box">
              <img
                src={farm}
                height="30px"
                width="30px"
                alt="farm"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <div className="theme_box">
              <img
                src={fish}
                height="30px"
                width="30px"
                alt="fish"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
          <div className="theme_first_row">
            <div className="theme_box">
              <img
                src={fun}
                height="30px"
                width="30px"
                alt="fun"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <div className="theme_box">
              <img
                src={gradiant}
                height="30px"
                width="30px"
                alt="gradiant"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            <div className="theme_box">
              <img
                src={wood}
                height="30px"
                width="30px"
                alt="wood"
                style={{
                  borderRadius: 4,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal_buttons">
        <Button
          onClick={props.clickHandler}
          className="button_createBoard"
          variant="light"
        >
          Create Board
        </Button>
        <div className="buton_template">
          <FaTrello />
          <p>Start with a template</p>
        </div>
      </div>
    </div>
  );
};

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <BackDrop handleClose={props.handleClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          register={props.register}
          errors={props.errors}
          username={props.username}
          clickHandler={props.clickHandler}
          handleClose={props.handleClose}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}

export default Modal;
