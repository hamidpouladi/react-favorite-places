import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
  },
  title: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({open, onClose, title, children}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        className={classes.root}
      >
        <MuiDialogTitle disableTypography className={classes.title}>
          <Typography variant="h6">{title}</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent>{children}</MuiDialogContent>
      </Dialog>
    </div>
  );
}
