import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

import styles from "./TodoList.module.css";

export default class TodoList extends Component {
  static propTypes = {
    onToggleComplete: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={styles.list}>
        {this.props.items.map(item => (
          <TodoItem {...this.props} key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
