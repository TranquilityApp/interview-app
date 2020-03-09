import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./TodoInput.module.css";

export default class TodoInput extends Component {
  static propTypes = {
    onNewItemSubmited: PropTypes.func.isRequired,
    editItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired
    })
  };
  constructor() {
    super();

    this.state = {
      newItem: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.editItem &&
      nextProps.editItem.id &&
      nextProps.editItem.description !== (prevState || prevState.newItem)
    ) {
      return prevState.newItem
        ? prevState.newItem
        : { newItem: nextProps.editItem.description };
    } else return null;
  }

  onSubmit = event => {
    event.preventDefault();
    const newItemDescription = this.state.newItem.trim();

    if (newItemDescription) {
      if (this.props.editItem) {
        this.props.onEditItemSubmited({
          ...this.props.editItem,
          description: newItemDescription
        });
      } else {
        const item = {
          description: newItemDescription,
          completed: false
        };
        this.props.onNewItemSubmited(item);
      }
    }

    this.setState({
      newItem: ""
    });
  };

  onDescriptionChange = event => {
    this.setState({
      newItem: event.target.value
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter a new todo"
          value={this.state.newItem}
          onChange={this.onDescriptionChange}
        />
        <button className={styles.submit} title="Submit Todo" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
