var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var DoneButton = React.createClass({

  handleDone: function(event) {
    event.preventDefault();
    TodoStore.toggleDone(this.props.todo.id);

  },

  render: function () {

    var doneOrNot = this.props.todo.done ? "Undo" : "Done";

    return (
      <button onClick={this.handleDone} >{doneOrNot}</button>
    );
  }

});

module.exports = DoneButton;
