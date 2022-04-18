import React, {useState} from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch} from "react-redux";
import {addTodoAction} from "../store/actions";

export default function ToDoInput() {
    const dispatch = useDispatch()
    const [todoText, setTodoText] = useState<string>('')

    function addNewTodo() {
        if (todoText) {
            dispatch(addTodoAction(todoText))
        }
        setTodoText('')
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setTodoText(event.currentTarget.value)
    }

    function handleKeyPress(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            addNewTodo()
        }
    }

    return (<FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment">add new task</InputLabel>
            <OutlinedInput
                value={todoText}
                onChange={handleChangeInput}
                onKeyDown={handleKeyPress}
                id="outlined-adornment"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={addNewTodo}>
                            <AddIcon/>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}