import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import AllForms from './AllForms';
import FormView from './FormView';
import AddForm from './AddForm';

function AdminPage() {
    const [totalForms, setTotalForms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [showFormView, setShowFormView] = useState(false);

    const handleClose = () => {
        setShowForm(false);
    }

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
            <h1>Admin Portal</h1>
            <Button variant="contained" onClick={() => { setShowForm(true) }}>Add Form</Button>
            <AddForm open={showForm} handleClose={handleClose} setTotalForms={setTotalForms} />
            <AllForms totalForms={totalForms} setFormData={setFormData} setShowFormView={setShowFormView} />
            <FormView open={showFormView} handleClose={handleShowFormView} formData={formData} />
        </div>
    )
}

export default AdminPage