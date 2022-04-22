import {createStore} from "redux";
import todoReducer from "./todoReducer";
import {composeWithDevTools} from "@redux-devtools/extension";


// @ts-ignore
export const store = createStore(todoReducer, composeWithDevTools())

