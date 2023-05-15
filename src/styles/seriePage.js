import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const Exercise = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;

  background: white;
  border-radius: 10px;
  margin: 8px;
  padding: 5px;

  img {
    width: 60px !important;
    height: 60px !important;
    align-self: center;
    border-radius: 5px;
  }

  p {
    text-align: left;
    color: black;

    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center !important;
  }
`;
