import {Box, Button, OutlinedInput, useMediaQuery} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import {addListAction} from "../store/actions";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";


export default function ListInput() {
    const dispatch = useDispatch<Dispatch>()
    const [listName, setListName] = useState<string>('')
    const smScreen = useMediaQuery('(max-width:699.9px)');

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: smScreen ? 'center' : 'inherit'
    }}>
        <Box sx={smScreen ? {position: 'static'} : {
            position: 'sticky',
            left: '50%',
            transform: 'translateX(-50%)',
        }}>
            <Box sx={{
                display: 'inline-block',
                margin: smScreen ? '10px 0 5px' : '15px 0'
            }}>
                <OutlinedInput
                    sx={{
                        marginRight: '5px',
                        maxWidth: '350px',
                        width: '70vw',
                        height: '56px',
                        backgroundColor: 'white'
                    }}
                    value={listName}
                    onChange={handleChangeInput}
                    onKeyDown={handleKeyPress}
                    placeholder={'name of the list'}/>
                <Button variant={"contained"}
                        onClick={() => addNewList(listName)}
                        sx={{
                            verticalAlign: 'top',
                            padding: '5px',
                            boxShadow: 'none',
                            width: smScreen ? '60px' : '135px',
                            minWidth: '60px',
                            height: '56px',
                        }}>
                    {smScreen ? <AddIcon/> : 'Add new list'}
                </Button>
            </Box>
        </Box>
    </Box>
}