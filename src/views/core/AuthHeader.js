import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

import logoImage from '../../assets/images/gradation.png';
import { authHeaderStyles } from '../../style/styles';

const useStyles = makeStyles(() => (
  authHeaderStyles
));

export default function AuthHeader ( { mainMessage, secondaryMessage } ) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      className={classes.headerGrid}
      container
      spacing={2}
      direction="column"
      alignItems="center"
    >
      <Grid
        item
      >
        <img src={logoImage} alt="alphametrica" />
      </Grid>
      <Grid
        className={classes.loginContainer}
        item
      >
        <Typography
          className={classes.login}
          component="div"
        >
          {t(mainMessage)}
        </Typography>
      </Grid>
      <Grid
        item
      >
        <Typography
          className={classes.message}
          component="div"
        >
          {t(secondaryMessage)}
        </Typography>
      </Grid  >
    </Grid>
  )
}
