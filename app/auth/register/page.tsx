"use client";

import { Button, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useState } from "react";

import apiClient from "@/utils/apiClient";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (values: Record<string, string>) => {
    setIsSubmitting(true);
    apiClient
      .post("/auth/register", values)
      .then(() => {
        // TODO: Handle success
      })
      .catch((error) => {
        switch (error.response.data.message) {
          case "MISSING_FIELDS":
            error.response.data.data.forEach((field: string) => {
              form.setFieldError(field, "Ce champ est requis");
            });
            break;

          case "WRONG_DATA_TYPE":
            error.response.data.data.forEach((field: string) => {
              form.setFieldError(field, "Type de données incorrect");
            });
            break;

          case "INVALID_EMAIL":
            form.setFieldError("email", "Adresse e-mail invalide");
            break;

          case "INVALID_PASSWORD":
            form.setFieldError(
              "password",
              "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
            );
            break;

          case "EMAIL_ALREADY_EXISTS":
            form.setFieldError("email", "Cette adresse e-mail est déjà utilisée");
            break;

          default:
            notifications.show({
              title: "Une erreur est survenue lors de la création de votre compte",
              message: `Veuillez réessayer plus tard. (C${error.response.status})`,
              withCloseButton: false,
            });
            break;
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Stack>
      <Title order={2}>{"Créez votre compte GoBiblio"}</Title>
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
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
            placeholder={"•••••••••••••"}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" loading={isSubmitting}>
            {"Créer un compte"}
          </Button>
        </Stack>
      </form>
      <Text ta={"center"}>
        {"Vous avez déja un compte ? "} <Link href="/auth/login">{"Connectez-vous"}</Link>
      </Text>
    </Stack>
  );
};

export default AuthRegister;
