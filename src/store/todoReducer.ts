import {ActionType} from "../models/ActionType";
import {
    ADD_LIST,
    ADD_TODO,
    CH_TODO_STATUS,
    CH_TODO_TEXT,
    DELETE_LIST,
    DELETE_TODO,
    DRAG_AND_DROP, LOAD_LISTS,
    RENAME_LIST
} from "./types";
import TodoListInterface from "../models/TodoListInterface";
import {DropResult} from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';
import TodoItemInterface from "../models/TodoItemInterface";
import {LIST} from "../config/constants";


const init: TodoListInterface[] = []

export default function todoReducer(todoLists: TodoListInterface[] = init, action: ActionType) {
    const {type, payload} = action

    switch (type) {
        case LOAD_LISTS:
            return payload.lists
        case ADD_LIST:
            return [...todoLists, {id: uuid(), name: payload.name, todos: payload.todos}];
        case DELETE_LIST:
            return todoLists.filter((list: TodoListInterface) => list.id !== payload.listId);
        case RENAME_LIST:
            return renameList(todoLists, payload.listId, payload.name);
        case ADD_TODO:
            return addTodo(todoLists, payload.listId, payload.text);
        case DELETE_TODO:
            return deleteTodo(todoLists, payload.listId, payload.itemId);
        case CH_TODO_TEXT:
            return changeTodoText(todoLists, payload.listId, payload.itemId, payload.text);
        case CH_TODO_STATUS:
            return changeTodoStatus(todoLists, payload.listId, payload.itemId, payload.isDone);
        case DRAG_AND_DROP:
            return onDragEnd(todoLists, payload.dropResult)
        default:
            return todoLists
    }
}


function renameList(lists: TodoListInterface[], listId: string, newName: string): TodoListInterface[] {
    return lists.map(list => {
        if (list.id === listId && list.name !== newName) {
            return {...list, name: newName};
        }
        return list;
    });
}

function addTodo(lists: TodoListInterface[], listId: string, todoText: string): TodoListInterface[] {
    return lists.map(list => {
        if (list.id === listId) {
            const newTodo = {id: uuid(), text: todoText, isDone: false}
            return {...list, todos: [...list.todos, newTodo]}
        }
        return list;
    })
}

function deleteTodo(lists: TodoListInterface[], listId: string, itemId: string): TodoListInterface[] {
    return lists.map(list => {
        if (list.id === listId) {
            const newTodos = list.todos.filter(todo => todo.id !== itemId)
            return {...list, todos: newTodos}
        }
        return list;
    })
}

function changeTodoText(lists: TodoListInterface[], listId: string, itemId: string, newText: string): TodoListInterface[] {
    return lists.map(list => {
        if (list.id === listId) {
            const newTodos = list.todos.map(todo => {
                if (todo.id === itemId) return {...todo, text: newText};
                return todo;
            })
            return {...list, todos: newTodos}
        }
        return list;
    })
}

function changeTodoStatus(lists: TodoListInterface[], listId: string, itemId: string, newStatus: boolean): TodoListInterface[] {
    return lists.map(list => {
        if (list.id === listId) {
            const newTodos = list.todos.map(todo => {
                if (todo.id === itemId) return {...todo, isDone: newStatus};
                return todo;
            })
            return {...list, todos: newTodos}
        }
        return list;
    })
}

function onDragEnd(lists: TodoListInterface[], result: DropResult): TodoListInterface[] {
    let newListsState: TodoListInterface[] = [...lists]
    const {destination, source, type} = result

    if (!destination)
        return newListsState;

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index)
        return newListsState;

    //moving lists
    if (type === LIST) {
        const newListOrder: TodoListInterface[] = [...lists]
        const [removed]: TodoListInterface[] = newListOrder.splice(source.index, 1);
        newListOrder.splice(destination.index, 0, removed);

        newListsState = [...newListOrder]
    }

    const sourceList: TodoListInterface | undefined = findListById(lists, source.droppableId)
    const destinationList: TodoListInterface | undefined = findListById(lists, destination.droppableId)

    if (sourceList && destinationList) {

        //moving items in one list
        if (sourceList === destinationList) {
            const newItemOrder: TodoItemInterface[] = [...sourceList.todos]
            const [removed]: TodoItemInterface[] = newItemOrder.splice(source.index, 1);
            newItemOrder.splice(destination.index, 0, removed)

            const newSourceList: TodoListInterface = {...sourceList, todos: newItemOrder}
            newListsState = newListsState.map((list: TodoListInterface) => {
                if (list.id === newSourceList.id) return newSourceList
                return list
            })
            return newListsState;
        }

        //moving items between lists
        const sourceItems: TodoItemInterface[] = [...sourceList.todos]
        const destinationItems: TodoItemInterface[] = [...destinationList.todos]
        const [removed]: TodoItemInterface[] = sourceItems.splice(source.index, 1)
        destinationItems.splice(destination.index, 0, removed)

        const newSourceList: TodoListInterface = {...sourceList, todos: sourceItems}
        const newDestinationList: TodoListInterface = {...destinationList, todos: destinationItems}

        newListsState = newListsState.map((list: TodoListInterface) => {
            if (list.id === newSourceList.id) return newSourceList
            if (list.id === newDestinationList.id) return newDestinationList
            return list
        })
    }
    return newListsState;
}

function findListById(lists: TodoListInterface[], id: string): TodoListInterface | undefined {
    return lists.find((list: TodoListInterface) => list.id === id)
}
