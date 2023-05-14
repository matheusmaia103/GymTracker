import styled from 'styled-components';

export const Nav = styled.nav`
  max-width: 99vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  color: white;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    list-style: none !important;
  }
`;
export const Body = styled.div`
  list-style: none;
  background: linear-gradient(
    145deg,
    rgb(235 234 233) 46%,
    rgb(193 205 8) 100%
  );
  // linear-gradient(145deg, #ffc603 27%, #91761b 85%);
  //linear-gradient(145deg, rgb(253 253 253) 50%, rgb(145, 118, 27) 95%);
  color: white;

  height: 100vh !important;
  max-width: 100vw !important;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: absolute;
  overflow: auto;

  * {
    box-sizing: border-box;
    text-transform: none !important;
  }

  a {
    text-decoration: none !important;
  }
  //material ui input
  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 50px;
  }
  //scroll bar

  ::-webkit-scrollbar {
    width: 4px;
    z-index: 10;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    opacity: 0.1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 5px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: white;
  }

  //btn
  .css-1kpdo8f-MuiButtonBase-root-MuiButton-root {
    padding: 14px 25px;
  }

  span {
    display: flex !important;
    align-items: center;
  }

  .css-8atqhb,
  #simple-tabpanel-1,
  .MuiBox-root,
  .MuiTabs-flexContainer,
  .css-heg063-MuiTabs-flexContainer,
  .css-1v3hsb3 {
    width: max-content !important;
  }
`;

export const Main = styled.main`
  min-width: 80vw !important;
  max-width: 800px !important;
  width: 99%;
  padding: 50px 35px 50px 35px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export const Title = styled.h1`
  color: black;
  margin-left: 20px;
`;

export const StyledInput = styled.input`
  background-color: transparent;
  color: black;
  padding: 8px;
  margin-left: 5px;
  border-radius: 50px;
  display: inline;

  border: 2px solid black;
  width: 60px;
  text-align: center;
`;

export const H1 = styled.h1`
  color: black;
  font-weight: 600;
  font-size: 45px;

  text-align: center;
  width: 100%;
  margin: 1px 0;
`;

export const H2 = styled.h2`
  color: black;
  font-weight: 500;
  font-size: 35px;

  text-align: left;
  width: 90%;
  margin: 10px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const H3 = styled.h3`
  color: black;
  font-weight: 400;
  font-size: 20px;

  text-align: center;
  align-items: center;
  width: 95%;
  margin: 5px 0;
  margin-right: 30px;
  padding-right: 50px;
  display: flex;
  justify-content: end;
`;

export const P = styled.li`
  list-style: none;
  background-color: white;
  color: black;
  width: 90%;

  padding: 15px;
  margin-top: 8px;
  margin-bottom: 5px;
  border: 1px black solid;
  border-radius: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  text-decoration: none;

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  img {
    max-width: 60px;
  }
`;

export const PlusBtn = styled.button`
  background-color: transparent;
  color: darkblue;
  width: 100%;

  padding: 15px;
  border: 2px darkblue solid;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 10px;
`;
