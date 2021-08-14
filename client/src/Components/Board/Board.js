import React from "react";
// Images.
import wood from "../../Images/wood.jpg"

// Styles.
import "./Board.css";

function Board(props) {
  return (
    <div>
      <div style={{backgroundImage: `url(${wood})`}} className="recent_board">
        <p>
          <strong>{props.name}</strong>
        </p>
      </div>
    </div>
  );
}

export default Board;
