import { Button, Group, Stack, Text, Title } from "@mantine/core";

const AuthVerifyEmail = (): React.ReactElement => {
  return (
    <Stack>
      <Title order={2}>{"Vérifier votre adresse e-mail"}</Title>
      <Text>
        {"Consultez la boîte de réception de bruno.cordier@example.com pour vérifier votre compte et démarrer."}
      </Text>
      <Group>
        <Button>{"Renvoyer l'e-mail"}</Button>
      </Group>
    </Stack>
  );
};

export default AuthVerifyEmail;
