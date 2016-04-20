var _steps = {};
var _callbacks = [];

var StepStore = {
  all: function(todoId) {
    return _steps[todoId.toString()];
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

  resetSteps: function (todoId, steps) {
    _steps[todoId] = steps;
  },

  addStep: function (todoId, step){
    if (_steps[todoId])
      _steps[todoId].push(step);
    else
      _steps[todoId] = [step];
  },

  changed: function() {
    _callbacks.forEach(function (callback) {
      callback();
    });
  },

  fetch: function(todoId) {
    var store = this;
    $.ajax({
      url: "/api/todos/" + todoId + "/steps" ,
      method: "GET",
      success: function (steps) {
        store.resetSteps(todoId, steps);
        store.changed();
      }
    });
  },

  create: function(todoId, data){
    var store = this;

    $.ajax({
      url: "/api/todos/" + todoId + "/steps",
      data: {todo: data},
      method: "POST",
      success: function(step){
        store.addStep(step);
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

module.exports = StepStore;
