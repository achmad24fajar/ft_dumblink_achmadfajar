import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { API } from '../Config/api'
import { MessageContext } from '../Context/messageContext'

import VerticalNav from '../Components/VerticalNav'
import Header from '../Components/Header'
import MobileNav from '../Components/MobileNav'

export default function Profile() {
	const [userField, setUserField] = useState({
		fullname: '', email: ''
	})

	const { fullname, email } = userField

	const [ state, dispatch ] = useContext(MessageContext)
	const { status, message } = state

	const getUser = async () => {
		try {
			const response = await API.get(`/user`);
			const user = response.data.data.user;
			setUserField({
				fullname: user.fullname,
				email: user.email
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser()
	},[])

	const editUser = useMutation(async () => {
		const body = JSON.stringify({
			fullname
		})

		const config = {
		    headers: {
		      	"Content-Type": "application/json",
		    },
	    };

	    const response = await API.patch(`/user`, body, config);

	    dispatch({
	    	type: 'MESSAGE',
	    	payload: response.data
	    })
	    
    });

    const handleSubmit = async (e) => {
    	e.preventDefault();
    	editUser.mutate()
    }

	// Input Function
	const onChange = (e) => {
		setUserField({
		    ...userField,
		    [e.target.name]: e.target.value,
		});
	}; 

	return (
		<div>
			<Header title="My Profile" />
			<VerticalNav />
			<div style={{margin: "90px 100px 0 300px"}} className="clearfix">
				<div className="mb-3">
					<h5 className="text-dark pl-3 py-2 border-left border-warning">My Information</h5>
				</div>
				{status &&
					<div class="alert alert-warning" role="alert">
					    <span>{`${status}: ${message}`}</span>
					</div>
				}
				<div className="bg-white rounded p-3 mt-3">
					<form>
						<div className="form-group">
							<label>Name *</label>
							<input type="text" className="form-control" name="fullname" value={userField.fullname} onChange={e => onChange(e)} />
						</div>
						<div className="form-group">
			                <label>Email *</label>
			                <input type="email" className="form-control" name="email" value={userField.email} onChange={e => onChange(e)} disable />
			            </div>
					</form>
				</div>
				<div className="float-right d-flex mt-3"> 
					<button className="btn btn-orange" onClick={handleSubmit}>Save Changes</button>
					<button className="btn btn-dark ml-3">Delete Account</button>
				</div>
			</div>
			<MobileNav />
		</div>
	)
}