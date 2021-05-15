import React, { useState, useEffect, useContext } from 'react'
import { MessageContext } from '../Context/messageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap'
import { API } from '../Config/api'
import { useQuery, useMutation } from 'react-query'

export default function Delete(props) {
	const [show, setShow] = useState(false);
	const [state, dispatch] = useContext(MessageContext);

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

  	const { data: links, loading, error, refetch } = useQuery('links', async () => {
	    const response = await API.get("/links");
	    return response;
	})

  	const deleteLink = useMutation(async (id) => {
	    const response = await API.delete(`/link/${id}`);
	    refetch()
	    dispatch({
	    	type: 'MESSAGE',
	    	payload: response.data
	    })
	});

	const handleDeleteLink = async (e, id) => {
		e.preventDefault()
	    deleteLink.mutate(id);
	    handleClose()
	};

	const deleteLinks = useMutation(async (id) => {
	    await API.delete(`/links/${id}`);
	    refetch()
	});

	const handleDeleteLinks = async (e, id) => {
		e.preventDefault()
		console.log('from deleteLinks')
	    deleteLinks.mutate(id);
	    handleClose()
	};

	return (
		<div>
		{props.deleteLink ? (
			<div className="rounded shadow-sm" role="button" onClick={handleShow}>
				<FontAwesomeIcon icon={faTrash} className="text-orange"  />
			</div>
		) : (
			<span role="button" 
			className="float-right bg-orange text-center rounded-circle position-absolute btn-close-link">
				<FontAwesomeIcon icon={faTimes} className="text-dark" onClick={handleShow} />
			</span>
		)}

		    <Modal
		        show={show}
		        onHide={handleClose}
		        backdrop="static"
		        keyboard={false}
		        centered
		    >
		    <Modal.Header>
			    <h6 className="m-0"><FontAwesomeIcon icon={faInfoCircle} className="mr-2"  />Confirmation</h6>
			 </Modal.Header>
		        <Modal.Body>
			        <div className="text-center">
			        	<h6 className="mt-4 mb-5">Are you sure for delete this link?</h6>
			        	<div className="d-flex mt-3 justify-content-center">
			        	{props.deleteLink ? (
			        		<button className="btn btn-orange mr-2" onClick={e => handleDeleteLink(e, props.deleteLink)}>Delete</button>
			        	) : (
			        		<button className="btn btn-orange mr-2" onClick={e => handleDeleteLinks(e, props.deleteLinks)}>Delete</button>
			        	)}
			        		<button className="btn btn-dark ml-2" onClick={handleClose}>Cancel</button>
			        	</div>
			        </div>  
		        </Modal.Body>
	        </Modal>
		</div>
	)
}