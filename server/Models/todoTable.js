const mongoose = require("mongoose");
const Todo = require("./todo").schema;

const todoTableSchema = new mongoose.Schema({
    title: {
        type: String
    },

    todo: [Todo]
});

const TodoTable = mongoose.model("TodoTable", todoTableSchema);

module.exports = TodoTable;