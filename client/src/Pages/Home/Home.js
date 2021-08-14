import React, { useState, useEffect } from "react";

// Styles.
import "./Home.css";

// Icons.
import { VscPulse } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckBox } from "react-icons/bs";
import { FiHeart, FiSettings } from "react-icons/fi";
import { HiOutlineTable } from "react-icons/hi";
import { BiGroup, BiTimeFive } from "react-icons/bi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiAndroidFill } from "react-icons/ri";
import { FaTrello } from "react-icons/fa";

// Components.
import Header from "../../Components/Header/Header";
import Board from "../../Components/Board/Board";
import Modal from "../../Components/Modal/Modal";

// Packages.
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Api.
import { API } from "../../api/axios";

function Home() {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: { "auth-token": token },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    API.patch(`users/addboard/${User.username}`, data, config);
    setShow(false);
  };

  const [isdown, setIsdown] = useState({ open: true });
  const [Boards, setBoards] = useState([]);
  const [User, setUser] = useState([]);
  const [show, setShow] = useState({ open: false });
  const [Select, setSelect] = useState("board");

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const modelHandle = () => {
    setShow({ open: !show.open });
  };

  const dropdownHandle = () => {
    setIsdown({ open: !isdown.open });
  };

  useEffect(() => {
    API.get(`users/admin`, config).then((res) => {
      setUser(res.data);
      setBoards(res.data.board);
    });
  }, [Boards]);

  return (
    <div>
      {show.open && (
        <Modal
          register={register}
          errors={errors}
          username={User.username}
          clickHandler={handleSubmit(onSubmit)}
          handleClose={handleClose}
        />
      )}
      <div className="scroll">
        <Header username={User.username} email={User.email} />
        <div className="home">
          {/* Left-Section */}
          <div className="home_left">
            <div
              className={
                Select === "board" ? "home_links_active" : "home_links"
              }
            >
              <FaTrello />
              <p>
                <strong>Board</strong>
              </p>
            </div>
            <div className="home_links">
              <FaTrello />
              <p>
                <strong>Templates</strong>
              </p>
            </div>
            <div className="home_links">
              <VscPulse />
              <p>
                <strong>Home</strong>
              </p>
            </div>
            <div className="workspaces">
              <p>
                <strong>WORKSPACES</strong>
              </p>
              <div>
                <AiOutlinePlus />
              </div>
            </div>
            <div
              className="left_dropdown"
              onClick={() => {
                dropdownHandle();
              }}
            >
              <p>
                <strong>{User.username}'s Team</strong>
              </p>
              {isdown.open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {isdown.open && (
              <div className="dropdown_list">
                <div className="lists">
                  <p>
                    <BsCheckBox /> Getting started
                  </p>
                </div>
                <div className="lists">
                  <p>
                    <FaTrello /> Board
                  </p>
                </div>
                <div className="lists">
                  <p>
                    <FiHeart /> Highlights
                  </p>
                </div>
                <div className="lists">
                  <p>
                    <HiOutlineTable /> Workspace table
                  </p>
                </div>
                <div className="lists">
                  <p>
                    <BiGroup /> Members
                  </p>
                </div>
                <div className="lists">
                  <p>
                    <FiSettings /> Settings
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="home_right">
            <div className="right_recent">
              <BiTimeFive size="25" />
              <p className="recent_p">
                <strong>Recently viewed</strong>
              </p>
            </div>
            <div className="workspace_boards">
              <Link to="/board" style={{ textDecoration: "none" }}>
                <Board name="Learning Notes" />
              </Link>
              <Link to="/board" style={{ textDecoration: "none" }}>
                <Board name="Vuejs Notes" />
              </Link>
            </div>

            <div className="right_workspace">
              <p className="workspace_p">
                <strong>YOUR WORKSPACES</strong>
              </p>
              <div className="workspace_header">
                <p>
                  <strong>{User.username}'s Team</strong>
                </p>
                <div className="workspace_links">
                  <Link
                    to={{
                      pathname: "/userteam",
                      state: "board",
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="workspace_header_board">
                      <FaTrello />
                      <p>Boards</p>
                    </div>
                  </Link>
                  <Link
                    to={{
                      pathname: "/userteam",
                      state: "workspace",
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="workspace_header_worktable">
                      <HiOutlineTable />
                      <p>Workspace table</p>
                    </div>
                  </Link>
                  <div className="workspace_header_member">
                    <BiGroup />
                    <p>Memeber(2)</p>
                  </div>
                  <div className="workspace_header_settings">
                    <FiSettings />
                    <p>Settings</p>
                  </div>
                  <div className="workspace_header_upgrade">
                    <RiAndroidFill />
                    <p>Upgrade</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="workspace_boards">
              {Boards.map((val) => (
                <Link
                  to={{
                    pathname: `/board/${val.name}`,
                    state: { boards: val },
                  }}
                  key={val._id}
                  style={{ textDecoration: "none" }}
                >
                  <Board name={val.name} />
                </Link>
              ))}
              <div className="create_board" onClick={() => modelHandle()}>
                <p>create new board</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
