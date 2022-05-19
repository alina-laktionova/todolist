import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, useMediaQuery} from "@mui/material";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DropResult
} from "react-beautiful-dnd";
import {dragAndDropAction, loadListsFromStorage} from "./store/actions";
import TodoList from "./components/TodoList";
import TodoListInterface from "./models/TodoListInterface";
import {LIST, STORAGE_KEY} from "./config/constants";
import {Dispatch} from "redux";
import ListInput from "./components/ListInput";


export default function App() {
    const todoLists: TodoListInterface[] = useSelector((todoLists: TodoListInterface[]) => todoLists)
    const dispatch = useDispatch<Dispatch>()

    const smScreen = useMediaQuery('(max-width:699.9px)');

    useEffect(() => {
        const listsString: string | null = localStorage.getItem(STORAGE_KEY)
        if (listsString) {
            const lists: TodoListInterface[] = JSON.parse(listsString)
            dispatch(loadListsFromStorage(lists))
        }
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todoLists))
    }, [todoLists]);


    function onDragEnd(result: DropResult) {
        dispatch(dragAndDropAction(result))
    }

    return (
        <Box sx={{
            height: '100vh',
            display: smScreen ? 'block' : 'flex',
            overflow: 'auto',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'max-content',
            }}>
                <ListInput/>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={'listBoard'}
                               key={'listBoard'}
                               direction={smScreen ? 'vertical' : 'horizontal'}
                               type={LIST}>
                        {(provided: DroppableProvided) => (
                            <Box ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 sx={{
                                     display: 'flex',
                                     minWidth: smScreen ? '97vw' : '100vw',
                                     padding: smScreen ? '0 1vw 0 1.5vw' : '0 10px',
                                     flexDirection: smScreen ? 'column' : 'row',
                                 }}>
                                {todoLists.map((list: TodoListInterface, index: number) =>
                                    <Draggable draggableId={list.id} index={index} key={list.id}>
                                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                            <Box ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}>
                                                <TodoList todos={list.todos} listId={list.id} name={list.name}
                                                          key={list.id} isDragging={snapshot.isDragging}/>
                                            </Box>
                                        )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </Box>
    )
}


