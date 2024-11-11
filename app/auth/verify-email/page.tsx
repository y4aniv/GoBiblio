import { Button, Stack, Text, Title } from "@mantine/core";

const AuthVerifyEmail = (): React.ReactElement => {
  return (
    <Stack>
      <Title order={2}>{"Vérifier votre adresse e-mail"}</Title>
      <Text>
        {"Consultez la boîte de réception de bruno.cordier@example.com pour vérifier votre compte et démarrer."}
      </Text>
      <Button>{"Renvoyer l'e-mail"}</Button>
    </Stack>
  );
};

export default AuthVerifyEmail;
