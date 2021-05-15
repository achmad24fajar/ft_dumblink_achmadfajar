import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import VerticalNav from '../Components/VerticalNav'
import Header from '../Components/Header'
import MobileNav from '../Components/MobileNav'

export default function Template() {
	return (
		<div>
			<Header title="Template" />
			<VerticalNav />
			<div className="margin-default clearfix">
				<div className="mb-3 ml-2">
					<h5 className="text-dark pl-3 py-2 border-left border-warning">My Templates</h5>
				</div>
				<Row className="mt-4">
					<Col md={3} sm={6} xs={6} className="text-center">
					    <div className="dumblink-template" 
					    style={{ backgroundImage: "url(http://localhost:5000/uploads/image/phone0.png)" }}>
				    		<Link as={Link} to="/template/create/link/theme/white">
					    		<button type="button" className="btn btn-outline-light btn-template">Select</button>
				    		</Link>
						</div>
					</Col>
					<Col md={3} sm={6} xs={6} className="text-center">
						<div className="dumblink-template" 
					    style={{ backgroundImage: "url(http://localhost:5000/uploads/image/phone1.png)" }}>
				    		<Link as={Link} to="/template/create/link/theme/blue-sky">
					    		<button type="button" className="btn btn-outline-light btn-template">Select</button>
				    		</Link>
						</div>
					</Col>
					<Col md={3} sm={6} xs={6} className="text-center">
						<div className="dumblink-template" 
					    style={{ backgroundImage: "url(http://localhost:5000/uploads/image/phone2.png)" }}>
				    		<Link as={Link} to="/template/create/link/theme/sunset">
					    		<button type="button" className="btn btn-outline-light btn-template">Select</button>
				    		</Link>
						</div>
					</Col>
					<Col md={3} sm={6} xs={6} className="text-center">
						<div className="dumblink-template" 
					    style={{ backgroundImage: "url(http://localhost:5000/uploads/image/phone3.png)" }}>
				    		<Link as={Link} to="/template/create/link/theme/modern">
					    		<button type="button" className="btn btn-outline-light btn-template">Select</button>
				    		</Link>
						</div>
					</Col>
				</Row>
			</div>
			<MobileNav />
		</div>
	)
}