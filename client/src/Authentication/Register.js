import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Context/userContext'
import { API } from '../Config/api'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextField from '../Components/TextField'

function Register(props) {
  // Router
  const router = useHistory();

  // Client Validation
  const validate = Yup.object({
    fullname: Yup.string()
      .max(25, 'Fullname no more than 25 characters')
      .required('Email is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm Password is required')
  })

  // State
  const [error, setError] = useState('')

  // Context
  const [state, dispatch] = useContext(UserContext)

  // Form submit Function
  const handleSubmit = (values) => {
    API.post('/register', {
      fullname: values.fullname,
      email: values.email,
      password: values.password
    })
    .then(response => {
      dispatch({
        type: "REGISTER_USER",
        payload: response.data.data.user,
      })
      router.push('/templates')
    })
    .catch(error => {
      setError(error.response.data.message)
    });
  }

  return (
    <Formik
      initialValues={{
        fullname: '',
        email: '',
        password: '',
        confirm_password: ''
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
            <TextField placeholder="fullname" name="fullname" type="text" />
            <TextField placeholder="Email" name="email" type="email" />
            <TextField placeholder="Password" name="password" type="password" />
            <TextField placeholder="Confirm Password" name="confirm_password" type="password" />
            <button className="btn btn-orange btn-block mt-4" type="submit">Sign Up</button>
          </Form>
        </div>
      )}  
    </Formik>
  );
}

export default Register