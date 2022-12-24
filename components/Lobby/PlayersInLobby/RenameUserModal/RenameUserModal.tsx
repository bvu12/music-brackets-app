import { useContext, Dispatch } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SocketContext } from "../../../SocketContext/socket";

interface RenameUserProps {
  opened: boolean;
  setOpened: Dispatch<boolean>;
}

export const RenameUserModal = ({ opened, setOpened }: RenameUserProps) => {
  const socket = useContext(SocketContext);

  // Modal
  const form = useForm({
    initialValues: {
      username: "",
    },

    validate: {
      username: (value) =>
        value.length > 10 || value.length < 3
          ? "Username must be between 3 and 10 characters"
          : null,
    },
  });

  // Actions
  const _renameUser = (newUsername: string) => {
    socket.emit("set_username", newUsername);
    setOpened(false);
  };

  return (
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
  );
};
