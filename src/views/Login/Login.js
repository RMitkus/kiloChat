/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useStyles from './LoginStyles';

const Login = ({ history }) => {
  useEffect(() => (localStorage.getItem('chat') !== null ? history.push('/chat') : null), []);

  const classes = useStyles();

  const notifySuccess = () => toast.info('Logged in!',
    {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const loginUser = async (data, resetForm) => {
    localStorage.setItem('chat', data.email);
    history.push('/chat');
    resetForm({});
    notifySuccess();
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            loginUser(values, actions.resetForm);
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email().required('Enter email'),
          password: Yup.string().required(),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <img src="images/logo.svg" alt="kilo health logo" className={classes.logo} />
              <h1 className={classes.title}>Log In To Healthy Chat</h1>
              <Grid
                container
                justify="space-around"
                direction="row"
              >
                <Grid item xs={10} className={classes.textField}>
                  <TextField
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="email"
                    helperText={errors.email && touched.email ? errors.email : 'Enter email'}
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10} className={classes.textField}>
                  <TextField
                    name="password"
                    id="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText="Enter password"
                    error={!!(errors.password && touched.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={10} className={classes.submitButton}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
