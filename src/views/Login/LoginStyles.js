import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: '450px',
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
  },
  textField: {
    '& > *': {
      width: '100%',

    },
  },
  submitButton: {
    margin: '24px',
    display: 'flex',
    '& button': { margin: 'auto' },

  },
  title: { textAlign: 'center', fontWeight: 100, marginTop: '4em' },
  logo: {
    maxWidth: '80%',
    marginTop: '7em',
    margin: 'auto',
  },
}));

export default useStyles;
