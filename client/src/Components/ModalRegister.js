import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Register from '../Authentication/Register'
import ModalLogin from './ModalLogin'

const ModalRegister = ({Style}) => {
	const [show, setShow] = useState(false);
	const [component, setComponent] = useState(false);

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
  	const handleModal = () => {
  		setComponent(true)
  	}
	return (
		<div>
			{Style == 'landing' ? (
				<button className="btn d-inline btn-dark mt-3" onClick={handleShow}>
					Get Started
				</button>
			) : (
				<button className="btn btn-sm d-inline font-weight-bold btn-orange" onClick={handleShow}>
					Register
				</button>
			)}

			<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			size="sm"
			centered
			>
				<Modal.Body>
					<div className="d-flex mb-3 justify-content-between">
						<div>
							<h4>Sign Up</h4>
						</div>
						<div className="mt-1">
							<FontAwesomeIcon icon={faTimes} onClick={handleClose} role="button" />
						</div>
					</div>
					<Register />
					<div>
						<span>You have already account? 
							<span className="font-weight-bold" 
							onClick={handleModal}>Sign in here</span>
							{component && (
								<span><ModalLogin showModal={true} /></span>
							)}
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ModalRegister