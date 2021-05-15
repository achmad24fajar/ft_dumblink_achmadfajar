import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Login from '../Authentication/Login'

const ModalLogin = ({showModal}) => {
	const [show, setShow] = useState(showModal ? true : false);

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	return (
		<div>
			{!showModal && (
				<span className="d-inline text-dark font-weight-bold bg-transparent mr-3 mt-1" role="button" onClick={handleShow}>
					Login
				</span>
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
							<h4>Sign In</h4>
						</div>
						<div className="mt-1">
							<FontAwesomeIcon icon={faTimes} onClick={handleClose} role="button" />
						</div>
					</div>
					<Login />
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ModalLogin