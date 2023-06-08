// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { toast } from "react-hot-toast";

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import { useUpdatePassword } from '../../../api/config/userProfile'
import { useDispatch } from 'react-redux'

// ** Demo Components

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  retypeNewPassword: ''
}

const SecurityTabContent = () => {

          // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)
  console.log("🚀 ~ file: SecurityTabContent.js:43 ~ SecurityTabContent ~ userData:", userData)

  //** ComponentDidMount
  useEffect(() => {
    // if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    // }
  }, [])

const passwordQuery = useUpdatePassword();
  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, obj => showErrors('Current Password', obj.value.length, obj.min))
      .required(),
    newPassword: yup
      .string()
      .min(8, obj => showErrors('New Password', obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .min(8, obj => showErrors('Retype New Password', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = data => {
    data.email = userData?.email;

      if (Object.values(data).every(field => field.length > 0)) {
          console.log('✅ data    ', data)
          passwordQuery.mutate(data);
          return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  useEffect(() => {
    const data = passwordQuery?.data;
    if (passwordQuery.isSuccess) {
      const message = data?.message;
      const validationErrors = data?.validation_errors;
      const response = data?.response;
      if (response === 200) {
        toast.success(message);
    } else {
        Object.keys(validationErrors).forEach((key) => {
          toast.error(validationErrors[key]);
        });
      }
    }

    if (passwordQuery.isError) {
      const message = 'Error occurred while saving the data';
      toast.error(message);
    }
  }, [passwordQuery.isSuccess, passwordQuery.isError]);

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='currentPassword'
                  name='currentPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Current Password'
                      htmlFor='currentPassword'
                      className='input-group-merge'
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback className='d-block'>{errors.currentPassword.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='newPassword'
                  name='newPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='New Password'
                      htmlFor='newPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='retypeNewPassword'
                  name='retypeNewPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Retype New Password'
                      htmlFor='retypeNewPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className='d-block'>{errors.retypeNewPassword.message}</FormFeedback>
                )}
              </Col>
              {/* <Col xs={12}>
                <p className='fw-bolder'>Password requirements:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimum 8 characters long - the more, the better</li>
                  <li className='mb-50'>At least one lowercase character</li>
                  <li>At least one number, symbol, or whitespace character</li>
                </ul>
              </Col> */}
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Save changes
                </Button>
                <Button type='reset' color='secondary' outline>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTabContent
