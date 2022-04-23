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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TodoItemInterface from "../models/TodoItemInterface";
import {changeTodoAction, changeTodoStatusAction, removeTodoAction} from "../store/actions";
import {useDispatch} from "react-redux";

type Props = {
    todo: TodoItemInterface
    listId: string
}

export default React.memo(function TodoItem(props: Props) {
    const {todo, listId} = props
    const [editTodo, setEditTodo] = useState<boolean>(false)
    const [newText, setNewText] = useState<string>(todo.text)

    const dispatch = useDispatch()

    function removeTodo(id: string) {
        dispatch(removeTodoAction(listId, id))
    }

    function changeStatus(id: string, status: boolean) {
        dispatch(changeTodoStatusAction(listId, id, status))
    }

    function changeText(id: string, text: string) {
        if (text !== todo.text) dispatch(changeTodoAction(listId, id, text))
        setEditTodo(false)
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNewText(event.currentTarget.value)
    }

    return <List>
        <ListItem key={todo.id}
                  disablePadding
                  secondaryAction={
                      <Box display={"flex"}>
                          {editTodo ?
                              <IconButton onClick={() => changeText(todo.id, newText)}>
                                  <DoneOutlineIcon/>
                              </IconButton> :
                              <IconButton onClick={() => setEditTodo(true)}>
                                  <EditOutlinedIcon/>
                              </IconButton>
                          }
                          <IconButton onClick={() => removeTodo(todo.id)}>
                              <DeleteOutlineIcon/>
                          </IconButton>
                      </Box>
                  }>
            <ListItemButton
                sx={{
                    '&.MuiListItemButton-root': {
                        paddingRight: '105px'
                    }
                }}>
                <ListItemIcon sx={{minWidth: '45px'}}>
                    <Checkbox checked={todo.isDone}
                              onChange={() => changeStatus(todo.id, !todo.isDone)}/>
                </ListItemIcon>
                <ListItemText primary={
                    editTodo ?
                        <Input defaultValue={todo.text} fullWidth
                               onChange={handleChangeInput}/> :
                        <Typography overflow={'hidden'}
                                    sx={{textDecoration: todo.isDone ? 'line-through' : 'none'}}>
                            {todo.text}
                        </Typography>
                }/>
            </ListItemButton>
        </ListItem>
    </List>
})