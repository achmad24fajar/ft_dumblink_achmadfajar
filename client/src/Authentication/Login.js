import React, { useState, useEffect, useContext } from 'react'
import { setAuthToken, API } from '../Config/api'
import { UserContext } from '../Context/userContext'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextField from '../Components/TextField'

function Login(props) {
  // Router
  const router = useHistory();

  // Client Validation
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  }) 

  // State
  const [error, setError] = useState('')

  // Context
  const [state, dispatch] = useContext(UserContext)

  // Form submit Function
  const handleSubmit = (values) => {
    API.post('/login', {
      email: values.email,
      password: values.password
    })
    .then(response => {
      let payload = response.data.data.user
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: payload,
      })
      setAuthToken(payload.token)
      router.push('/templates')
    })
    .catch(error => {
      setError(error.response.data.message)
    });
  }

  const alert = <div className="alert alert-danger" role="alert">{error}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close" style={{fontSize: "1.1rem"}}>
      <span aria-hidden="true" onClick={() => setError('')}>&times;</span>
    </button>
  </div>

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate}
      onSubmit={values => (
        handleSubmit(values)
      )}
    >
      {formik => (
        <div>
          {error && alert}
          <Form>
            <TextField placeholder="Email" name="email" type="email" />
            <TextField placeholder="Password" name="password" type="password" />
            <button className="btn btn-orange btn-block mt-4" type="submit">Sign Up</button>
          </Form>
        </div>
      )}  
    </Formik>
  );
}

export default Login