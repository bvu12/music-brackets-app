import { Text, UnstyledButton } from "@mantine/core";
import { useContext } from "react";
import { SocketContext } from "../../SocketContext/socket";

interface StartGameProps {
  isRoomOwner: boolean;
}

export const StartGame = ({ isRoomOwner }: StartGameProps) => {
  const socket = useContext(SocketContext);

  const onStartGameClick = () => {
    alert("TODO: implement me!");
  };

  return (
    <UnstyledButton bg="yellow" onClick={() => onStartGameClick()} p="sm">
      <div>
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{
            fontFamily: "Greycliff CF, sans-serif",
          }}
          ta="center"
          fz="xl"
          fw={700}
        >
          START
        </Text>
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{
            fontFamily: "Greycliff CF, sans-serif",
          }}
          ta="center"
          fz="xl"
          fw={700}
        >
          GAME
        </Text>
      </div>
    </UnstyledButton>
  );
};