import { useState, useEffect, useContext } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SocketContext } from "../../SocketContext/socket";
SocketContext;

interface RenameUserProps {
  username: string;
}

export const RenameUser = ({ username }: RenameUserProps) => {
  const socket = useContext(SocketContext);

  // Modal
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      username: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const _renameUser = (newUsername: string) => {
    socket.emit("set_username", newUsername);
    setOpened(false);
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            _renameUser(values.username);
          })}
        >
          <TextInput
            withAsterisk
            label="Enter your username!"
            placeholder="Username"
            data-autoFocus
            {...form.getInputProps("username")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <h2 key="playerSocketId"> {username} </h2>
    </div>
  );
};
