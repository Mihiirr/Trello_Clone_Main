import React, { useState, useEffect } from "react";
import "./TodoTable.css";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTable } from "react-icons/fa";

// Api.
import { API } from "../../api/axios";

function TodoTable(props) {
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

  const [Todos, setTodos] = useState([]);
  const [showTodoInput, setshowTodoInput] = useState({ open: false });

  const handleshowTodoInput = () => setshowTodoInput({ open: true });
  const handleHideTodoInput = () => setshowTodoInput({ open: false });

  const onSubmit = (data) => {
    const todoData = {
      board_id: props.boardId,
      todoTable_id: `${props.tableId}`,
      todo: data.todo,
    };
    console.log(todoData);
    API.patch(`users/addtodo/${props.username}`, todoData, config);
    handleHideTodoInput();
    reset("", {
      keepValues: false,
    });
  };

  useEffect(() => {
    const todoData = {
      board_id: `${props.boardId}`,
      todoTable_id: `${props.tableId}`,
    };
    API.patch(`users/todos/${props.username}`, todoData, config).then((res) =>
      setTodos(res.data)
    );
  }, [Todos, props.username, props.boardId, props.tableId, config]);

  return (
    <div className="todotable">
      {/* title */}
      <div>
        <div className="todotable_title">
          <p>{props.title}</p>
          <div className="menu_icon">
            <BiDotsHorizontalRounded />
          </div>
        </div>
        {/* todos */}
        {Todos.map((val) => (
          <div key={val._id} className="todo">
            <p>{val.todo}</p>
          </div>
        ))}

        {/* todoInput */}
        {showTodoInput.open === false ? (
          <div className="table_bottom">
            <div onClick={handleshowTodoInput} className="addtodobutton">
              <AiOutlinePlus />
              <p>Add another card</p>
            </div>
            <div className="bottom_icon">
              <FaTable />
            </div>
          </div>
        ) : (
          <div className="table_input">
            <textarea
              className="inputfield"
              id="todo"
              name="todo"
              type="text"
              placeholder="Enter a title for this card..."
              autoFocus
              autocomplete="off"
              {...register("todo", {
                required: "true",
              })}
            ></textarea>
            <div className="table_button_icon">
              <Button onClick={handleSubmit(onSubmit)}>Add</Button>
              <div
                onClick={handleHideTodoInput}
                className="table_add_board_icon"
              >
                <AiOutlinePlus size="30px" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoTable;
