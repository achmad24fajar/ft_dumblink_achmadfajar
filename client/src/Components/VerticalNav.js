import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLink, faPager, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../Context/userContext'

export default function VerticalNav() {

	const [state, dispatch] = useContext(UserContext);

	const handdleLogout = () => {
		dispatch({
			type: 'LOGOUT'
		})
	}

	return (
		<div>
			<div className="dumblink-vertical-nav d-none d-md-block">
				<ul class="list-group position-fixed rounded-0 bg-white pt-4">
					<li class="list-group-item border-0 pl-5" aria-current="true">
						<Link as={Link} to="/templates" className="d-block font-weight-bold btn-text-orange">
							<FontAwesomeIcon icon={faPager} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
							<span>Template</span>
						</Link>
					</li>
					<li class="list-group-item border-0 pl-5">
						<Link as={Link} to="/profile" className="d-block font-weight-bold btn-text-orange d-flex">
							<FontAwesomeIcon icon={faUser} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
							<span>Profile</span>
						</Link>
					</li>
					<li class="list-group-item border-0 pl-5">
						<Link as={Link} to="/links" className="d-block font-weight-bold btn-text-orange d-flex">
							<FontAwesomeIcon icon={faLink} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
							<span>My Link</span>
						</Link>
					</li>
					<li class="list-group-item border-0 pl-5 logout">
						<div className="d-block font-weight-bold btn-text-orange d-flex" role="button" onClick={handdleLogout}>
							<FontAwesomeIcon icon={faSignOutAlt} className="text-orange" style={{fontSize: "20px", marginRight: "10px"}} />
							<span>Logout</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}