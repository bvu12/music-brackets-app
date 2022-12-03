import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext/socket";

import {
  Card,
  Divider,
  SegmentedControl,
  Group,
  Center,
  Box,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSun, IconMoon } from "@tabler/icons";
import { JoinRoom } from "./JoinRoom";

export const CreateOrJoinRoom = () => {
  // Socket
  const socket = useContext(SocketContext);

  // States
  const [isCreate, setIsCreate] = useState(true);

  // User actions
  const onCreateClick = () => {
    socket.emit("create_room");
  };

  return (
    <Center my="xl">
      <Card withBorder radius="md" style={{ width: "25%" }}>
        <Group position="center" mt="md">
          <SegmentedControl
            size="xl"
            onChange={(value: "create" | "join") =>
              setIsCreate(value == "create" ? true : false)
            }
            data={[
              {
                value: "create",
                label: (
                  <Center>
                    <IconSun size={16} stroke={1.5} />
                    <Box ml={10}>Create a new room</Box>
                  </Center>
                ),
              },
              {
                value: "join",
                label: (
                  <Center>
                    <IconMoon size={16} stroke={1.5} />
                    <Box ml={10}>Join an existing Room</Box>
                  </Center>
                ),
              },
            ]}
          />
        </Group>
        <Divider size={4} my="md" />
        <Center>
          {isCreate ? (
            <Button onClick={onCreateClick} size="xl">
              {" "}
              Create room
            </Button>
          ) : (
            <JoinRoom />
          )}
        </Center>
      </Card>
    </Center>
  );
};
