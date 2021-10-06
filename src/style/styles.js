export const baseStyles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 414,
  },
  form: {
    width: 414, // Fix IE 11 issue.
    marginTop: 100,
  },
  inputFields: {
    width: 302,
  },
  loginButton: {
    width: 287,
    background: '#3B286D',
    color: '#FFFFFF',
  },
  submitGrid: {
    marginTop: 100,
  },
  alert: {
    position: 'absolute',
    marginTop: 65,
  },
};

export const loginStyles = {
  textFieldGrid: {
    height: 200,
  },
  forgotPasswordGrid: {
    height: 36,
  },
  forgotPass: {
    marginRight: 55,
  },
};

export const forgotPasswordStyles = {
  textFieldGrid: {
    height: 236,
  },
};

export const authHeaderStyles = {
  headerGrid: {
    marginTop: 79,
    height: 135,
  },
  login: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: '#0A0A0A',
    fontSize: 23,
    fontWeight: 400,
    letterSpacing: '0em',
  },
  message: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: '#808080',
  },
};
