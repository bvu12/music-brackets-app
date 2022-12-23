import { Center, Text, Button } from "@mantine/core";
import { useContext } from "react";
import { SocketContext } from "../../SocketContext/socket";

interface StartGameProps {
  disabled: boolean;
}

export const StartGame = ({ disabled }: StartGameProps) => {
  const socket = useContext(SocketContext);

  const onStartGameClick = () => {
    alert("TODO: implement me!");
  };

  return (
    <Center>
      <Button
        disabled={disabled}
        size="xl"
        uppercase
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
      >
        Start Game
      </Button>
    </Center>
  );
};
