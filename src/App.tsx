import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, OutlinedInput} from "@mui/material";
import {
    DragDropContext,
    Draggable, DraggableProvided,
    Droppable,
    DroppableProvided,
    DropResult
} from "react-beautiful-dnd";
import {addListAction, dragAndDropAction, loadListsFromStorage} from "./store/actions";
import TodoList from "./components/TodoList";
import TodoListInterface from "./models/TodoListInterface";
import {LIST, STORAGE_KEY} from "./config/constants";


function App() {
    const todoLists: TodoListInterface[] = useSelector((todoLists: TodoListInterface[]) => todoLists)
    const dispatch = useDispatch()

    const [listName, setListName] = useState<string>('')

    useEffect(() => {
        const listsString: string | null = localStorage.getItem(STORAGE_KEY)
        if (listsString) {
            const lists: TodoListInterface[] = JSON.parse(listsString)
            dispatch(loadListsFromStorage(lists))
        }
    }, [])

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

    return <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 0 20px 0'
        }}>
            <OutlinedInput
                sx={{
                    marginRight: '5px',
                    width: '300px'
                }}
                value={listName}
                onChange={handleChangeInput}
                onKeyDown={handleKeyPress}
                placeholder={'name of the list'}/>
            <Button variant={"contained"}
                    onClick={() => addNewList(listName)}
                    sx={{
                        height: '56px',
                        backgroundColor: '#3f698b',
                        '&: hover': {
                            backgroundColor: '#27567c',
                        }
                    }}
            >
                Add new list
            </Button>
        </Box>

        <Droppable droppableId={'listBoard'}
                   key={'listBoard'}
                   direction="horizontal"
                   type={LIST}>
            {(provided: DroppableProvided) => (
                <Box ref={provided.innerRef}
                     {...provided.droppableProps}
                     sx={{
                         display: 'flex',
                         flexWrap: 'wrap',
                         justifyContent: 'space-around',
                     }}>
                    {todoLists.map((list: TodoListInterface, index: number) =>
                        <Draggable draggableId={list.id} index={index} key={list.id}>
                            {(provided: DraggableProvided) => (
                                <Box ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                     sx={{backgroundColor: '#d0eaf9', margin: '20px'}}>
                                    <TodoList todos={list.todos} listId={list.id} name={list.name} key={list.id}/>
                                </Box>
                            )}
                        </Draggable>
                    )}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>

    </DragDropContext>
}

export default App;

