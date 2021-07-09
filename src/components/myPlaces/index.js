import {forwardRef, useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import PlaceList from './components/placeList';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch} from 'react-redux';
import {removePlace, editPlace} from '../../actions/place';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import {MapContext} from '../../App';
import {closeMyPlaces} from '../../actions/myPlaces';

const useStyles = makeStyles(theme => ({
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
  search: {
    margin: '30px auto',
    width: '320px',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: '40px',
    height: '40px',
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function MyPlaces({open, onClose}) {
  const [filterInput, setFilterInput] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const map = useContext(MapContext);
  const pins = useSelector(state => state.places.pins);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {getRootProps, getInputLabelProps, getInputProps, groupedOptions} =
    useAutocomplete({
      id: 'search-places',
      options: pins,
      getOptionLabel: option => option.title,
      freeSolo: true,
      onInputChange: (e, newValue) => setFilterInput(newValue),
    });

  useEffect(() => {
    setFilteredPlaces(groupedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterInput]);

  const handleEditPlace = place => {
    dispatch(editPlace(place));
  };

  const handleRemovePlace = place => {
    dispatch(removePlace(place.id));
  };

  const handleGoToLocation = place => {
    const {leafletElement: mapEl} = map;
    dispatch(closeMyPlaces());
    if (mapEl) {
      const {lat, lng} = place;
      mapEl.flyTo([lat, lng], 14, {
        duration: 2,
      });
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <MuiDialogTitle disableTypography className={classes.title}>
        <Typography variant="h6">Locations</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </MuiDialogTitle>

      <TextField
        placeholder="Search"
        id="search"
        className={classes.search}
        variant="outlined"
        {...getRootProps()}
        InputLabelProps={{...getInputLabelProps()}}
        InputProps={{
          className: classes.input,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
          ...getInputProps(),
        }}
      />

      <PlaceList
        items={filteredPlaces.length > 0 ? filteredPlaces : pins}
        onEdit={handleEditPlace}
        onDelete={handleRemovePlace}
        onItemClick={handleGoToLocation}
      />
    </Dialog>
  );
}

MyPlaces.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
