var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');

var TodoList = React.createClass({
  getInitialState: function() {
    return {todos: TodoStore.all()};
  },

  todosChanged: function () {
    this.setState({todos: TodoStore.all()});
  },

  componentDidMount: function(){
    TodoStore.addCallback(this.onChange);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeCallback(this.onChange);
  },

  onChange: function(){
    var todos = TodoStore.all();
    this.setState({todos: todos});
  },

  render: function () {
    var todoLis = this.state.todos.map (function (todo) {
      return <TodoListItem todo={todo} key={todo.id} />;
    });

    return (
      <div>
          {todoLis}
          <TodoForm />
      </div>
    );
  }

});

module.exports = TodoList;
