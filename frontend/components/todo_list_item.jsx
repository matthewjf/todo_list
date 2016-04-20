var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var DoneButton = require('./done_button');
var TodoDetailView = require('./todo_detail_view');

var TodoListItem = React.createClass({

  getInitialState: function(){
    return { expanded: false };
  },

  toggleBody: function(event){
    var expandedOrCollapsed = this.state.expanded ? false: true;
    this.setState({ expanded: expandedOrCollapsed});
  },

  displayDetailView: function(){
    if (this.state.expanded){
      return <TodoDetailView todo={this.props.todo} />;
    } else {
      return;
    }
  },

  render: function () {
    var todoItem = this.props.todo;

    return (
      <div>
        <div onClick={this.toggleBody}>
          {todoItem.title}
        </div>
        <DoneButton todo={todoItem} />
        {this.displayDetailView()}

      </div>
    );
  }

});

module.exports = TodoListItem;
