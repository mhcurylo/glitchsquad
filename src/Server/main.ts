export function glitchSquadServer(socket: any) {
  socket['on']("disconnect", function () {
    console.log("Disconnected: " + socket['id']);
  });
  console.log('glitchsquadserver');
  console.log("Connected: " + socket['id']);
};

