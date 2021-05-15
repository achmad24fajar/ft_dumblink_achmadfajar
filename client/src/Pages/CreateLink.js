import React, { useState, useEffect, useContext } from 'react'
import { MessageContext } from '../Context/messageContext'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLink, faTimes, faUpload, faFileImage, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { API } from '../Config/api'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import ReactDOM from 'react-dom';
import { Formik, Form, FieldArray, Field } from 'formik'
import * as Yup from 'yup'

import VerticalNav from '../Components/VerticalNav'
import Header from '../Components/Header'
import MobileNav from '../Components/MobileNav'
import TextField from '../Components/TextField'
import TextArea from '../Components/TextArea'
import FileField from '../Components/FileField'
import MobilePreview from '../Components/MobilePreview'

const initialValues = {
	title: '',
	description: '',
	image: {
		object: null,
		base64: ''
	},
	links:[
		{
			titleLink: '',
			urlLink: '',
			imageLink: {
				object: null,
				base64: ''
			},
		},
	],
}

export default function CreateLink() {
	const router = useHistory();
	const {theme} = useParams();

	const [data, setData] = useState({
		title: '',
		description: '',
		image: {
			object: null,
			base64: ''
		},
		links:[
			{
				titleLink: '',
				urlLink: '',
				imageLink: {
					object: null,
					base64: ''
				},
			},
		],
	});
	const { title, description, image, links } = data;
	const { object, base64 } = image

	const validate = Yup.object().shape({
		image: Yup.mixed()
        	.required("A image is required"),
		title: Yup.string()
			.required('Title is required'),
		description: Yup.string()
			.required('Description is required'),

		links: Yup.array()
			.of(Yup.object().shape({
				imageLink: Yup.mixed()
		        .required("A file is required"),
				titleLink: Yup.string()
					.required('Title link is required'),
				urlLink: Yup.string()
					.required('URL is required')
			}))
	});

	const [state, dispatch] = useContext(MessageContext);
	const saveLink = useMutation(async () => {

		const formData = new FormData();

		const dataLinks = links?.map((data, index) => {
			return {
				titleLink: data.titleLink,
				urlLink: data.urlLink,
				imageLink: data.imageLink.object
			}
		})

		const link = {
			title,
			description,
			object,
			theme,
			dataLinks
		}

		formData.append('image', link.object)
		dataLinks.forEach(data => {
			formData.append('imageLink', data.imageLink)
		})

		formData.append('link', JSON.stringify(link))

		const config = {
		    headers: {
		      	"Content-Type": "aplication/json",
		    },
	    };

	    const response = await API.post("/link", formData, config);

	    dispatch({
	    	type: 'MESSAGE',
	    	payload: response.data
	    })

    });

	const save = () => {
		saveLink.mutate()
		router.push('/links')
	}

	return (
		<div>
			<Header title="Create Link" />
			<VerticalNav />
			<div className="content clearfix">
				<Row>
					<Col md={9}>
					<div className="content-input">
						<h1 className="mb-4">Create New Link</h1>
						    <Formik
						      initialValues={initialValues}
						      validationSchema={validate}
						      onSubmit={() => save()}
						    >
						    {({ values }) => (
						    <Form>
						    	{setData(values)}
					        	<FileField label="Photo Profile" name="image" marginBottom="mb-3" id="image" />
					        	<TextField label="Title" name="title" placeholder="Title" type="text" marginBottom="mb-3" />
					        	<TextArea name="description" label="Description" marginBottom="mb-3" />
						        <FieldArray name="links">
						        {({ insert, remove, push }) => (
						        <div className="mt-5">
						            {values.links.length > 0 &&
						            values.links.map((link, index) => (
					                <div className="d-flex mb-3" key={index}>
					                    <div>
					                        <FileField
					                          name={`links.${index}.imageLink`}
					                          marginBottom="mb-1"
					                          id={`image-link-${index}`}
					                        />
					                    </div>
					                    <div className="flex-fill mx-3">
					                        <TextField
					                          name={`links.${index}.titleLink`}
					                          placeholder="Title Link"
					                          type="text"
					                          marginBottom="mb-4"
					                        />
					                        <TextField
					                          name={`links.${index}.urlLink`}
					                          placeholder="www.example.com"
					                          type="text"
					                          marginBottom="mb-1"
					                        />
					                    </div>
					                    <div>
					                        <FontAwesomeIcon 
					                        icon={faTimes} 
					                        className="text-dark mt-2" 
					                        onClick={() => remove(index)}
					                        role="button" />
					                    </div>
					                </div>
					                ))}
					                <div className="text-right mt-3">
						                <button
						                  type="button"
						                  className="btn btn-orange btn-fixed"
						                  onClick={() => push({titleLink: '', urlLink: '', imageLink: null })}
						                >
						                  Add Link
						                </button>	
					                </div>
						        </div>
						        )}
						        </FieldArray>
						        <div className="bottom-fix">
						        	<button className="btn btn-orange" type="submit">Save</button>	
						        </div>
							</Form>
							    )}
						</Formik>
					</div>
					</Col>
					<Col md={3}>
					<div className="position-relative">
						<div className="position-fixed" style={{right: "20px", width: "250px"}}>
							<div className="mb-4 text-center border-bottom border-dark">
								<h5>Preview</h5>
							</div>
							<MobilePreview theme={theme} data={data} />
						</div>
					</div>
					</Col>
				</Row>
			</div>
			<MobileNav />
		</div>
	)
}