import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, OutlinedInput} from "@mui/material";
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from "react-beautiful-dnd";
import {addListAction, changeTodosOrderAction} from "./store/actions";
import TodoList from "./components/TodoList";
import TodoListInterface from "./models/TodoListInterface";

function App() {
    const todoLists: TodoListInterface[] = useSelector((todoLists: TodoListInterface[]) => todoLists)
    const dispatch = useDispatch()

    const [listName, setListName] = useState<string>('')

    function onDragEnd(result: DropResult) {
        console.log(todoLists)
        console.log(result)
        if (!result.destination) {
            return;
        }
        dispatch(changeTodosOrderAction(result))
    }

    function addNewList(name: string) {
        dispatch(addListAction(name || 'Todo list'))
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
                    sx={{height: '56px',
                        backgroundColor: '#3f698b',
                        '&: hover': {
                            backgroundColor: '#27567c',
                        }
                    }}
            >
                Add new list
            </Button>
        </Box>

        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        }}>
            {todoLists.map((list: TodoListInterface) => (
                <Droppable droppableId={list.id} key={list.id}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <Box ref={provided.innerRef}
                             {...provided.droppableProps}
                             sx={{
                                 margin: '20px',
                                 background: snapshot.isDraggingOver
                                     ? "#97d1f0"
                                     : "#c0e4f7",
                             }}>
                            <TodoList todos={list.todos} listId={list.id} name={list.name} key={list.id}/>
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>

            ))}
        </Box>
    </DragDropContext>
}

export default App;

