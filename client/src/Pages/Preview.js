import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { API } from '../Config/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function Preview() {
	const {uniqueLink} = useParams()

	const [linkData, setLinkData] = useState({
		title: '', description: '', image: '', theme: '', links: null
	})

	const { title, description, image, theme, links } = linkData

	const getLink = async () => {
		try {
			const response = await API.get(`/link/${uniqueLink}`);
			const link = response.data.data.link;
			setLinkData({
				title: link.title,
				description: link.description,
				image: link.image,
				theme: link.theme,
				links: link.links
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getLink()
	},[])

	const redirectTo = (e, url) => {
		e.preventDefault();
		window.location = url
	}

	console.log(links)

	return (
		<div className={`${theme} bg`} 
		style={{background: `url(http://localhost:5000/uploads/Image/bg-${theme}.png) no-repeat center/cover`}}>
			<Link as={Link} to="/links">
				<button className="btn btn-lg btn-dark rounded-circle shadow-sm position-absolute"
				style={{left: "280px", top: "80px"}}>
					<FontAwesomeIcon icon={faChevronLeft} className="text-white" />
				</button>
			</Link>
			<div className={`desktop mobile-preview`}>
				<div className="photo-profile text-center">
					<div style={{background: `url(http://localhost:5000/uploads/${image}) no-repeat center/cover`}} 
					className="image-profile-preview"></div>
				</div>
				<div className="brand-name mt-2">
					<h2>{title}</h2>
				</div>
				<div className="descriprion">
					<p>{description}</p>
				</div>
				<div className="links-mobile links-preview">
				{links?.map((link, index) => (
				<div className={`link mt-2 ${theme == 'modern' ? index > 1 && 'd-inline-block' : ''}`}>
					<div className="d-flex py-2 px-3">
					{theme == 'white' && (
						<>
						<div>
							<div style={{background: `url(http://localhost:5000/uploads/${link.imageLink}) no-repeat center/cover` }} 
							className="image-link-preview rounded-circle"></div>
						</div>
						<div className="flex-fill">
							<span role="button" className="title-link">
								{link.title}
							</span>
						</div>
						</>
					)}
					{theme == 'blue-sky' && (
						<div className="flex-fill">
							<span role="button" className="title-link">
								{link.title}
							</span>
						</div>
					)}
					{theme == 'sunset' && (
						<div>
							<div style={{background: `url(http://localhost:5000/uploads/${link.imageLink}) no-repeat center/cover` }} 
							className="image-link-preview rounded-circle"></div>
						</div>
					)}
					{theme == 'modern' && (
						index <= 1 ? (
							<>
								<div>
									<div style={{background: `url(http://localhost:5000/uploads/${link.imageLink}) no-repeat center/cover` }} 
									className="image-link-preview rounded-circle"></div>
								</div>
								<div className="flex-fill mt-1">
									<span role="button" className="title-link">
										{link.title}
									</span>
								</div>
								<div>
									<button className="btn btn-outline-dark">Check</button>
								</div>
							</>
						) : (
							<div style={{background: `url(http://localhost:5000/uploads/${link.imageLink}) no-repeat center/cover` }} 
							className="image-link-preview rounded-circle d-inline-block"></div>
						)
					)}
					</div>
				</div>
				))}
				</div>
			</div>
		</div>
	)
}