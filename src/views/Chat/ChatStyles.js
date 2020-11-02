import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  messageRoot: {
    display: 'flex',
    margin: theme.spacing(1),

  },
  sidebar: {
    backgroundColor: theme.palette.background.paper,
  },
  chatBox: {
    backgroundColor: theme.palette.background.paper,
    height: '70vh',
    padding: theme.spacing(3),
    borderColor: theme.palette.primary.main,
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
  },
  text: {
    whiteSpace: 'normal',

  },
  messageBox: {
    maxWidth: '100%',
    height: 'auto',
    padding: theme.spacing(1),
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    marginLeft: theme.spacing(1),
  },
  chatInputBox: {
    display: 'flex',
  },
  chatName: {
    margin: theme.spacing(2),
  },
}));

export default useStyles;
