const express = require("express");
const router = express();
const verify = require("./verifyToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const User = require("../Models/user");

// @route GET /users
// @desc Get all users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .select("-password -email")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route GET /users/admin
// @desc Get user data
// @access Private
router.get("/admin", verify, (req, res) => {
  User.findById(req.user._id)
    .select("-password ")
    .then((user) => res.send(user));
});

// @route POST /users/register
// @desc Create a user (Register)
// @access Public
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email is already in the database
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Check if the username is already in the database
  const usernameExists = await User.findOne({ username });
  if (usernameExists) return res.status(400).send("Username already exists");

  // Salt and Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);

    // Send token to header
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route POST /users/login
// @desc Auth user (Login)
// @access Public
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const queryUsername = "^" + username + "$";
  const queryEmail = "^" + email + "$";

  // Check if username or email exists --> Check if password is correct --> Create jwt token --> Send token to header
  const userExists = await User.findOne({
    username: { $regex: queryUsername, $options: "i" },
  });
  if (!userExists) {
    const emailExists = await User.findOne({
      email: { $regex: queryEmail, $options: "i" },
    });
    if (!emailExists) {
      return res.status(400).send("Username/Email not found");
    } else {
      const validPass = await bcrypt.compare(password, emailExists.password);
      if (!validPass) return res.status(400).send("Invalid password");
      const token = jwt.sign({ _id: emailExists._id }, JWT_SECRET);
      res.header("auth-token", token).send(token);
    }
  } else {
    const validPass = await bcrypt.compare(password, userExists.password);
    if (!validPass) return res.status(400).send("Invalid password");
    const token = jwt.sign({ _id: userExists._id }, JWT_SECRET);
    res.header("auth-token", token).send(token);
  }
});

// Board Routes -----------------------------------------------------------------------------------------------------------------

// @route GET /users/boards/:username
// @desc Get all boards of a specific user
// @access Private
router.get("/boards/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .then((user) => res.json(user.board))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route PATCH /users/addboard/:username
// @desc Add a board of a specific user
// @access Private
router.patch("/addboard/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .select("-password -email")
    .then((user) => {
      const name = req.body.name;
      user.board.push({ name: name });
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route DELETE /users/deleteboard/:username
// @desc Delete a board of a specific user
// @access Private
router.delete("/deleteboard/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .select("-password -email")
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          user.board.splice(index, 1);
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// TodoTable Routes --------------------------------------------------------------------------------------------------------------

// @route GET /users/todotable/:username
// @desc get all todotable from a specific user's board
// @access Private
router.patch("/todotable/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          res.json(user.board[index].todoTable);
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route PATCH /users/addtodotable/:username
// @desc Add a todotable from a specific user's board
// @access Private
router.patch("/addtodotable/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          const title = req.body.title;
          user.board[index].todoTable.push({ title: title });
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route DELETE /users/deletetodotable/:username
// @desc Delete a todotable form a specific user's board
// @access Private
router.delete("/deletetodotable/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  const todoTable_id = req.body.todoTable_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .select("-password -email")
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          user.board[index].todoTable.forEach((todoTable, index1) => {
            if (todoTable._id.toString() === todoTable_id.toString()) {
              user.board[index].todoTable.splice(index1, 1);
              user
                .save()
                .then((user) => res.json(user))
                .catch((err) => res.status(400).json("Error: " + err));
            }
          });
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Todo Routes ----------------------------------------------------------------------------------------------------------------------------

// @route GET /users/todos/:username
// @desc get all todos from a specific user's board's todotable
// @access Private
router.patch("/todos/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  const todoTable_id = req.body.todoTable_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          user.board[index].todoTable.forEach((todoTable, index1) => {
            if (todoTable._id.toString() === todoTable_id.toString()) {
              res.json(user.board[index].todoTable[index1].todo);
            }
          });
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route PATCH /users/addtodo/:username
// @desc Add a todo a specific user's board's todotable
// @access Private
router.patch("/addtodo/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  const todoTable_id = req.body.todoTable_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .select("-password -email")
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          user.board[index].todoTable.forEach((todoTable, index1) => {
            if (todoTable._id.toString() === todoTable_id.toString()) {
              const todo = req.body.todo;
              user.board[index].todoTable[index1].todo.push({ todo: todo });
              user
                .save()
                .then((user) => res.json(user))
                .catch((err) => res.status(400).json("Error: " + err));
            }
          });
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route DELETE /users/deletetodo/:username
// @desc Delete a todo form a specific user's board's todotable
// @access Private
router.delete("/deletetodo/:username", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  const board_id = req.body.board_id;
  const todoTable_id = req.body.todoTable_id;
  const todo_id = req.body.todo_id;
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .select("-password -email")
    .then((user) => {
      user.board.forEach((board, index) => {
        if (board._id.toString() === board_id.toString()) {
          user.board[index].todoTable.forEach((todoTable, index1) => {
            if (todoTable._id.toString() === todoTable_id.toString()) {
              user.board[index].todoTable[index1].todo.forEach(
                (todo, index2) => {
                  if (todo._id.toString() === todo_id.toString()) {
                    user.board[index].todoTable[index1].todo.splice(index2, 1);
                    user
                      .save()
                      .then((user) => res.json(user))
                      .catch((err) => res.status(400).json("Error: " + err));
                  }
                }
              );
            }
          });
        }
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Theme Route -----------------------------------------------------------------------------------------

// @route PATCH /users/:username/theme
// @desc Update a user's Linktree theme
// @access Private
router.patch("/:username/theme", verify, (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  User.findOne({ username: { $regex: queryUsername, $options: "i" } })
    .select("-password -email")
    .then((user) => {
      const theme = req.body.theme;
      user.theme = parseInt(theme);
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
