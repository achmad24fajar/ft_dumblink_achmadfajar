import React, {useEffect} from 'react'
import { ErrorMessage, useField } from 'formik'

const TextField = ({label,marginBottom,...props}) => {
	const [field, meta, helpers] = useField(props)
	const {setValue} = helpers
	return (
		<div className={marginBottom}>
			{label && (
				<label htmlFor={label}>{label}</label>
			)}
			<input
				className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
				{...field} {...props}
				autoComplete="off"
			/>
			<ErrorMessage component="div" name={field.name} className="error" />
		</div>
	)
}

export default TextField;