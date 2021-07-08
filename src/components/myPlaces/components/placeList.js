import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
    margin: '10px auto',
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    cursor: 'pointer',
  },
}));

export default function PlaceList({items = [], onItemClick, onEdit, onDelete}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={item.title}
              onClick={() => onItemClick(item)}
              className={classes.listItem}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => onEdit(item)}
                aria-label="edit"
                edge="start"
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => onDelete(item)}
                aria-label="delete"
                edge="end"
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

PlaceList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
