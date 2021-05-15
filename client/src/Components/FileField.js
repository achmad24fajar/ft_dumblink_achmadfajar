import React, { useState, useEffect } from 'react'
import { ErrorMessage, useField } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const FileField = ({label, marginBottom, id,...props}) => {
	const [ field, meta, helpers ] = useField(props)
	const { setValue } = helpers;
	const { value } = meta;
	const [ error, setError ] = useState('');

	const getImage = (event) => {
		if(event.target.files){
			let dataImage = event.target.files[0] || event.dataTransfer.files[0]
			if( dataImage.type == "image/jpg" || 
				dataImage.type == "image/jpeg" || 
				dataImage.type == "image/gif" ||
				dataImage.type == "image/png"){
				convertImage(dataImage)
			}else{
				setError('error')
			}
		}
	}

	const convertImage = (image) => {
		if(image){
			let file_reader = new FileReader();
			let file = image
			file_reader.onload = () => {
		        setValue({
					object: image,
					base64: file_reader.result
				})
		    };
		    file_reader.readAsDataURL(file);
		}
	}

	const emptyImage = () => {
		if(typeof value == 'object'){
			setValue({object: null, base64: ""})
		}else
		if(typeof value == 'string'){
			setValue('')
		}
	}

	const classCondition = () => {
		if(typeof value == 'string'){
			if(value){
				return 'upload-toggle'
			}else{
				return ''
			}
		}else
		if(typeof value == 'object'){
			if(value.base64){
				return 'upload-toggle'
			}else{
				return ''
			}
		}
	}

	const showImage = () => {
		if(typeof value == 'object'){
			if(value?.base64){
				return value?.base64
			}
		} else
		if(typeof value == 'string'){
			return process.env.REACT_APP_IMAGE_POST+value
		} else {
			return ''
		}
	}

	const Conditions = () => {
		let newValue;
		if(typeof value == 'object'){
			newValue = value?.base64
		}else
		if(typeof value == 'string'){
			newValue = value
		}
		if (value?.base64 || newValue ) {
			return <div 
				className={`text-muted ${classCondition()}`} 
				onClick={() => emptyImage()}>
				<FontAwesomeIcon 
                icon={faTimes}
                role="button" />
			</div>
		} else if (error) {
			return <div>
				<div className="text-muted upload-toggle" onClick={() => setError('')}>
					<FontAwesomeIcon 
	                icon={faTimes}
	                role="button" />
				</div>
				<label>
					<FontAwesomeIcon 
	                icon={faExclamationCircle} 
	                className="text-white"
	                role="button" />
				</label>
			</div>
		} else {
			return <label htmlFor={id}>
				<FontAwesomeIcon 
                icon={faPlus} 
                className="text-muted"
                role="button" />
			</label>
		}
	}
	
	return (
		<div className={marginBottom}>
		{label && (
			<label htmlFor={label}>{label}</label>
		)}
			<div 
			className={`image-preview text-center ${meta.touched && meta.error && 'border-danger'}`} 
			style={{background: !error ? 
				`url(${showImage()}) no-repeat center/cover` : 'red'
			}}>
			{ Conditions() }
			</div>
			<input
				className={`d-none`}
				{...props}
				onChange={getImage}
				type="file"
				id={id}
			/>
			<ErrorMessage component="div" name={field.name} className="error" />
		</div>
	)
}

export default FileField;