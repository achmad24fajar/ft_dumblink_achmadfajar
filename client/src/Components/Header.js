import React, { useState, useEffect } from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../Config/api'
import { UserContext } from '../Context/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// Import Components
import ModalLogin from '../Components/ModalLogin'
import ModalRegister from '../Components/ModalRegister'

function Header(props) {

	const [userName, setUserName] = useState({
		fullname: '', active: false
	})

	// Hooks
    useEffect(() => {
	    API.get('/user')
	    .then(response => {
	    	let user = response.data.data.user
	    	setUserName({ fullname: user.fullname, active: true })
	    })
	    .catch(error => {
	        console.log(error);
	    });
	}, [])

	return (
		<div className="dumblink-navbar">
			<Navbar bg="white" expand="lg" className="position-fixed shadow-sm">
			<div className="container">
			  <Navbar.Brand href="#home">
			  	<img src="http://localhost:5000/uploads/image/logo.png" alt="dumbLink"/>
			  </Navbar.Brand>
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto ml-5 mt-1">
			    	<h5 className="text-dark">{props.title}</h5>
			    </Nav>
			    <div className="btn-authentication d-flex">
			    {!localStorage.getItem('token') &&
			    	<div className="d-flex">
				      <ModalLogin />
				      <ModalRegister Style="header" />
				    </div>
			    }
			    </div>
			  </Navbar.Collapse>
			</div>
			</Navbar>
		</div>
	);
}

export default Header