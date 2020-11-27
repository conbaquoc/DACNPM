import styled from 'styled-components';
// import loginBackground from '../../assets/images/login_background.jpg';

const PublicLayoutWrapper = styled.div`
  .layout {
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center  
  }

  .main-img {
    background-image: url(https://images.unsplash.com/photo-1464082354059-27db6ce50048?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
    background-color: transparent;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100vh;
  }
  
  .main-content {
    background-color: white;
    padding: 70px 50px;
    text-align: center;
    min-width: 450px;
    width: auto;
    @media only screen and (max-width: 500px) {
      min-width: 320px;
      width: 100%;
    }
  }
`;

export default PublicLayoutWrapper;
