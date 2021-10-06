import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';

import { loginUser } from '../../services/loginService';
import { validateEmail } from '../../utils/validation';
import { baseStyles, loginStyles } from '../../style/styles';
import AuthHeader from '../core/AuthHeader';

const useStyles = makeStyles(() => ({
  ...baseStyles,
  ...loginStyles,
}));

const SignIn = ({ token, setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(true);
  const { t } = useTranslation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setValidEmail(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    setError('');
    
    const data = {
      username: email,
      hash: password,
    };

    try {
      const isLoggedIn = await loginUser(data);
      if (isLoggedIn) {
        if (isLoggedIn.success) {
          localStorage.setItem('token', isLoggedIn.token);
          localStorage.setItem('email', isLoggedIn.username);
          setToken(isLoggedIn);
        } else {
          throw new Error(isLoggedIn.message)
        }
      }
    } catch (err) {
      setError(err?.message || t('Email or Password are incorrect!'));
    }
  };

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <AuthHeader mainMessage='Login' />
      <div className={classes.mainContainer}>
        {error ? (
          <Alert className={classes.alert} variant='filled' severity='error'>
            {error}
          </Alert>
        ) : null}
        <form className={classes.form} onSubmit={handleSignIn}>
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
            <Grid item>
              <TextField
                className={classes.inputFields}
                variant='standard'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                margin='normal'
                required
                name='password'
                label={t('Password')}
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.forgotPasswordGrid}
            container
            direction='column'
            alignItems='flex-end'
          >
            <Grid className={classes.forgotPass} item>
              <Link to='/forgotPassword' variant='body2'>
                {t('Find Password')}
              </Link>
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
                {t('Sign In')}
              </Button>
            </Grid>
            <Grid item>
              <Link to='/' variant='body2'>
                {t("Don't have an account")}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
