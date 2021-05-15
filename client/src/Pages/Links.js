import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useQuery, useMutation } from 'react-query'
import { API } from '../Config/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faList, faTh } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../Context/messageContext'

import VerticalNav from '../Components/VerticalNav'
import Header from '../Components/Header'
import Delete from '../Components/Delete'
import MobileNav from '../Components/MobileNav'

export default function Links() {
	const [links, setLinks] = useState([])
	const [search, setSearch] = useState('')
	const [filteredLinks, setFilteredLinks] = useState([])
	const [styleGrid, setStyleGrid] = useState(false)

	const [state, dispatch] = useContext(MessageContext);
	const {status, message} = state

	// Hooks
	useEffect(() => {
		setInterval(function(){
			dispatch({
	    		type: 'HIDE_MESSAGE',
		    })
		}, 5000);
	}, [])

    useEffect(() => {
	    API.get('/links')
	    .then(response => {
	    	let link = response.data.data.links
	    	setLinks(link)
	    })
	    .catch(error => {
	        // console.log(error);
	    });

		setFilteredLinks(
			links.filter(link => {
				return link.title.toLowerCase().includes( search.toString().toLowerCase() )
			})
		)
	}, [search, links])

	// Input Function
	const onChange = (e) => {
		e.preventDefault()
		setSearch(
		    e.target.value,
		);
	}; 

	return (
		<div>
			<Header title="Links" />
			<VerticalNav />
			<div style={{margin: "100px 100px 0 300px"}} className="clearfix">
				<div className="position-relative">
					<Row className="mb-3 border-bottom border-warning">
						<Col md={2} sm={3} xs={3} className="pr-0 mt-1">
							<div className="mt-1 text-center">
								<h5 className="mobile-font-size">All Links <span className="badge badge-dark">{links.length}</span></h5>
							</div>
						</Col>
						<Col md={9} sm={7} xs={7}>
							<div className="form-group">
								<input type="text" placeholder="Search" className="form-control" 
								name="search" onChange={e => onChange(e)} />
							</div>
						</Col>
						<Col md={1} sm={2} xs={2} className="pl-0">
							<div className="d-flex icon-style">
								<FontAwesomeIcon icon={faList} className={`mt-2 mr-3 ${styleGrid ? 'text-dark' : 'text-orange'}`}
								onClick={() => setStyleGrid(false)} />
								<FontAwesomeIcon icon={faTh} className="text-dark" className={`mt-2 ${styleGrid ? 'text-orange' : 'text-dark'}`}
								onClick={() => setStyleGrid(true)} />
							</div>
						</Col>
					</Row>
					{status &&
						<div class="alert alert-success position-fixed" role="alert">
						    <span>{`${status}: ${message}`}</span>
						</div>
					}
					<div>
						<div className={styleGrid && 'row'}>
							{filteredLinks.map(link => (
								styleGrid ? (
									<div className="col-md-3 px-1 py-1">
										<div className="bg-white rounded border position-relative link-style-grid text-center">
											<div className="style-grid position-absolute"
												style={{background: `url(http://localhost:5000/uploads/${link.image}) no-repeat center/cover`}}>
											</div>
											<div className="mt-3">
												<h4>{link.title}</h4>
												<span className="text-muted"
												style={{fontSize: "12px"}}>{`http://localhost:5000/preview/${link.url}`}</span>
											</div>
											<div className="mt-3" style={{fontSize: "25px"}}>
												<FontAwesomeIcon icon={faEye} className="text-orange" /> {link.viewCount}
											</div>
											<div className="mt-3">
												<div className="d-flex icon-action text-center justify-content-center">
													<div className="rounded shadow-sm">
														<Link as={Link} to={`/preview/${link.uniqueLink}`} target="_blank">
															<FontAwesomeIcon icon={faEye} className="text-orange" role="button" />
														</Link>
													</div>
													<div className="rounded shadow-sm">
														<Link as={Link} to={`/link/${link.id}`}>
															<FontAwesomeIcon icon={faEdit} className="text-orange" role="button" />
														</Link>
													</div>
													<Delete deleteLink={link.id} />
												</div>
											</div>
										</div>
									</div>
								) : (
								<>
									<div className="bg-white py-3 px-4 rounded border mb-3 d-none d-md-block">
										<div className="d-flex">
											<div className="flex-fill">
												<div className="rounded-circle style-list"
												style={{background: `url(http://localhost:5000/uploads/${link.image}) no-repeat center/cover`}}>
												</div>
											</div>
											<div className="text-left mt-4 flex-fill">
												<h4>{link.title}</h4>
												<span className="text-muted">{`http://localhost:5000/preview/${link.uniqueLink}`}</span>
											</div>
											<div className="mt-4 flex-fill" style={{fontSize: "25px"}}>
												<FontAwesomeIcon icon={faEye} className="text-orange" /> {link.viewCount}
											</div>
											<div className="mt-4 flex-fill">
												<div className="d-flex icon-action text-center justify-content-end">
													<div className="rounded shadow-sm">
														<Link as={Link} to={`/preview/${link.uniqueLink}`} target="_blank">
															<FontAwesomeIcon icon={faEye} className="text-orange" role="button" />
														</Link>
													</div>
													<div className="rounded shadow-sm">
														<Link as={Link} to={`/link/${link.id}`}>
															<FontAwesomeIcon icon={faEdit} className="text-orange" role="button" />
														</Link>
													</div>
													<Delete deleteLink={link.id} />
												</div>
											</div>
										</div>
									</div>

									<div className="bg-white py-3 px-2 rounded border mb-3 d-xs-block d-sm-block d-md-none">
										<div className="d-flex">
											<div>
												<div className="rounded-circle style-list"
												style={{background: `url(http://localhost:5000/uploads/${link.image}) no-repeat center/cover`}}>
												</div>
											</div>
											<div className="text-left mt-1 ml-2 flex-fill">
												<h4>{link.title}</h4>
												<span className="text-muted"
												style={{fontSize: "10px"}}>{`http://localhost:5000/preview/${link.uniqueLink}`}</span>
												<div className="py-2">
													<FontAwesomeIcon icon={faEye} className="text-orange" /> {link.viewCount}
												</div>
											
												<div className="d-flex icon-action text-center justify-content-start">
													<div className="rounded shadow-sm">
														<Link as={Link} to={`/preview/${link.uniqueLink}`} target="_blank">
															<FontAwesomeIcon icon={faEye} className="text-orange" role="button" />
														</Link>
													</div>
													<div className="rounded shadow-sm">
														<Link as={Link} to={`/link/${link.id}`}>
															<FontAwesomeIcon icon={faEdit} className="text-orange" role="button" />
														</Link>
													</div>
													<Delete deleteLink={link.id} />
												</div>
											</div>
										</div>
									</div>
								</>
								)
							))} 
						</div>
					</div>					
				</div>
			</div>
			<MobileNav />
		</div>
	)
}