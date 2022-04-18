import ToDoInterface from "../models/ToDoInterface";
import ToDoItem from "./ToDoItem";
import React from "react";
import {useSelector} from "react-redux";
import {Draggable} from "react-beautiful-dnd";
import {Box} from "@mui/material";

export default function ToDoList() {
    //вложенность
    const todos = useSelector((state: any) => state.todos.todos)

    return <>
        {todos.map((todo: ToDoInterface, index: number) => (
            <Draggable draggableId={todo.id} key={todo.id} index={index}>
                {(provided) => (
                    <Box ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                    >
                        <ToDoItem todo={todo} key={todo.id}/>
                    </Box>
                )}
            </Draggable>
        ))}
    </>
}