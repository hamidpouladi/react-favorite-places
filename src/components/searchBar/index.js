import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {search} from '../../actions/search';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'fixed',
    zIndex: 999,
    top: '30px',
    left: '50%',
    marginLeft: '-150px',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: '40px',
    height: '40px',
  },
}));

export default function SearchBar({onSelectLocation}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch();
  const {data: places, fetching, error} = useSelector(state => state.search);
  const {history} = useSelector(state => state.map);

  const handleSearch = (event, newInputValue) => {
    if (event.type !== 'change') return;
    dispatch(search({text: newInputValue}));
  };

  const handleValueChange = (event, newValue) => {
    if (!newValue) return;
    setValue(newValue);
    onSelectLocation(newValue);
  };

  return (
    <Autocomplete
      id="location-search"
      className={classes.search}
      style={{width: 300}}
      getOptionLabel={option =>
        option?.address ? option.address : option?.title
      }
      filterOptions={x => x}
      options={places.length > 0 ? places : history}
      autoComplete
      freeSolo
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={handleValueChange}
      onInputChange={handleSearch}
      loading={fetching}
      loadingText={<CircularProgress disableShrink size={25} />}
      noOptionsText={
        error && error?.status === 404 ? ' not found' : 'no options'
      }
      renderInput={params => (
        <TextField
          className={classes.textField}
          {...params}
          variant="outlined"
          placeholder="Search"
          fullWidth
          InputProps={{
            ...params.InputProps,
            className: classes.input,
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={option => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                {option.address ? option.address : option.title}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

SearchBar.propTypes = {
  onSelectLocation: PropTypes.func,
};
