import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";
import ToDoInput from "./components/ToDoInput";
import {DragDropContext, Droppable, DroppableProvided, DropResult} from "react-beautiful-dnd";
import {changeTodosOrderAction} from "./store/actions";
import ToDoList from "./components/ToDoList";

function App() {
    //Убрать вложеность, тип для state
    const todos = useSelector((state: any) => state.todos.todos)
    const dispatch = useDispatch()

    function onDragEnd(result: DropResult) {
        if (result.destination && result.source) {
            dispatch(changeTodosOrderAction(result.source.index, result.destination.index))
        }
    }

    return (<Box>
            <Typography>Tasks quantity: {todos.length}</Typography>
            <ToDoInput/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'todos'}>
                    {(provided: DroppableProvided) => (
                        <Box ref={provided.innerRef}>
                            <ToDoList/>
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}

export default App;
