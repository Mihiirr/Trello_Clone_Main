const mongoose = require("mongoose");
const TodoTable = require("./todoTable").schema;

const boardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    
    todoTable: [TodoTable]
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;