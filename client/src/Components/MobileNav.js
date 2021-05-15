import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLink, faPager, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../Context/userContext'

export default function MobileNav() {

	const [state, dispatch] = useContext(UserContext);

	const handdleLogout = () => {
		dispatch({
			type: 'LOGOUT'
		})
	}

	return (
		<div>
			<ul class="nav justify-content-center mobile-nav d-xs-block d-sm-block d-md-none bg-white py-3">
				<li class="nav-item flex-fill text-center">
					<Link as={Link} to="/templates" className="font-weight-bold btn-text-orange">
						<FontAwesomeIcon icon={faPager} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
					</Link>
				</li>
				<li class="nav-item flex-fill text-center">
					<Link as={Link} to="/profile" className="font-weight-bold btn-text-orange">
						<FontAwesomeIcon icon={faUser} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
					</Link>
				</li>
				<li class="nav-item flex-fill text-center">
					<Link as={Link} to="/links" className="font-weight-bold btn-text-orange">
						<FontAwesomeIcon icon={faLink} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
					</Link>
				</li>
				<li class="nav-item flex-fill text-center">
					<div className="font-weight-bold btn-text-orange" role="button" onClick={handdleLogout}>
						<FontAwesomeIcon icon={faSignOutAlt} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
					</div>
				</li>
			</ul>
		</div>
	)
}