"use client";

import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";

import regex from "@/utils/regex";

const AuthForgotPassword = (): React.ReactElement => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => {
        if (value.trim().length === 0) return "Ce champ est requis";
        return value.match(regex.email) ? null : "Adresse e-mail invalide";
      },
    },
  });
  return (
    <Stack>
      <Title order={2}>{"Réinitialisation du mot de passe"}</Title>
      <Text>
        {
          "Saisissez l'adresse e-mail associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe."
        }
      </Text>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <TextInput
            label={"Adresse e-mail"}
            placeholder={"bruno.cordier@example.com"}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button type={"submit"}>{"Continuer"}</Button>
        </Stack>
      </form>
      <Text ta={"center"}>
        <Link href={"/auth/login"}>{"Revenir à la page de connexion"}</Link>
      </Text>
    </Stack>
  );
};

export default AuthForgotPassword;
