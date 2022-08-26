import React from "react";
import {TextField,MenuItem} from "@mui/material";
import { useField,useFormikContext } from "formik";
const SelectWrapper = (
    {name ,
    options,
    ...otherProps
    }) => {
    
    const handleChange = e =>{
        const {value} = e.target;
        setFieldValue(name,value);

    };
    
    const {setFieldValue} = useFormikContext();
    
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
                {Object.keys(options).map((item,key)=>{
                return <MenuItem key={key} value={item}>{options[item]}</MenuItem>
                })} 
                </TextField>
            </>
    )
}
export default SelectWrapper;