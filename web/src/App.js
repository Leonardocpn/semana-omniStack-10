import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateDevForm from "./components/CreateDevForm";
import { Paper } from "@material-ui/core";
import ListDev from "./components/DevItem/ListDev";
import { api } from "./services/api";

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

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data.devs);
    }
    loadDevs();
  }, []);
  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }
  return (
    <AppWrapper>
      <AsideStyled>
        <CreateDevForm onSubmit={handleAddDev} />
      </AsideStyled>
      <MainStyled>
        {devs.map(dev => (
          <ListDev
            key={dev.name}
            name={dev.name}
            avatar={dev.avatar_url}
            techs={dev.techs.join(", ")}
            bio={dev.bio}
            perfil={`https://github.com/${dev.github_username}`}
          />
        ))}
      </MainStyled>
    </AppWrapper>
  );
}

export default App;
