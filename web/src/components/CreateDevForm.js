import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

export const FormContainer = styled.form`
  display: grid;
  gap: 10px;
  align-items: center;
  margin-top: 15px;
  width: 100%;
  font-family: Roboto;
`;

export default function CreateDevForm({ onSubmit }) {
  const [github_username, setGithub_username] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  async function onSubmitForm(event) {
    event.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });
    setGithub_username("");
    setTechs("");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log("erro", err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  return (
    <>
      <strong>Cadastrar</strong>
      <FormContainer onSubmit={onSubmitForm}>
        <TextField
          onChange={(e) => setGithub_username(e.target.value)}
          name={"github_username"}
          value={github_username}
          size={"small"}
          label="Usuário do Github"
          variant="outlined"
          type={"text"}
          color={"primary"}
        />
        <TextField
          onChange={(e) => setTechs(e.target.value)}
          name={"techs"}
          value={techs}
          size={"small"}
          label="Tecnologias"
          variant="outlined"
          type={"text"}
        />
        <TextField
          onChange={(e) => setLatitude(e.target.value)}
          name={"latitude"}
          value={latitude}
          size={"small"}
          label="Latitude"
          variant="outlined"
          type={"text"}
        />
        <TextField
          onChange={(e) => setLongitude(e.target.value)}
          name={"longitude"}
          value={longitude}
          size={"small"}
          label="Longitude"
          variant="outlined"
          type={"text"}
        />
        <Button type={"submit"} color={"primary"} variant="contained">
          Salvar Dev
        </Button>
      </FormContainer>
    </>
  );
}
