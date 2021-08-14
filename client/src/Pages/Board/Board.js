import React, { useState, useEffect } from "react";

// Styles.
import "./Board.css";
import { Button } from "react-bootstrap";

// Icons.
import { AiOutlinePlus } from "react-icons/ai";

// Images.
import wood from "../../Images/wood.jpg";

// Components.
import BoardHeader1 from "../../Components/BoardHeader1/BoardHeader1";
import BoardHeader2 from "../../Components/BoardHeader2/BoardHeader2";
import TodoTable from "../../Components/TodoTable/TodoTable";

// Packages.
import { useForm } from "react-hook-form";
import { useParams, useLocation } from "react-router-dom";

// Api.
import { API } from "../../api/axios";

function Board() {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: { "auth-token": token },
  };

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const location = useLocation();

  const [UserEmail, setUserEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [TodoTables, setTodoTables] = useState([]);
  const [ShowInput, setShowInput] = useState({ open: false });

  const handleShowInput = () => setShowInput({ open: true });
  const handleHideInput = () => setShowInput({ open: false });

  const { boardname } = useParams();

  const onSubmit = (data) => {
    const tableData = {
      board_id: location.state.boards._id,
      title: data.title,
    };
    API.patch(`users/addtodotable/${Username}`, tableData, config);
    handleHideInput();
    reset("", {
      keepValues: false,
    });
  };

  useEffect(() => {
    API.get(`users/admin`, config).then((res) => {
      setUsername(res.data.username);
      setUserEmail(res.data.email);
    });

    API.patch(
      `users/todotable/${Username}`,
      {
        board_id: location.state.boards._id,
      },
      config
    )
      .then((response) => {
        setTodoTables(response.data);
      })
      .catch((err) => console.log(err));
  }, [TodoTables, Username, boardname]);

  return (
    <div style={{ backgroundImage: `url(${wood})` }} className="boardpage">
      <BoardHeader1 username={Username} email={UserEmail} />
      <BoardHeader2 username={Username} name={boardname} />
      <div className="todotables_flex">
        {TodoTables.map((val) => (
          <div key={val._id}>
            <TodoTable
              boardId={location.state.boards._id}
              tableId={val._id}
              username={Username}
              title={val.title}
            />
          </div>
        ))}

        {ShowInput.open === false ? (
          <div onClick={handleShowInput} className="add_board_button">
            <AiOutlinePlus />
            <p>Add another list</p>
          </div>
        ) : (
          <div className="add_board_input">
            <input
              className="input"
              id="title"
              name="title"
              {...register("title", {
                required: true,
              })}
              type="text"
              placeholder="Enter list title..."
              autoFocus
              autoComplete="off"
            />
            <div className="button_icon">
              <Button onClick={handleSubmit(onSubmit)}>Add list</Button>
              <div onClick={handleHideInput} className="add_board_icon">
                <AiOutlinePlus size="30px" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
