import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  root: {
  },
  avatar: {
    width: '100px',
    height: '100px',
    margin: '24px auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    '& > *': {
      width: '100%',
    },
  },
}));

export default useStyles;
