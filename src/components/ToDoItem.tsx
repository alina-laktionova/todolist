import {
    Box,
    Checkbox,
    IconButton, Input,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ToDoInterface from "../models/ToDoInterface";
import {changeTodoAction, changeTodoStatusAction, removeTodoAction} from "../store/actions";
import {useDispatch} from "react-redux";

type Props = {
    todo: ToDoInterface
}

export default function ToDoItem(props: Props) {
    const {todo} = props
    const [editTodo, setEditTodo] = useState<boolean>(false)
    const [newText, setNewText] = useState<string>(todo.text)

    const dispatch = useDispatch()

    function removeTodo(id: string) {
        dispatch(removeTodoAction(id))
    }

    function changeStatus(id: string, status: boolean) {
        dispatch(changeTodoStatusAction(id, status))
    }

    function changeText(id: string, text: string) {
        dispatch(changeTodoAction(id, text))
        setEditTodo(false)
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNewText(event.currentTarget.value)
    }

    return <List>
        <ListItem
            key={todo.id}
            secondaryAction={
                <Box>
                    {editTodo ?
                        <IconButton onClick={() => changeText(todo.id, newText)}>
                            <DoneOutlineIcon/>
                        </IconButton> :
                        <IconButton onClick={() => setEditTodo(true)}>
                            <BorderColorOutlinedIcon/>
                        </IconButton>
                    }
                    <IconButton onClick={() => removeTodo(todo.id)}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Box>
            }
            disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox checked={todo.isDone}
                              onChange={() => changeStatus(todo.id, !todo.isDone)}/>
                </ListItemIcon>
                <ListItemText primary={
                    editTodo ?
                        <Input defaultValue={todo.text}
                               onChange={handleChangeInput}/> :
                        <Typography sx={{textDecoration: todo.isDone ? 'line-through' : 'none'}}>
                            {todo.text}
                        </Typography>
                }/>
            </ListItemButton>
        </ListItem>
    </List>
}