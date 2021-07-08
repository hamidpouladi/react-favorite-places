import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: '30px',
    left: '50px',
    zIndex: 999,
    background: '#FFF',
    color: '#8c8c8c',
  },
}));

export default function MyPlacesButton({onClick}) {
  const classes = useStyles();
  return (
    <IconButton
      color="primary"
      aria-label="show my places"
      className={classes.root}
      onClick={onClick}
    >
      <ListOutlinedIcon />
    </IconButton>
  );
}

MyPlacesButton.prototype = {
  onClick: PropTypes.func,
};
