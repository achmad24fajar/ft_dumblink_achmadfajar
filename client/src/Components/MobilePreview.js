import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const MobilePreview = ({theme, data}) => {

	console.log(data)

	return (
		<div>
			<div className={`theme ${theme} pt-1 d-none d-md-block text-center`} 
		    style={{ backgroundImage: `url(http://localhost:5000/uploads/image/${theme}.png)` }}>
	    		<div className="mobile-preview">
					<div className="photo-profile text-center">
						<div 
						style={{
							background: `url(${data?.image?.base64 || process.env.REACT_APP_IMAGE_POST+data?.image}) no-repeat center/cover` 
						}} 
						className="image-profile-mobile">
							{!data?.image?.base64 || !data?.image  && (
								<FontAwesomeIcon icon={faUser} className="text-orange" />
							)}
						</div>
					</div>
					<div className="brand-name mt-2">
						<h2 style={{fontSize: "15px", marginBottom: "2px"}}>{data?.title ? data?.title : 'Your Title'}</h2>
					</div>
					<div className="description-preview">
						<p><span>{data?.description ? data?.description : 'Your Description'}</span></p>
					</div>
					<div className="links-mobile">
					{data?.links?.map((link, index) => (
					<div className={`link mt-2 ${theme == 'modern' ? index > 1 && 'd-inline-block' : ''}`}>
						<div className="d-flex">
						{theme == 'white' && (
							<>
							<div>
								<div 
								className="image-link-mobile rounded-circle"
								style={{background: `url(${link?.imageLink?.base64 || process.env.REACT_APP_IMAGE_POST+link?.imageLink}) no-repeat center/cover` }} 
								></div>
							</div>
							<div className="flex-fill">
								<span role="button" className="title-link-mobile">
									{link.titleLink ? link.titleLink : 'Your Link'}
								</span>
							</div>
							</>
						)}
						{theme == 'blue-sky' && (
							<div className="flex-fill">
								<span role="button" className="title-link-mobile">
									{link.titleLink ? link.titleLink : 'Your Link'}
								</span>
							</div>
						)}
						{theme == 'sunset' && (
							<div>
								<div style={{background: `url(${link?.imageLink?.base64 || process.env.REACT_APP_IMAGE_POST+link?.imageLink}) no-repeat center/cover` }} 
								className="image-link-mobile rounded-circle"></div>
							</div>
						)}
						{theme == 'modern' && (
							index <= 1 ? (
								<>
									<div style={{background: `url(${link?.imageLink?.base64 || process.env.REACT_APP_IMAGE_POST+link?.imageLink}) no-repeat center/cover` }} 
									className={`image-link-mobile rounded-circle`}></div>
									<div className="flex-fill">
										<span role="button" className="title-link-mobile">
											{link.titleLink ? link.titleLink : 'Your Link'}
										</span>
									</div>
									<div>
										<button className="btn btn-outline-dark btn-xm">Check</button>
									</div>
								</>
							) : (
								<div style={{background: `url(${link?.imageLink?.base64 || process.env.REACT_APP_IMAGE_POST+link?.imageLink}) no-repeat center/cover` }} 
								className={`image-link-mobile rounded-circle`}></div>
							)
						)}
						</div>
					</div>
					))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MobilePreview