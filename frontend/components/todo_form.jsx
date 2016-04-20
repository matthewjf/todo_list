var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoForm = React.createClass({
  getInitialState: function(){
    return {
      title: "",
      body: ""
    };
  },

  resetState: function() {
    this.setState({title: '', body: ''});
  },

  updateTitle: function(event){
    var title = event.currentTarget.value;
    this.setState({title: title});
  },

  updateBody: function(event){
    var body = event.currentTarget.value;
    this.setState({body: body});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    TodoStore.create(this.state);
    this.resetState();
  },

  render: function () {
    return (
      <div>
        <h1>New Todo</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Title
            <input type="text" onChange={this.updateTitle}/>
          </label>

          <label>Body
            <input type="text" onChange={this.updateBody}/>
          </label>

          <input type="submit" value="add todo" />
        </form>
      </div>
    );
  }

});

module.exports = TodoForm;
