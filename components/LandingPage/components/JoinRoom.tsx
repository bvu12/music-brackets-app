import { useContext } from "react";
import { Button, TextInput, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SocketContext } from "../../SocketContext/socket";

export const JoinRoom = () => {
  const socket = useContext(SocketContext);

  const onJoinClick = (joinCode: string) => {
    socket.emit("join_room", joinCode);
  };

  // Form
  const form = useForm({
    initialValues: { joinCode: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      joinCode: (value) =>
        value.length != 5
          ? "Your code should have exactly 5 characters!"
          : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onJoinClick(values.joinCode))}>
      <TextInput
        label="Enter your join code!"
        placeholder="XXXXX"
        {...form.getInputProps("joinCode")}
      />
      <Center>
        <Button type="submit" mt="sm" size="xl">
          Join room
        </Button>
      </Center>
    </form>
  );
};
