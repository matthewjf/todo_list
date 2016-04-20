var _todos = [];
var _callbacks = [];

var TodoStore = {
  all: function() {
    return _todos.slice();
  },

  addCallback: function(callback){
    _callbacks.push(callback);
  },

  removeCallback: function(callback){
    for (var i = 0; i < _callbacks.length; i++){
      if (_callbacks[i] === callback){
        _callbacks.splice(i, 1);
        return;
      }
    }
  },

  resetTodos: function (todos) {
    _todos = todos;
  },

  addTodo: function (todo){
    _todos.push(todo);
  },

  changed: function() {
    _callbacks.forEach(function (callback) {
      callback();
    });
  },

  fetch: function() {
    var store = this;
    $.ajax({
      url: "/api/todos",
      method: "GET",
      success: function (todos) {
        store.resetTodos(todos);
        store.changed();
      }
    });
  },

  create: function(data){
    var store = this;

    $.ajax({
      url: "/api/todos",
      data: {todo: data},
      method: "POST",
      success: function(todo){
        store.addTodo(todo);
        store.changed();
      }
    });
  },

  destroy: function(id){
    var store = this;
    var todoIdx = store.todoIds().indexOf(id);
    if ( todoIdx >= 0){
      $.ajax({
        url: "/api/todos/" + id,
        method: "DELETE",
        success: function (todo){
          _todos.splice(todoIdx, 1);
          store.changed();
        }
      });
    }
  },

  toggleDone: function(id) {
    var store = this;
    var todoIdx = store.todoIds().indexOf(id);
    var newDoneValue;

    if ( todoIdx >= 0){

      if (_todos[todoIdx].done === true){
        newDoneValue = false;
      } else {
        newDoneValue = true;
      }

      $.ajax({
        url: "/api/todos/" + id,
        method: "PATCH",
        data: {todo: {done: newDoneValue}},
        success: function (todo){
          _todos[todoIdx].done = newDoneValue;
          store.changed();

        }
      });
    }
  },

  todoIds: function() {
    return _todos.map(function(todo) {
      return todo.id;
    });
  }
};

module.exports = TodoStore;
