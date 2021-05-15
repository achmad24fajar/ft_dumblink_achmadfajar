import React from 'react'
import { ErrorMessage, useField } from 'formik'

const TextArea = ({label,marginBottom, ...props}) => {
	const [field, meta] = useField(props)
	return (
		<div className={marginBottom}>
			<label htmlFor={props.name}>{label}</label>
			<textarea className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
			{...field} {...props} 
			rows="4"></textarea>
			<ErrorMessage component="div" name={field.name} className="error" />
		</div>
	)
}

export default TextArea