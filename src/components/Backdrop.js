import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

// eslint-disable-next-line react/prop-types
const BackdropContainer = ({ show }) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

BackdropContainer.defaultProps = {
  show: false,
};

export default BackdropContainer;
