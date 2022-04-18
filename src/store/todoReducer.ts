import ToDoInterface from "../models/ToDoInterface";
import {ActionType} from "../models/ActionType";
import {ADD_TODO, CH_ORDER, CH_STATUS, CH_TODO, RM_TODO} from "./types";

const init: { todos: ToDoInterface[] } = {
    todos: []
}

export default function todoReducer(state: { todos: ToDoInterface[] } = init, action: ActionType) {
    switch (action.type) {
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]};
        case RM_TODO:
            const arr = state.todos.filter(todo => todo.id !== action.payload.id);
            return {...state, todos: arr};
        case CH_TODO:
            const newText = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return {...todo, text: action.payload.text};
                }
                return todo;
            });
            return {...state, todos: newText};
        case CH_STATUS:
            const newStatus = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return {...todo, isDone: action.payload.isDone};
                }
                return todo;
            });
            return {...state, todos: newStatus};
        case CH_ORDER:
            const newOrder = [...state.todos];
            const [removed] = newOrder.splice(action.payload.startIndex, 1);
            newOrder.splice(action.payload.endIndex, 0, removed);
            return {...state, todos: newOrder}
        default:
            return state
    }
}
