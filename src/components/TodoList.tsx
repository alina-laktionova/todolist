import TodoItemInterface from "../models/TodoItemInterface";
import TodoItem from "./TodoItem";
import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {useDispatch} from "react-redux";
import {
    Draggable,
    DraggableProvided,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot
} from "react-beautiful-dnd";
import {Box, IconButton, Input, Typography} from "@mui/material";
import TodoInput from "./TodoInput";
import {removeListAction, renameListAction} from "../store/actions";
import {ITEM} from "../config/constants";

type Props = {
    listId: string
    name: string
    todos: TodoItemInterface[]
}

export default React.memo(function TodoList(props: Props) {
    const dispatch = useDispatch()

    const {todos, listId, name} = props
    const [listName, setListName] = useState<string>(name)
    const [editName, setEditName] = useState<boolean>(false)

    function changeName(id: string, name: string) {
        if(name !== listName) dispatch(renameListAction(id, name))
        setEditName(false)
    }

    function removeList(id: string) {
        dispatch(removeListAction(id))
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setListName(event.currentTarget.value)
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '450px',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: '#d0eaf9',
        margin: '5px'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px'
        }}>
            <Typography variant={'subtitle1'}
                        textAlign={'left'}
                        marginY={'20px'}
                        width={'80px'}>
                ({todos.length} {todos.length === 1 ? 'task' : 'tasks'})
            </Typography>
            {editName ?
                <Input defaultValue={listName}
                       sx={{
                           fontSize: '24px',
                           marginY: '10px',
                           width: '60%',
                           textAlign: 'center',
                       }}
                       onChange={handleChangeInput}/> :
                <Typography variant={'h5'}
                            textAlign={'center'}
                            marginY={'20px'}
                            overflow={'hidden'}
                            width={'310px'}>
                    {listName}
                </Typography>
            }
            <Box display={"flex"}>
                {editName ?
                    <IconButton onClick={() => changeName(listId, listName)}>
                        <DoneOutlineIcon/>
                    </IconButton> :
                    <IconButton onClick={() => setEditName(true)}>
                        <EditIcon/>
                    </IconButton>
                }
                <IconButton onClick={() => removeList(listId)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>

        <TodoInput listId={listId}/>
        <Droppable droppableId={listId} key={listId}
                   direction="vertical" type={ITEM}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <Box ref={provided.innerRef}
                     {...provided.droppableProps}
                     sx={{
                         marginY: '20px',
                         background: snapshot.isDraggingOver
                             ? "#97d1f0"
                             : "#c0e4f7",
                     }}>
                    {todos.map((todo: TodoItemInterface, index: number) => (
                        <Draggable draggableId={todo.id} key={todo.id} index={index}>
                            {(provided: DraggableProvided) => (
                                <Box ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}>
                                    <TodoItem todo={todo} key={todo.id} listId={listId}/>
                                </Box>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>

    </Box>
})

