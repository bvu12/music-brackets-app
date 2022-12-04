import { Card, Center, Text } from "@mantine/core";

interface LobbyCodeProps {
  code: string;
}

export const LobbyCode = ({ code }: LobbyCodeProps) => {
  return (
    <Center>
      <Card radius="lg" mt="5%">
        <Text fz={32} fw={500}>
          Lobby Code:
        </Text>
        <Text fz={40} c="yellow" fw={700}>
          <Center>{code}</Center>
        </Text>
      </Card>
    </Center>
  );
};
