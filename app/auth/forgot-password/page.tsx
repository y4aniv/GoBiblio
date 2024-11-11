"use client";

import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";

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
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [secondEmailSent, setSecondEmailSent] = useState<boolean>(false);
  return (
    <Stack>
      {emailSent ? (
        <>
          <Title order={2}>{"Consultez votre messagerie"}</Title>
          {secondEmailSent ? (
            <>
              <Text>
                {`Nous vous avons envoyé de nouvelles instructions pour réinitialiser votre mot de passe à l'adresse e-mail ${form.values.email}, 
                si celle-ci est associée à un compte.`}
              </Text>
              <Text>
                {`Veuillez consulter votre messagerie. Si vous ne recevez toujours aucun e-mail de notre part, `}
                <Text
                  span
                  td={"underline"}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSecondEmailSent(false);
                    setEmailSent(false);
                  }}
                >
                  {"réessayez avec une autre adresse e-mail"}
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Text>
                {`Merci ! Si l'adresse e-mail ${form.values.email} est associée à un compte, 
            vous recevrez un e-mail contenant des instructions pour réinitialiser votre mot de passe.`}
              </Text>
              <Text>
                {`Si vous n'avez pas reçu d'e-mail d'ici 5 minutes, vérifiez votre dossier de courriers indésirables, 
            demandez un `}
                <Text span td={"underline"} style={{ cursor: "pointer" }} onClick={() => setSecondEmailSent(true)}>
                  {"nouvel envoi"}
                </Text>
                {" ou "}
                <Text span td={"underline"} style={{ cursor: "pointer" }} onClick={() => setEmailSent(false)}>
                  {"réessayez avec une autre adresse e-mail"}
                </Text>
                {"."}
              </Text>
            </>
          )}
        </>
      ) : (
        <>
          <Title order={2}>{"Réinitialisation du mot de passe"}</Title>
          <Text>
            {
              "Saisissez l'adresse e-mail associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe."
            }
          </Text>
          <form onSubmit={form.onSubmit(() => setEmailSent(true))}>
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
        </>
      )}
    </Stack>
  );
};

export default AuthForgotPassword;
