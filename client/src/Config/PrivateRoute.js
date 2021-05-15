import {Route, Redirect} from 'react-router-dom'
import {useContext} from 'react'

const PrivateRoute = ({component: Component, ...rest}) => {

	return (
		<Route
	      {...rest}
	      render={ (props) => 
	        localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/" />
	      }
	    />
	)
}

export default PrivateRoute;