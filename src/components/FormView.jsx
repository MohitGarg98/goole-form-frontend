import React from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormView({ open, handleClose, formData }) {
    return (
        <div>
            {formData && <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Form Data</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Form Heading"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.formHeading}
                        disabled
                    />
                </ DialogContent>
                {
                    formData.questions?.map((data, index) => {
                        return <DialogContent key={index}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Question"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={data.queValue}
                                disabled
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Question type"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={data.typeValue}
                                disabled

                            />
                        </ DialogContent>
                    })
                }
            </Dialog>
            }
        </div>
    )
}
