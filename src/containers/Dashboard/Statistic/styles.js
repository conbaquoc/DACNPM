import styled from "styled-components";

export default styled.div`
  .ant-card-body {
    display: flex;
    justify-content: space-between;
    background: #0051ff;
    border-radius: 8px;
    padding: 24px 5px;
    .left-info {
      min-width: 120px;
      display:flex;
      flex-direction: column-reverse;
      div {
        color: #ffffff;
        font-weight: bold;
      }
      .ant-statistic-title {
        font-weight: normal;
      }
    }
    .shift {
      border-radius: 4px;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background: #ffffff;
      .right-info {
        .ant-statistic-content {
          font-size: 16px;
        }
      }
    }
  }

  
  .blur-blue {
    .ant-card-body {
      background: #B8CCFF;
      .left-info {
        div {
          color: #000000;
        }
      }
      .shift {
        background: #ffffff;
      }
    }
  }
`;
