"use client";

import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import apiClient from "@/utils/apiClient";

const AuthVerifyEmail = (): React.ReactElement => {
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    apiClient
      .get("/auth/me")
      .then((response) => {
        setEmail(response.data.data.email);
      })
      .catch(() => {});
  }, []);
  return (
    <Stack>
      <Title order={2}>{"Vérifier votre adresse e-mail"}</Title>
      <Text>{`Consultez la boîte de réception de ${email} pour vérifier votre compte et démarrer.`}</Text>
      <Group>
        <Button>{"Renvoyer l'e-mail"}</Button>
      </Group>
    </Stack>
  );
};

export default AuthVerifyEmail;
