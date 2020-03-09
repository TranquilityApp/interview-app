import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import styles from "./TodoItem.module.css";

export default class TodoItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired
    }),
    onEditItem: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired
  };

  onChangeCompleteItem = event => {
    this.props.onToggleComplete(this.props.item.id);
  };

  onClickEdit = event => {
    event.preventDefault();
    this.props.onEditItem(this.props.item.id);
  };

  onClickRemove = event => {
    event.preventDefault();
    this.props.onRemoveItem(this.props.item.id);
  };

  render() {
    return (
      <div className={styles.item}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={this.onChangeCompleteItem}
          defaultChecked={this.props.item.completed}
        />
        <span
          className={styles.description}
          style={{
            textDecoration: this.props.item.completed ? "line-through" : "none"
          }}
        >
          {this.props.item.description}
        </span>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            title="Edit Todo"
            onClick={this.onClickEdit}
          >
            <FontAwesomeIcon icon="edit" color="black" />
          </button>
          <button
            className={styles.button}
            title="Delete Todo"
            onClick={this.onClickRemove}
          >
            <FontAwesomeIcon icon="trash-alt" color="black" />
          </button>
        </div>
      </div>
    );
  }
}
