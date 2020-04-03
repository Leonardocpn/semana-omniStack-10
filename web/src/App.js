import React, { useEffect, useState } from "react";
import CreateDevForm from "./components/CreateDevForm";
import ListDev from "./components/DevItem/ListDev";
import { api } from "./services/api";
import { AppWrapper, AsideStyled, MainStyled } from "./styles";

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
        {devs.map((dev) => (
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
