import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const AppWrapper = styled.div`
  background-color: #e5e6f0;
  height: 100vh;
  -webkit-font-smootihing: antialiased;
  /* max-width: 1200px; */
  padding: 60px 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 780px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

export const AsideStyled = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

export const MainStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;

  @media (max-width: 1150px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 550px) {
    grid-template-columns: auto;
  }
`;
