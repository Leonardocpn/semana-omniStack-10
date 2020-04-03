import socketio from "socket.io-client";

const socket = socketio("http://192.168.15.13:3321", {
  autoConnect: false
});

export function subscribeToNewDev(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

export function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };
  socket.connect();
}

export function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}
