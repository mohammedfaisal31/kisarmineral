import React from "react";
import {TextField,MenuItem} from "@mui/material";
import { useField,useFormikContext } from "formik";
import { useState } from "react";
import { Field } from "formik";
const SelectWrapperWithTextField = (
    {name ,
    options,
    requiredTextField,
    ...otherProps
    }) => {
    
    const handleChange = e =>{
        const {value} = e.target;
        if((value === "Yes") || (value ===  "UPI/GPay/PhonePe/Paytm" || value ===  "IMojo" || value ===  "Netbanking" )) setGenerateTextField(true);
        else setGenerateTextField(false);
        setFieldValue(name,value || "");

    };
    
    const {setFieldValue} = useFormikContext();
    
    const[generateTextField,setGenerateTextField] = useState(false);
    const [field] = useField(name);
    const configSelect = {
        ...field,
        ...otherProps,
        select:true,
        variant:"outlined",
        onChange: handleChange
    };
    
    return (<>
                <TextField {...configSelect}>
                {Object.keys(options).map((item,pos)=>{
                return <MenuItem key={pos} value={item}>{options[item]}</MenuItem>
                })} 
                </TextField>
                {  
                   (requiredTextField && generateTextField) ?  
                    <Field
                    as={TextField} 
                    id= { requiredTextField[0] }
                    name = { requiredTextField[0] }
                    label={ requiredTextField[1] }
                    placeholder={ requiredTextField[2] }
                    variant="outlined"
                    style={{ width: "47%",marginTop:"15px" ,display:(requiredTextField && generateTextField ? "block" : "none")}}
                    />
                    : <></>
                }
            </>
    )
}
export default SelectWrapperWithTextField;