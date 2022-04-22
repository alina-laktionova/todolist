import {
    ADD_LIST,
    ADD_TODO,
    DRAG_AND_DROP,
    CH_TODO_STATUS,
    CH_TODO_TEXT,
    RENAME_LIST,
    DELETE_LIST,
    DELETE_TODO,
    LOAD_LISTS
} from "./types";
import {DropResult} from "react-beautiful-dnd";
import TodoListInterface from "../models/TodoListInterface";

export function loadListsFromStorage(lists: TodoListInterface[]) {
    return {
        type: LOAD_LISTS,
        payload: {
            lists: lists
        }
    }
}

export function addListAction(name: string) {
    return {
        type: ADD_LIST,
        payload: {
            name: name,
            todos: []
        }
    }
}

export function removeListAction(listId: string) {
    return {
        type: DELETE_LIST,
        payload: {
            listId: listId
        }
    }
}

export function renameListAction(listId: string, name: string) {
    return {
        type: RENAME_LIST,
        payload: {
            listId: listId,
            name: name
        }
    }
}

export function addTodoAction(listId: string, text: string) {
    return {
        type: ADD_TODO,
        payload: {
            listId: listId,
            text: text,
        }
    }
}

export function removeTodoAction(listId: string, itemId: string) {
    return {
        type: DELETE_TODO,
        payload: {
            listId: listId,
            itemId: itemId
        }
    }
}

export function changeTodoAction(listId: string, itemId: string, text: string) {
    return {
        type: CH_TODO_TEXT,
        payload: {
            listId: listId,
            itemId: itemId,
            text: text
        }
    }
}

export function changeTodoStatusAction(listId: string, itemId: string, isDone: boolean) {
    return {
        type: CH_TODO_STATUS,
        payload: {
            listId: listId,
            itemId: itemId,
            isDone: isDone
        }
    }
}

export function dragAndDropAction(dropResult: DropResult) {
    return {
        type: DRAG_AND_DROP,
        payload: {
            dropResult: dropResult
        }
    }
}