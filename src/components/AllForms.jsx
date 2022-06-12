import React, { useState } from 'react'

function AllForms({ totalForms, setFormData, setShowFormView }) {

    const handleFormViewData = (data) => {
        setShowFormView(true);
        setFormData(data);
    }

    return (
        <>
            <div style={{ border: "1px solid", margin: "auto", width: "500px" }}>
                <h3>All Forms Name</h3>
                {
                    !totalForms.length && <h5>No Data...</h5>
                }
                {
                    totalForms.map((data, index) => {
                        return <div key={index} style={{ paddingBottom: "20px" }}>
                            {index + 1}. <h4 style={{ display: "inline", marginRight: "8px" }}>{data.formHeading}</h4>
                            <span onClick={() => { handleFormViewData(data) }} style={{ color: "blue", cursor: "pointer" }}>View Form</span>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default AllForms