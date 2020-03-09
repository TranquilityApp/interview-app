import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import App from "./components/App";
import "./index.css";

library.add(faEdit, faTrashAlt);

ReactDOM.render(<App />, document.getElementById("root"));
