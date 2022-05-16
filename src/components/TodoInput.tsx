import React, {useState} from "react";
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch} from "react-redux";
import {addTodoAction} from "../store/actions";
import {Dispatch} from "redux";


type Props = {
    listId: string
}

export default function TodoInput(props: Props) {
    const {listId} = props
    const dispatch = useDispatch<Dispatch>()
    const [todoText, setTodoText] = useState<string>('')

    function addNewTodo() {
        if (todoText) {
            dispatch(addTodoAction(listId, todoText))
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

    return <OutlinedInput
        value={todoText}
        onChange={handleChangeInput}
        onKeyDown={handleKeyPress}
        placeholder={'add new task'}
        endAdornment={
            <InputAdornment position="end">
                <IconButton onClick={addNewTodo}>
                    <AddIcon/>
                </IconButton>
            </InputAdornment>
        }
    />
}