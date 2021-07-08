import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '../buttons/button';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '-16px 0 32px 0',
    padding: '0 70px',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
    marginTop: 'auto',
  },
  textField: {
    width: '100%',
  },
  formWrapper: {
    minHeight: 400,
    marginTop: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 400,
    justifyContent: 'space-between',
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 25,
  },
}));

export default function PlaceForm({
  defaultValues = {
    title: '',
    description: '',
  },
  onSubmit,
  onCancel,
}) {
  const classes = useStyles();
  const {control, handleSubmit} = useForm({
    defaultValues,
  });

  return (
    <div className={classes.formWrapper}>
      <div className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item md={12} xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{required: 'Required Field'}}
                render={({field, fieldState: {error}}) => (
                  <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    margin="normal"
                    error={!!error}
                    helperText={error ? error.message : ''}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{required: 'Required Field'}}
                render={({field, fieldState: {error}}) => (
                  <TextField
                    id="description"
                    label="Description"
                    className={classes.textField}
                    margin="normal"
                    error={!!error}
                    helperText={error ? error.message : ''}
                    multiline
                    rows={4}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <div className={classes.formFooter}>
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

PlaceForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};
