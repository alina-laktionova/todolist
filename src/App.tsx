import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, OutlinedInput, useMediaQuery} from "@mui/material";
import {
    DragDropContext,
    Draggable, DraggableProvided, DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DropResult
} from "react-beautiful-dnd";
import {addListAction, dragAndDropAction, loadListsFromStorage} from "./store/actions";
import TodoList from "./components/TodoList";
import TodoListInterface from "./models/TodoListInterface";
import {LIST, STORAGE_KEY} from "./config/constants";
import {Dispatch} from "redux";
import AddIcon from "@mui/icons-material/Add";


export default function App() {
    const todoLists: TodoListInterface[] = useSelector((todoLists: TodoListInterface[]) => todoLists)
    const dispatch = useDispatch<Dispatch>()

    const [listName, setListName] = useState<string>('')
    const smallScreen = useMediaQuery('(max-width:699.9px)');

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

    function addNewList(name: string) {
        dispatch(addListAction(name || 'Todo list'))
        setListName('')
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setListName(event.currentTarget.value)
    }

    function handleKeyPress(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            addNewList(listName)
        }
    }

    return <Box sx={{
        height: '100vh',
        overflow: 'auto',
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '20px',
        }}>
            <OutlinedInput
                sx={{
                    marginRight: '5px',
                    maxWidth: '300px',
                    width: '75%',
                    height: '56px'
                }}
                value={listName}
                onChange={handleChangeInput}
                onKeyDown={handleKeyPress}
                placeholder={'name of the list'}/>
            <Button variant={"contained"}
                    onClick={() => addNewList(listName)}
                    sx={{
                        boxShadow: 'none',
                        width: 'fit-content',
                        height: '56px',
                        backgroundColor: '#3f698b',
                        '&: hover': {
                            backgroundColor: '#27567c',
                        }
                    }}>
                {smallScreen ? <AddIcon/> : 'Add new list'}
            </Button>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>

            <Droppable droppableId={'listBoard'}
                       key={'listBoard'}
                       direction={smallScreen ? 'vertical' : 'horizontal'}
                       type={LIST}>
                {(provided: DroppableProvided) => (
                    <Box ref={provided.innerRef}
                         {...provided.droppableProps}
                         sx={{
                             display: 'flex',
                             marginX: smallScreen ? '5px' : '10px',
                             flexDirection: smallScreen ? 'column' : 'row',
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
}


