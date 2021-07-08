import styled from 'styled-components';

export default styled.div`
  min-width: 250px;
  .popup-header {
    position: absolute;
    top: 3px;
    left: 10px;
    font-size: 15px;
  }
  .popup-content {
    font-size: 14px;
  }
  .popup-title {
    display: flex;
    align-items: center;
    margin: 25px 0 15px;
    span {
      flex-grow: 1;
    }
  }
  .popup-desc {
    margin-bottom: 20px;
    font-size: 13px;
  }
`;
