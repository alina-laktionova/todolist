import {ActionType} from "../models/ActionType";
import {ADD_LIST, ADD_TODO, CH_ORDER, CH_STATUS, CH_TODO, RENAME_LIST, RM_LIST, RM_TODO} from "./types";
import TodoListInterface from "../models/TodoListInterface";
import {DropResult} from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';
import TodoItemInterface from "../models/TodoItemInterface";


const init: TodoListInterface[] = [
    {
        id: '1', name: 'Todo list1', todos: [
            {id: '11', text: 'task1', isDone: false},
            {id: '12', text: 'task2', isDone: false},
        ]
    },
    {
        id: '2', name: 'Todo list2', todos: [
            {id: '21', text: 'task11', isDone: false},
            {id: '22', text: 'task22', isDone: false},
            {id: '23', text: 'task33', isDone: false},
        ]
    }
]

export default function todoReducer(todoLists: TodoListInterface[] = init, action: ActionType) {
    switch (action.type) {
        case ADD_LIST:
            console.log('add list: name = ' + action.payload.name)
            return [...todoLists, {id: uuid(), name: action.payload.name, todos: action.payload.todos}];
        case RM_LIST:
            console.log('remove list: id = ' + action.payload.listId)
            return todoLists.filter(list => list.id !== action.payload.listId);
        case RENAME_LIST:
            console.log('rename list: id = ' + action.payload.listId + ', name = ' + action.payload.name)
            return todoLists.map(list => {
                if (list.id === action.payload.listId) {
                    return {...list, name: action.payload.name};
                }
                return list;
            });
        case ADD_TODO:
            console.log('add todo: listId = ' + action.payload.listId + ', text = ' + action.payload.text)
            return todoLists.map(list => {
                if (list.id === action.payload.listId) {
                    const newTodo = {id: uuid(), text: action.payload.text, isDone: action.payload.isDone}
                    return {...list, todos: [...list.todos, newTodo]}
                }
                return list;
            })
        case RM_TODO:
            console.log('remove todo: listId = ' + action.payload.listId + ', itemId = ' + action.payload.itemId)
            return todoLists.map(list => {
                if (list.id === action.payload.listId) {
                    const newTodos = list.todos.filter(todo => todo.id !== action.payload.itemId)
                    return {...list, todos: newTodos}
                }
                return list;
            })
        case CH_TODO:
            console.log('change todo text: listId = ' + action.payload.listId + ', itemId = ' + action.payload.itemId + ', text = ' + action.payload.text)
            return todoLists.map(list => {
                if (list.id === action.payload.listId) {
                    const newTodos = list.todos.map(todo => {
                        if (todo.id === action.payload.itemId) {
                            return {...todo, text: action.payload.text};
                        }
                        return todo;
                    })
                    return {...list, todos: newTodos}
                }
                return list;
            })
        case CH_STATUS:
            console.log('change todo status: listId = ' + action.payload.listId + ', itemId = ' + action.payload.itemId + ', isDone = ' + action.payload.isDone)
            return todoLists.map(list => {
                if (list.id === action.payload.listId) {
                    const newTodos = list.todos.map(todo => {
                        if (todo.id === action.payload.itemId) {
                            return {...todo, isDone: action.payload.isDone};
                        }
                        return todo;
                    })
                    return {...list, todos: newTodos}
                }
                return list;
            })
        case CH_ORDER:
            console.log('drag and drop')
            return dragAndDrop(todoLists, action.payload.dropResult)
        default:
            return todoLists
    }
}


function dragAndDrop(lists: TodoListInterface[], result: DropResult): TodoListInterface[] | undefined {
    let newListsState: TodoListInterface[] = [...lists]
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {                                   //moving between lists
        const sourceList: TodoListInterface | undefined =
            newListsState.find((list: TodoListInterface) => list.id === source.droppableId);
        const destList: TodoListInterface | undefined =
            newListsState.find((list: TodoListInterface) => list.id === destination.droppableId);

        if (sourceList && destList) {
            const sourceItems: TodoItemInterface[] = [...sourceList.todos];
            const destItems: TodoItemInterface[] = [...destList.todos];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            const newSourceList: TodoListInterface = {...sourceList, todos: sourceItems}
            const newDestList: TodoListInterface = {...destList, todos: destItems}

            newListsState = newListsState.map((list: TodoListInterface) => {
                if (list.id === newSourceList.id) return newSourceList
                if (list.id === newDestList.id) return newDestList
                return list
            })
        }
    } else {                                                                              //reordering todos in one list
        const reorderedList: TodoListInterface | undefined =
            newListsState.find((list: TodoListInterface) => list.id === source.droppableId);

        if (reorderedList) {
            const copiedItems: TodoItemInterface[] = [...reorderedList.todos];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            const newSourceList: TodoListInterface = {...reorderedList, todos: copiedItems}
            newListsState = newListsState.map((list: TodoListInterface) => {
                if (list.id === newSourceList.id) return newSourceList
                return list
            })
        }
    }
    return newListsState
}
