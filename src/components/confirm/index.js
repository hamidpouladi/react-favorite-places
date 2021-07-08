import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '../Dialog';
import Button from '../buttons/button';
import StyleWrapper from './style';
import deleteIcon from '../../images/delete-icon.svg';

const Confirm = ({
  open,
  onClose,
  onAccept,
  onDecline,
  acceptText,
  declineText,
}) => {
  return (
    <Dialog
      title="Delete Location"
      open={open}
      onClose={onClose}
      btnIcon={<CloseIcon />}
      direction="up"
    >
      <StyleWrapper>
        <div className="confirm-body">
          <img src={deleteIcon} alt="delete icon" />
          <div className="confirm-msg">Are You Sure?</div>
        </div>
        <div className="confirm-footer">
          <Button onClick={onAccept} color="primary">
            {acceptText}
          </Button>
          <Button onClick={onDecline}>{declineText}</Button>
        </div>
      </StyleWrapper>
    </Dialog>
  );
};

export default Confirm;

Confirm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
  acceptText: PropTypes.string,
  declineText: PropTypes.string,
};
