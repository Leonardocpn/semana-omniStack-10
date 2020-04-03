import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";

export default function ListDev(props) {
  const { name, avatar, techs, bio, perfil } = props;
  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={name} src={avatar} />}
        title={name}
        subheader={techs}
      />
      <CardContent>
        <Typography color="textSecondary" component="p">
          {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" href={perfil}>
          Acessar perfil no Github
        </Button>
      </CardActions>
    </Card>
  );
}
