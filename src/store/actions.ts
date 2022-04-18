import {v4 as uuid4} from 'uuid';
import {ADD_TODO, CH_ORDER, CH_STATUS, CH_TODO, RM_TODO} from "./types";

export function addTodoAction(text: string) {
    return {
        type: ADD_TODO,
        payload: {
            id: uuid4(),
            text: text,
            isDone: false
        }
    }
}

export function removeTodoAction(id: string) {
    return {
        type: RM_TODO,
        payload: {
            id: id
        }
    }
}

export function changeTodoAction(id: string, text: string) {
    return {
        type: CH_TODO,
        payload: {
            id: id,
            text: text
        }
    }
}

export function changeTodoStatusAction(id: string, status: boolean) {
    return {
        type: CH_STATUS,
        payload: {
            id: id,
            isDone: status
        }
    }
}

export function changeTodosOrderAction(startIndex: number, endIndex: number) {
    return {
        type: CH_ORDER,
        payload: {
            startIndex: startIndex,
            endIndex: endIndex
        }
    }
}