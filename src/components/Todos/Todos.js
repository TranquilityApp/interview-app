import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

import styles from "./Todo.module.css";

const addItem = item => {
  return dispatch => {
    dispatch({ type: "ADD_NEW_ITEM", item });
  };
};

const editItem = item => {
  return dispatch => {
    dispatch({ type: "EDIT_ITEM", item });
  };
};

const removeItem = id => {
  return dispatch => {
    dispatch({
      type: "REMOVE_ITEM",
      id: id
    });
  };
};

class Todos extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  onNewItemSubmited = item => {
    this.props.dispatch(addItem(item));
  };

  onEditItemSubmited = item => {
    this.props.dispatch(editItem(item));
    this.props.dispatch({
      type: "FINISH_EDIT_ITEM"
    });
  };

  toggleItemCompletion = id => {
    this.props.dispatch({
      type: "TOGGLE_ITEM_COMPLETION",
      id: id
    });
  };

  startEditItem = id => {
    this.props.dispatch({
      type: "START_EDIT_ITEM",
      id: id
    });
  };

  removeItem = id => {
    this.props.dispatch(removeItem(id));
  };

  render() {
    const editItem = this.props.items.filter(item => {
      return item.id === this.props.activeEditItemId;
    })[0];

    return (
      <div className={styles.todoContainer}>
        <div>
          <TodoInput
            onNewItemSubmited={this.onNewItemSubmited}
            onEditItemSubmited={this.onEditItemSubmited}
            editItem={editItem}
          />
        </div>
        <div>
          <TodoList
            items={this.props.items}
            onToggleComplete={this.toggleItemCompletion}
            onEditItem={this.startEditItem}
            onRemoveItem={this.removeItem}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.todos,
    activeEditItemId: state.activeEditItemId
  };
};

export default connect(mapStateToProps)(Todos);
