export const loginUser = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.username === 'test@luxpmsoft.com' &&
        credentials.hash === 'test1234!'
      ) {
        resolve({ ...credentials, success: true, token: '1234' });
      } else {
        reject({
          ...credentials,
          success: false,
          message: `We could not log you in`,
        });
      }
    }, 1000);
  });
};

export const sendPassword = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'test@luxpmsoft.com') {
        resolve({
          ...credentials,
          success: true,
          message:
            'Please check your email, a link to reset your password was sent to you',
        });
      } else {
        reject({
          ...credentials,
          success: false,
          message: `We could not send you an email`,
        });
      }
    }, 1000);
  });
};
