/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Container, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.min.css';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import useStyles from './ProfileStyles';

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const editUserData = async (data, resetForm) => {
    setOpen(true);
    resetForm({});
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Formik
          initialValues={{
            name: '',
            lastName: '',
            email: localStorage.getItem('chat'),
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              editUserData(values, actions.resetForm);
              actions.setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email().required('Enter email'),
            name: Yup.string().required(),
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
              <Grid item style={{ textAlign: 'center' }}>
                <Form>
                  <h1>Profile</h1>
                  <Avatar className={classes.avatar} alt="Lion" src="https://images.unsplash.com/photo-1562569633-622303bafef5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" />

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
                        name="name"
                        id="name"
                        label="Name"
                        value={values.name}
                        type="name"
                        helperText="Enter name"
                        error={!!(errors.name && touched.name)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={10} className={classes.textField}>
                      <TextField
                        name="lastName"
                        id="lastName"
                        label="Last name"
                        value={values.lastName}
                        type="lastName"
                        helperText="Enter last name"
                        error={!!(errors.lastName && touched.lastName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={10} className={classes.submitButton}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        style={{ marginTop: '16px' }}
                      >
                        Update profile
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
            );
          }}
        </Formik>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Dummy text to inform that change was a great success!
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default Profile;
