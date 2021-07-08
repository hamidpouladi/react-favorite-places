import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MyLocationOutlinedIcon from '@material-ui/icons/MyLocationOutlined';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: '30px',
    right: '50px',
    zIndex: 999,
    background: '#FFF',
    color: '#1c8ddd',
  },
}));

export default function FindMyLocationButton({onClick}) {
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      color="primary"
      aria-label="show my places"
      className={classes.root}
    >
      <MyLocationOutlinedIcon size="medium" />
    </IconButton>
  );
}

FindMyLocationButton.propTypes = {
  onClick: PropTypes.func,
};
