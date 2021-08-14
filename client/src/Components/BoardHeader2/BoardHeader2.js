import React from "react";

// Styles.
import "./BoardHeader2.css";

// Icons.
import { FaTrello } from "react-icons/fa";
import { BiGroup, BiStar, BiDotsHorizontalRounded } from "react-icons/bi";
import { BsLightningFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

// Packages
import Avatar from "react-avatar";

function BoardHeader2(props) {
  return (
    <div className="BoardHeader2">
      {/* Left */}
      <div className="BoardHeader2_left">
        <div className="header_board2">
          <FaTrello />
          <p className="board2_text">Boards</p>
          <IoIosArrowDown />
        </div>
        <div className="header_boardname2">
          <p>
            <strong>{props.name}</strong>
          </p>
        </div>
        <div className="header_star2">
          <BiStar />
        </div>
        <div className="header_team2">
          <p>{props.username}'s Team</p>
        </div>
        <div className="header_workspace2">
          <BiGroup />
          <p>Workspace visible</p>
        </div>
        <div className="header_avatar2">
          <Avatar name={props.username} round={true} size="30" />
        </div>
        <div className="header_invite2">
          <p>Invite</p>
        </div>
      </div>
      {/* Right */}
      <div className="header_right2">
        <div className="header_automation2">
          <BsLightningFill />
          <p>Automation</p>
        </div>
        <div className="header_showmenu2">
          <BiDotsHorizontalRounded />
          <p>Show menu</p>
        </div>
      </div>
    </div>
  );
}

export default BoardHeader2;
