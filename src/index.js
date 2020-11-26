import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import bootstrap from "bootstrap/dist/css/bootstrap.css"
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import CourseManagerComponent from "./components/CourseManagerComponent"
import widgetReducer from "./reducers/widgetsReducer";
import moduleReducer from "./reducers/moduleReducer";
import courseReducer from "./reducers/courseReducer";
import {lessonReducer} from "./reducers/lessonReducer";
import {topicReducer} from "./reducers/topicReducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

const reducer = combineReducers({
  widgetReducer, moduleReducer,courseReducer, lessonReducer,topicReducer
})

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
   <CourseManagerComponent/>  
  </Provider>

  ,document.getElementById("root")

 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
