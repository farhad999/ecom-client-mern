import React from "react";
import {Controller} from "react-hook-form";
import {Form} from "react-bootstrap";

const ControllerInput = ({control, name, label, errors, placeholder}) => {
    return(
        <Controller render={({field, fieldState: {error, isDirty}})=> (

            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={'text'}
                              {...field}
                              isInvalid={!!error}
                              placeholder={placeholder}
                />
                <Form.Control.Feedback type={'invalid'}>
                    <p>{errors[name]?.message}</p>
                </Form.Control.Feedback>
            </Form.Group>

        )} name={name} control={control} />
    )
}
export default ControllerInput;
