import socketio from "socket.io";
import { ParseStrinAsArray } from "./utils/PaserStringAsArray";
import calculateDistance from "./utils/CalculeteDistante";

const connections: {
  id: string;
  coordinates: { longitude: number; latitude: number };
  techs: string[];
}[] = [];

let io: any;
export const setupWebsockt = (server: any) => {
  io = socketio(server);

  io.on(
    "connection",
    (socket: {
      id: any;
      handshake: { query: { latitude: any; longitude: any; techs: any } };
    }) => {
      const { latitude, longitude, techs } = socket.handshake.query;

      connections.push({
        id: socket.id,
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        techs: ParseStrinAsArray(techs),
      });
    }
  );
};

export const findConnections = (
  coordinates: { latitude: number; longitude: number },
  techs: string[]
) => {
  return connections.filter((connection) => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some((item) => techs.includes(item))
    );
  });
};

export const sendMessage = (to: any[], message: any, data: any) => {
  to.forEach((connection) => {
    io.to(connection.id).emmit(message, data);
  });
};
