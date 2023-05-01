import styled from 'styled-components';

export const Form = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;

  list-style: none !important;

  overflow: auto;
  max-width: 85vw;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-right: 10px;
    border-radius: 10px;
    color: black;
    cursor: pointer;

    img {
      max-width: 70px !important;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    z-index: 10;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    opacity: 0.1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ffffffa1;
    border-radius: 5px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: white;
  }
`;

export const Searchli = styled.li``;
