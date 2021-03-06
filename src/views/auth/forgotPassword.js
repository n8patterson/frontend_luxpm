import React, { Redirect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { sendPassword } from '../../services/loginService';
import { validateEmail } from '../../utils/validation';
import { baseStyles, forgotPasswordStyles } from '../../style/styles';
import AuthHeader from '../core/AuthHeader';

const useStyles = makeStyles(() => ({
  ...baseStyles,
  ...forgotPasswordStyles,
}));

const ForgotPassword = ({ token }) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [validEmail, isValidEmail] = React.useState(true);
  const { t } = useTranslation();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    isValidEmail(validateEmail(event.target.value));
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    setError('');
    
    const data = {
      username: email,
    };

    try {
      const isLoggedIn = await sendPassword(data);
      if (isLoggedIn) {
        if (isLoggedIn.success) {
          setMessage(isLoggedIn.message);
        } else {
            throw new Error(isLoggedIn.message)
        }
      }
    } catch (err) {
        setError(err?.message || t('Email is incorrect!'));
    }
  };

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <AuthHeader
        mainMessage='Forgot Password?'
        secondaryMessage={
          message ? '' : 'Please enter the email associated to your account.'
        }
      />
      <div className={classes.mainContainer}>
        {error ? (
          <Alert
            className={classes.alert}
            style={{ position: 'absolute' }}
            variant='filled'
            severity='error'
          >
            {error}
          </Alert>
        ) : null}
        {message !== '' && (
          <Typography component='div'>
            <strong>
              <center>{t(message)}</center>
            </strong>
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleForgotPassword}>
          <Grid
            className={classes.textFieldGrid}
            container
            spacing={2}
            direction='column'
            alignItems='center'
          >
            <Grid item>
              <TextField
                className={classes.inputFields}
                variant='standard'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                error={!validEmail}
                helperText={!validEmail ? 'The format is wrong' : ''}
                margin='normal'
                required
                id='email'
                label={t('Email Address')}
                name='email'
                autoComplete='email'
                autoFocus
                onChange={handleEmailChange}
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.submitGrid}
            container
            spacing={2}
            direction='column'
            alignItems='center'
          >
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                className={classes.loginButton}
              >
                {t('Submit Email')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;
