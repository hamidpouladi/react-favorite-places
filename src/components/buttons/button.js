import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export default styled(Button)`
  background-color: #04acec;
  background: ${props => (props.color === 'primary' ? '#04acec' : '#FFF')};
  border-radius: 0;
  color: ${props => (props.color === 'primary' ? '#FFF' : '#04acec')};
  border: 1px solid #04acec;
  padding: 7px 14px;
  min-width: 120px;
  &:hover {
    background-color: ${props =>
      props.color === 'primary' ? '#0599d1' : '#fbf7f7'};
  }
`;
