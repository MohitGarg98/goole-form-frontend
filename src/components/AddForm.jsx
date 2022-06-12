import React, { useState } from 'react';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function Form({ open, handleClose, setTotalForms }) {
    const allQueType = [
        { title: "Textbox", value: "textbox" },
        { title: "Radio", value: "radio" },
        { title: "Checkbox", value: "checkbox" },
        { title: "Dropdown", value: "dropdown" }
    ]

    const [allFields, setAllFields] = useState([{ queValue: '', typeValue: '', queTypeValue: '' }]);
    const [formHeading, setFormHeading] = useState("")

    const handleChange = (e, index) => {
        e.preventDefault();
        setAllFields(prev => {
            const newArr = prev.slice();
            newArr[index].queValue = e.target.value;
            return newArr;
        });
    }

    const handleTypeChange = (e, index) => {
        e.preventDefault();
        setAllFields(prev => {
            const newArr = prev.slice();
            newArr[index].typeValue = e.target.value;
            return newArr;
        });
    };

    const handleTypesValue = (e, index) => {
        e.preventDefault();
        setAllFields(prev => {
            const newArr = prev.slice();
            newArr[index].queTypeValue = e.target.value;
            return newArr;
        });
    };

    const addField = () => {
        setAllFields(prev => {
            return [
                ...prev,
                {
                    queValue: "",
                    typeValue: ""
                }
            ];
        });
    }

    const addForm = () => {
        const data = {
            formHeading,
            questions: allFields
        }
        axios.post('http://localhost:8000/all-forms', data);
        setTotalForms(prev => {
            return [...prev, data]
        })
        handleClose();
        setAllFields([{ queValue: '', typeValue: '' }]);
        setFormHeading("");
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Form</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="formHeading"
                        label="Enter Form Heading"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => { setFormHeading(e.target.value) }}
                        value={formHeading}
                    />
                    {/* </DialogContent> */}
                    {allFields.map((data, index) => {
                        return <div key={index}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id={`que${index}`}
                                label="Enter Question"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={e => { handleChange(e, index) }}
                                value={data.queValue}
                            />
                            <FormControl variant="filled" sx={{minWidth: "220px", width: "100%"}}>
                                <InputLabel id="demo-simple-select-filled-label">Question Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id={`que${index}`}
                                    value={data.typeValue}
                                    onChange={e => { handleTypeChange(e, index) }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {allQueType.map((data, index) => {
                                        return <MenuItem key={index} value={data.value}>{data.title}</MenuItem>
                                    })}
                                </Select>
                                {data.typeValue && data.typeValue !== "textbox" &&
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id={`type${index}`}
                                        label="Enter values (comma separated)"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={e => { handleTypesValue(e, index) }}
                                        value={data.queTypeValue}
                                    />
                                }
                            </FormControl>
                        </ div>
                    })}
                </DialogContent>
                <Button variant="contained" onClick={addField} style={{ width: "120px", margin: "10px" }} >Add Field</Button>
                <Button variant="contained" onClick={addForm}>Add Form</Button>
            </Dialog>
        </div>
    )
}

export default Form