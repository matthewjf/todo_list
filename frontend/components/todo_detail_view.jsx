var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoDetailView = React.createClass({

  // handleDone: function(event) {
  //   event.preventDefault();
  //   TodoStore.toggleDone(this.props.todo.id);
  //
  // },
  handleDestroy: function(event) {
    event.preventDefault();
    TodoStore.destroy(this.props.todo.id);
  },

  render: function () {
    var todoItem = this.props.todo;

    return (
      <div>
        <div>
          {todoItem.body}
        </div>
        <button onClick={this.handleDestroy}>Delete Todo</button>
      </div>

    );
  }

});

module.exports = TodoDetailView;
