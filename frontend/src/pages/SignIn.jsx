import {
  Avatar,
  Button,
  Image,
  Input,
  Label,
  Title1,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Password16Regular, Person16Regular } from "@fluentui/react-icons";
import { useId } from "react";

const imgUrl = new URL('../assets/558866.jpg', import.meta.url).href
const useStyles = makeStyles({
  mainContainer: {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "> .background": {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        backdropFilter: "blur(4rem)"
    },
    "> div": {
      position: "absolute",
      display: "flex",
      overflowY: "auto",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      backgroundColor: tokens.colorNeutralBackground3,
      "@media (min-width: 1024px)": {
        width: "30%",
        height: "auto",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      },
    },
    "> div > .contentContainer": {
      display: "grid",
      width: "100%",
      height: "100%",
      marginTop: "20px",
      marginBottom: "20px",
      marginLeft: "20px",
      marginRight: "20px",
    },
    "> div > .contentContainer > .titleContainer": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "> div > .contentContainer > .titleContainer > span": {
      marginBottom: "10px",
    },
    "> div > .contentContainer > label": {
      marginTop: "20px",
      marginBottom: "10px",
    },
    "> div > .contentContainer > div > a": {
      width: "100%",
      marginTop: "30px",
    },
  },
});

export default function SignIn() {
  const styles = useStyles();
  const userId = useId("user-field");
  const passwordId = useId("password-field");
  return (
    <main className={styles.mainContainer}>
    <section className="background">
    </section>
      <div>
      <section className="contentContainer">
        <div className="titleContainer">
          <Avatar as="span" size={120} />
          <Title1>Iniciar Sesión</Title1>
        </div>
        <Label size="large" as="label" htmlFor={userId}>
          Usuario
        </Label>
        <Input
          as="input"
          contentBefore={<Person16Regular />}
          size="large"
          id={userId}
          placeholder="Nombre de usuario..."
        />
        <Label size="large" as="label" htmlFor={passwordId}>
          Contraseña
        </Label>
        <Input
          as="input"
          contentBefore={<Password16Regular />}
          size="large"
          id={passwordId}
          placeholder="Contraseña..."
        />
        <div className="button-container">
          <Button as="a" href="/dashboard" appearance="primary" size="large">
            Aceptar
          </Button>
        </div>
      </section>
      </div>
    </main>
  );
}
