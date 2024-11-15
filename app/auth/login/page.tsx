"use client";

import { Button, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useState } from "react";

import apiClient from "@/utils/apiClient";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (values: Record<string, string>) => {
    setIsSubmitting(true);
    apiClient
      .post("/auth/login", values)
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

          case "INVALID_CREDENTIALS":
            form.setFieldError("email", "L'adresse e-mail et/ou le mot de passe est incorrect");
            break;

          default:
            notifications.show({
              title: "Une erreur s'est produite lors de la connexion",
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
      <Title order={2}>{"Connectez-vous à votre compte"}</Title>
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
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
          <Button type={"submit"} loading={isSubmitting}>
            {"Connexion"}
          </Button>
          <Text ta={"center"}>
            {"Vous découvrez GoBiblio ? "} <Link href={"/auth/register"}>{"Créez un compte"}</Link>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
};

export default AuthLogin;
