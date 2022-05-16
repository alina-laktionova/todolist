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
import {Box, Grid, IconButton, Input, Typography} from "@mui/material";
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
        dispatch(renameListAction(id, name))
        setEditName(false)
    }

    function removeList(id: string) {
        dispatch(removeListAction(id))
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setListName(event.currentTarget.value)
    }

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
                sm: '45vw',
                md: '30vw',
                lg: '22.5vw'
            },
            minWidth: '315px',
            padding: '7px',
            borderRadius: '5px',
            backgroundColor: '#d0eaf9',
            margin: {
                xs: '5px 0',
                sm: '0 5px',
            },
        }}>
        <Grid container
              spacing={0.3}
              alignItems={"center"}
              justifyContent="space-between"
              paddingY={1}
              flexWrap={'nowrap'}
              maxWidth={'100%'}>
                <Grid item width={'fit-content'} flexWrap={"nowrap"}>
                    <Typography variant={'subtitle2'} flexWrap={"nowrap"}
                                textAlign={'left'}>
                        ({todos.length} {todos.length === 1 ? 'task' : 'tasks'})
                    </Typography>
                </Grid>
            {editName ?
                <Grid item maxWidth={'54%'}>
                    <Input defaultValue={listName}
                           sx={{
                               input: {textAlign: "center"},
                               fontSize: '1.25rem',
                               '@media (max-width:450px)': {
                                   fontSize: '1.1rem',
                               },
                               width: 'fit-content',
                           }}
                           onChange={handleChangeInput}/>
                </Grid> :
                <Grid item maxWidth={'54%'}>
                    <Typography variant={'h6'}
                                fontWeight={'400'}
                                textAlign={'center'}
                                overflow={'hidden'}>
                        {listName}
                    </Typography>
                </Grid>
            }
            <Grid item>
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
            </Grid>
        </Grid>

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

