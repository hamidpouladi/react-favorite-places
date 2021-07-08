import PropTypes from 'prop-types';
import {Popup} from 'react-leaflet';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import StyleWrapper from './popup.style';

export default function CustomPopup({
  headerTitle,
  title,
  description,
  onRemove,
  onEdit,
}) {
  return (
    <Popup>
      <StyleWrapper>
        <div className="popup-header">{headerTitle}</div>
        <div className="popup-content">
          <div className="popup-title">
            <span>{title}</span>

            <IconButton aria-label="edit" onClick={onEdit}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" onClick={onRemove}>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="popup-desc">{description}</div>
        </div>
      </StyleWrapper>
    </Popup>
  );
}

CustomPopup.propTypes = {
  headerTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};
