"use client";

import { Button, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";

import regex from "@/utils/regex";

const AuthRegister = (): React.ReactElement => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate: {
      firstName: (value) => (value.trim().length > 0 ? null : "Ce champ est requis"),
      lastName: (value) => (value.trim().length > 0 ? null : "Ce champ est requis"),
      email: (value) => {
        if (value.trim().length === 0) return "Ce champ est requis";
        return value.match(regex.email) ? null : "Adresse e-mail invalide";
      },
      password: (value) => {
        if (value.trim().length === 0) return "Ce champ est requis";
        return value.match(regex.password)
          ? null
          : "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial";
      },
    },
  });

  return (
    <Stack>
      <Title order={2}>Créez votre compte GoBiblio</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <Group grow>
            <TextInput
              label="Prénom"
              placeholder={"Bruno"}
              key={form.key("firstName")}
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Nom"
              placeholder={"CORDIER"}
              key={form.key("lastName")}
              {...form.getInputProps("lastName")}
            />
          </Group>
          <TextInput
            label="Adresse e-mail"
            placeholder={"bruno.cordier@example.com"}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder={"••••••••••••••"}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit">{"Créer un compte"}</Button>
        </Stack>
      </form>
      <Text ta={"center"}>
        {"Vous avez déja un compte ? "} <Link href="/auth/login">{"Connectez-vous"}</Link>
      </Text>
    </Stack>
  );
};

export default AuthRegister;
