import { Button, Card, Group, Stack, Text, Title } from "@mantine/core";

import AppLogo from "@/components/AppLogo";
import styles from "@/styles/app/welcome.module.css";

const Welcome = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Card className={styles.container__card}>
        <Stack>
          <AppLogo width={100} />
          <Title order={2}>{"Démarrer avec GoBiblio"}</Title>
          <Text>{`
            Créez votre première bibliothèque pour débuter ! Renseignez quelques informations essentielles, 
            et vous pourrez ensuite ajouter vos collections, inviter des collègues, 
            et commencer à gérer vos prêts et réservations en un clin d'œil.
          `}</Text>
          <Group>
            <Button>{"Ajouter une bibliothèque"}</Button>
            <Button variant={"light"}>{"Accéder au tableau de bord"}</Button>
          </Group>
        </Stack>
      </Card>
    </div>
  );
};

export default Welcome;
