import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Todos from "../Todos";
import styles from "./App.module.css";

const activeEditItemId = (state = null, action) => {
  switch (action.type) {
    case "START_EDIT_ITEM":
      return action.id;
    case "FINISH_EDIT_ITEM":
      return null;
    default:
      return state;
  }
};

const itemsReducer = (
  state = [{ id: 1, description: "My Task", completed: true }],
  action
) => {
  switch (action.type) {
    case "ADD_NEW_ITEM":
      return [...state, { ...action.item, id: state.length + 1 }];
    case "REMOVE_ITEM":
      return state.filter(item => {
        return item.id !== action.id;
      });
    case "EDIT_ITEM":
      return state.map(item => {
        if (item.id === action.item.id) {
          return { ...item, description: action.item.description };
        }
        return item;
      });
    case "TOGGLE_ITEM_COMPLETION":
      return state.map(item => {
        if (item.id === action.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
    default:
      return state;
  }
};

const reducers = combineReducers({
  todos: itemsReducer,
  activeEditItemId: activeEditItemId
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h2>ToDo List</h2>
        </div>
        <Provider store={store}>
          <Todos />
        </Provider>
      </div>
    );
  }
}

export default App;
