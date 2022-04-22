import TodoItemInterface from "./TodoItemInterface";

export default interface TodoListInterface {
    id: string
    name: string,
    todos: TodoItemInterface[]
}
