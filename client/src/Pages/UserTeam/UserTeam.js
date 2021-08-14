import React, { useState, useEffect } from "react";

// Styles.
import "./UserTeam.css";

// Icons.
import { VscEdit } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

// Components.
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";

// Packages.
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

// Api.
import { API } from "../../api/axios";

function UserTeam(props) {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: { "auth-token": token },
  };

  const Location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [key, setKey] = useState("workspace");
  const [search, setSearch] = useState("");
  const [User, setUser] = useState([]);
  const [Boards, setBoards] = useState([]);
  const [show, setShow] = useState({ open: false });

  const handleClose = () => setShow(false);

  const onSubmit = (data) => {
    API.patch(`users/addboard/${User.username}`, data, config);
    setShow(false);
  };

  const modelHandle = () => {
    setShow({ open: !show.open });
  };

  const searchHandle = (e) => {
    setSearch(e.target.value.substr(0, 20));
  };
  let filteredList = Boards.filter((board) => {
    return board.name.toLocaleLowerCase().indexOf(search) !== -1;
  });

  useEffect(() => {
    API.get(`users/admin`, config).then((res) => {
      setUser(res.data);
      setBoards(res.data.board);
    });
    setKey(Location.state);
  }, []);

  return (
    <div className="userteam">
      {show.open && (
        <Modal
          register={register}
          errors={errors}
          username={User.username}
          clickHandler={handleSubmit(onSubmit)}
          handleClose={handleClose}
        />
      )}
      <Header username={User.username} email={User.email} />
      <div className="Userteam_body">
        <div className="square_icon">
          <p>
            <strong>M</strong>
          </p>
        </div>
        <div className="userteam_name">
          <p>Mihir's Team</p>
          <div className="edit_workspace_details">
            <VscEdit />
            <p>Edit Workspace details</p>
          </div>
        </div>
      </div>
      <div className="userteam_tabs">
        <div className="tabs_container">
          <div
            className={
              key === "board"
                ? "active_tabs_button_container"
                : "tabs_button_container"
            }
            onClick={() => setKey("board")}
          >
            <p>
              <strong>Boards</strong>
            </p>
          </div>
          <div
            className={
              key === "workspace"
                ? "active_tabs_button_container"
                : "tabs_button_container"
            }
            onClick={() => setKey("workspace")}
          >
            <p>
              <strong>Workspace table</strong>
            </p>
          </div>
          <div
            className="tabs_button_container"
            onClick={() => setKey("member")}
          >
            <p>
              <strong>Members</strong>
            </p>
          </div>
          <div
            className="tabs_button_container"
            onClick={() => setKey("setting")}
          >
            <p>
              <strong>Settings</strong>
            </p>
          </div>
          <div
            className="tabs_button_container"
            onClick={() => setKey("business")}
          >
            <p>
              <strong>Business Class</strong>
            </p>
          </div>
        </div>

        {/* Board */}
        {key === "board" && (
          <div className="tab">
            <div className="board_tab">
              <div className="board_filters">
                <div className="filters_left">
                  <div className="sortby">
                    <p>Sort by</p>
                    <div className="sortby_input">
                      Most recent active
                      <IoIosArrowDown />
                    </div>
                  </div>
                  <div className="sortby">
                    <p>Filter by</p>
                    <div className="sortby_input">
                      Choose Collection...
                      <IoIosArrowDown />
                    </div>
                  </div>
                </div>
                <div className="sortby">
                  <p>Search</p>
                  <div className="search_input_icon">
                    <div className="search_icon">
                      <FiSearch />
                    </div>
                    <input
                      className="search_input"
                      type="text"
                      value={search}
                      onChange={searchHandle}
                      placeholder="Search all Workspace boards"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="board_boards">
                <div
                  className="userteam_create_board"
                  onClick={() => modelHandle()}
                >
                  <p>create new board</p>
                </div>
                {filteredList.map((val) => (
                  <Link
                    to={{
                      pathname: `/board/${val.name}`,
                      state: { boards: val },
                    }}
                    key={val._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="userteam_boards">
                      <p>{val.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workspace table */}
        {key === "workspace" && (
          <div className="workspace_container">
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
            >
              <div className="addBoard_input_container">Add boards</div>
              <div className="quickfilter_container">Quick filter</div>
              <div className="bookmark_container">Bookmark</div>
            </div>
            <div
              style={{
                height: "60%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <img
                src="https://a.trellocdn.com/prgb/dist/images/empty-states/mbtv-empty-state-board-placeholder.fe9e6cf490d7fff37282.svg"
                height="170px"
                width="270px"
                alt=""
              />
              <p style={{ fontSize: 19, fontWeight: "500" }}>
                Get even more perspective with the Workspace table
              </p>
              <p>
                Business Class Workspaces can combine boards into a table <br />
                view to filter, sort, and get more done.
              </p>
              <div className="trial_button">Start 14-day free trial</div>
            </div>
          </div>
        )}

        {/* Member */}
        <div></div>

        {/* Setting */}
        <div></div>

        {/* Business Class */}
        <div></div>
      </div>
    </div>
  );
}

export default UserTeam;
