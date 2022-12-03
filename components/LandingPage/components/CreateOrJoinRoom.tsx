import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext/socket";

export const CreateOrJoinRoom = () => {
  // Socket
  const socket = useContext(SocketContext);

  // States
  const [desiredRoomString, setDesiredRoomString] = useState("");

  // User actions
  const onCreateClick = () => {
    socket.emit("create_room");
  };

  const onJoinClick = () => {
    if (desiredRoomString !== "") {
      socket.emit("join_room", desiredRoomString);
    }
  };

  return (
    <div>
      <div>
        <div>Create a room</div>
        <button onClick={onCreateClick}> Create room</button>
      </div>
      <div>
        <input
          placeholder="Enter a room number..."
          onChange={(event) => {
            setDesiredRoomString(event.target.value);
          }}
        />
        <button onClick={onJoinClick}> Join room</button>
      </div>
    </div>
  );
};
