import React from "react";

// Styles.
import "./AvatarDropDown.css";

// Packages.
import Avatar from "react-avatar";

function AvatarDropDown(props) {
  const logOut = () => {
    localStorage.removeItem("auth-token");
    window.location = "/";
  };

  return (
    <div className="avatar_dropdown">
      <div className="dropdown_title">
        <p>Account</p>
      </div>
      <div className="accountdetails">
        <Avatar name={props.username} size="40" round={true} />
        <div className="accountdetails_useremail">
          <p className="accountdetails_p">{props.username}</p>
          <p className="accountdetails_email">{props.email}</p>
        </div>
      </div>
      <div className="dropdown_lists">
        <div className="listsdiv">
          <p>Profile and visibility</p>
        </div>
        <div className="listsdiv">
          <p>Activity</p>
        </div>
        <div className="listsdiv">
          <p>Cards</p>
        </div>
        <div className="listsdiv">
          <p>Settings</p>
        </div>
      </div>
      <div className="dropdown_lists2">
        <div className="listsdiv">
          <p>Help</p>
        </div>
        <div className="listsdiv">
          <p>Sorcuts</p>
        </div>
      </div>
      <div className="dropdown_lists3">
        <div className="listsdiv" onClick={logOut}>
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default AvatarDropDown;
