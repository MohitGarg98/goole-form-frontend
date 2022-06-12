import React, { useState } from 'react';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function FormFill({ open, handleClose, formData }) {
    const [radioButtonValues, setRadioButtonValues] = useState({});
    const [checkboxValues, setCheckboxValues] = useState({});

    const handleSubmit = async (data) => {
        data.preventDefault();
        const formData = {};
        for (var i = 0; i < data.target.length; i++) {
            formData[data.target[i].name] = data.target[i].value
        }
        delete formData[""];
        const fData = { ...formData, ...radioButtonValues, ...checkboxValues};
        const bodyData = {
            formHeading: formData.formHeading,
            formData: fData
        }
        handleClose();
        await axios.post('http://localhost:8000/save-form-data', bodyData);
    }

    const onRadioChange = (e) => {
        setRadioButtonValues(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const onCheckboxChanged = (e) => {
        const { value, checked, name } = e.target;
        if (checked) {
            setCheckboxValues(prev => {
                return {
                    ...prev,
                    [name]: [...prev[name] ?? "", value]
                }
            });
        }
        else {
            setCheckboxValues(prev => {
                return {
                    ...prev,
                    [name]: prev[name].filter((e) => e !== value),
                }
            });
        }
    }

    return (
        <div>
            {formData && <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <h3>{formData.formHeading}</h3>
                </DialogContent>
                <form onSubmit={handleSubmit}>
                    {formData.questions?.map((data, index) => {
                        let dropdownData;
                        if (data.typeValue !== "textbox") {
                            dropdownData = data.queTypeValue.split(",");
                        }
                        return data.typeValue === "dropdown" ?
                            <div key={index} style={{ margin: "20px", padding: "10px" }}>
                                <label>
                                    {data.queValue}:
                                    <select name={`que${index}`}>
                                        {
                                            dropdownData.map((d, i) => {
                                                return <option key={i} value={d}>{d}</option>
                                            })
                                        }
                                    </select>
                                </label>
                            </div> :
                            data.typeValue === "radio" ?
                                <div key={index} style={{ margin: "20px", padding: "10px" }}>
                                    {data.queValue}:
                                    {
                                        dropdownData.map((d, i) => {
                                            return <label key={i}>
                                                <input type="radio" value={d} name={`que${index}`} onChange={onRadioChange} /> {d}
                                            </label>
                                        })
                                    }
                                </div> :
                                data.typeValue === "checkbox" ?
                                    <div key={index} style={{ margin: "20px", padding: "10px" }}>
                                        {data.queValue}:
                                        {
                                            dropdownData.map((d, i) => {
                                                return <label key={i}>
                                                    <input type="checkbox" value={d} name={`que${index}`} onChange={onCheckboxChanged} /> {d}
                                                </label>
                                            })
                                        }
                                    </div> :
                                    <div key={index} style={{ margin: "20px", padding: "10px" }}>
                                        <label>
                                            {data.queValue}:
                                            <input type="text" name={`que${index}`} />
                                        </label>
                                    </div>
                    })
                    }
                    <div style={{ width: "100px", margin: "auto", padding: "0 0 25px 0" }}>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </Dialog>
            }
        </div >
    )
}

export default FormFill