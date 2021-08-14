import React, { useState } from "react";

// Styles.
import "./Header.css";

// Icons.
import { BsGrid3X3Gap, BsHouseDoor, BsBell } from "react-icons/bs";
import { FaTrello } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineInfoCircle } from "react-icons/ai";

// Components.
import AvatarDropDown from "../AvatarDropDown/AvatarDropDown";

// Packages.
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

function Header(props) {
  const [isDowns, setIsDowns] = useState({ open: false });

  const dropdownHandle = () => {
    setIsDowns({ open: !isDowns.open });
  };
  return (
    <div className="main">
      <div className="header">
        {/*left*/}
        <div className="header_left">
          <div className="header_menu">
            <BsGrid3X3Gap />
          </div>
          <Link to="/admin">
            <div className="header_home">
              <BsHouseDoor />
            </div>
          </Link>
          <div className="header_board">
            <FaTrello />
            <p className="board_text">
              <strong>Boards</strong>
            </p>
          </div>
          <div className="header_search">
            <p className="search_text">Jump to...</p>
            <FiSearch />
          </div>
        </div>

        {/*center*/}
        <div className="header_center">
          <FaTrello />
          <h4>
            <strong>Trello</strong>
          </h4>
        </div>

        {/*right*/}
        <div className="header_right">
          <div className="header_plus">
            <AiOutlinePlus />
          </div>
          <div className="header_info">
            <AiOutlineInfoCircle />
          </div>
          <div className="header_bell">
            <BsBell />
          </div>
          <div
            className="header_avatar"
            onClick={() => {
              dropdownHandle();
            }}
          >
            <Avatar name={props.username} size="30" round={true} />
          </div>
        </div>
      </div>
      {isDowns.open && (
        <AvatarDropDown username={props.username} email={props.email} />
      )}
    </div>
  );
}

export default Header;
