import {ADD_LIST, ADD_TODO, CH_ORDER, CH_STATUS, CH_TODO, RENAME_LIST, RM_LIST, RM_TODO} from "./types";
import {DropResult} from "react-beautiful-dnd";

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
        type: RM_LIST,
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
            isDone: false
        }
    }
}

export function removeTodoAction(listId: string, itemId: string) {
    return {
        type: RM_TODO,
        payload: {
            listId: listId,
            itemId: itemId
        }
    }
}

export function changeTodoAction(listId: string, itemId: string, text: string) {
    return {
        type: CH_TODO,
        payload: {
            listId: listId,
            itemId: itemId,
            text: text
        }
    }
}

export function changeTodoStatusAction(listId: string, itemId: string, isDone: boolean) {
    return {
        type: CH_STATUS,
        payload: {
            listId: listId,
            itemId: itemId,
            isDone: isDone
        }
    }
}

export function changeTodosOrderAction(dropResult: DropResult) {
    return {
        type: CH_ORDER,
        payload: {
            dropResult: dropResult
        }
    }
}