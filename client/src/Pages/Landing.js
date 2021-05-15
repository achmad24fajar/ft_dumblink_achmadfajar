import React from 'react'
import { Row, Col } from 'react-bootstrap'

import ModalRegister from '../Components/ModalRegister'
import Header from '../Components/Header'

export default function Landing() {
	return (
		<div>
		<Header />
			<div className="dumblink-landing bg-orange" style={{backgroundImage: "url(http://localhost:5000/uploads/image/Bg.svg)"}}>
				<div className="container">
					<div style={{marginTop: "100px"}}>
						<Row>
							<Col md={6}>
								<h1 className="text-white tag-line">The Only Link<br/>You'll Ever Need</h1>

								<p className="text-white description">
									Add a link for your Social Bio and optimize your social media traffic. 
									<br/><br/>safe, fast and easy to use
								</p>

								<ModalRegister Style="landing" />
								
							</Col>
							<Col md={6} className="text-right d-none d-md-block">
								<img className="landing-image" src="http://localhost:5000/uploads/image/PC.png" alt=""/>
								<img className="landing-image-phone" src="http://localhost:5000/uploads/image/Phone0.png" alt=""/>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>
	)
}