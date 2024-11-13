"use client";

import { Button, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";

import regex from "@/utils/regex";

const AuthLogin = (): React.ReactElement => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (value.trim().length === 0) return "Ce champ est requis";
        return value.match(regex.email) ? null : "Adresse e-mail invalide";
      },
      password: (value) => {
        if (value.trim().length === 0) return "Ce champ est requis";
      },
    },
  });
  return (
    <Stack>
      <Title order={2}>{"Connectez-vous à votre compte"}</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <TextInput
            label={"Adresse e-mail"}
            placeholder={"bruno.cordier@example.com"}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label={"Mot de passe"}
            placeholder={"•••••••••••••"}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Text ta={"right"}>
            <Link href={`/auth/forgot-password${form.values.email ? "?email=" + form.values.email : ""}`}>
              {"Mot de passe oublié ?"}
            </Link>
          </Text>
          <Button type={"submit"}>{"Connexion"}</Button>
          <Text ta={"center"}>
            {"Vous découvrez GoBiblio ? "} <Link href={"/auth/register"}>{"Créez un compte"}</Link>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
};

export default AuthLogin;
