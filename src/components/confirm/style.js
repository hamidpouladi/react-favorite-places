import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 270px;
  min-height: 400px;
  padding: 15px 0;
  .confirm-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #a7a8a5;
    img {
      width: 100px;
      margin-bottom: 15px;
    }
    .confirm-msg {
      color: #a7a8a5;
      font-size: 24px;
    }
  }
  .confirm-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
