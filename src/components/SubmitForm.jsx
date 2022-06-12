import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AllForms from './AllForms';
import FormFill from './FormFill';

function SubmitForm() {
    const [formData, setFormData] = useState({});
    const [totalForms, setTotalForms] = useState([]);
    const [showFormView, setShowFormView] = useState(false);

    const handleShowFormView = () => {
        setShowFormView(false);
    }

    const getFormData = async () => {
        const data = await axios.get('http://localhost:8000/all-forms');
        setTotalForms(data.data)
    }

    useEffect(() => {
        getFormData()
    }, [])

    return (
        <div style={{width: "800px", margin: "auto", textAlign: "center"}}>
            <h1>User Portal</h1>
            <p>Please submit the forms</p>
            <AllForms totalForms={totalForms} setFormData={setFormData} setShowFormView={setShowFormView} />
            <FormFill open={showFormView} handleClose={handleShowFormView} formData={formData} />
        </div>
    )
}

export default SubmitForm