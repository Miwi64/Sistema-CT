import { makeStyles } from "@fluentui/react-components";
import NavBar from "../components/NavBar";
import Table from "../components/Table";

const useStyles = makeStyles({
  mainContainer:{
    height: "100vh"
  }
})

export default function Dashboard() {
  const styles = useStyles();
  return (
    <main className={styles.mainContainer}>
      <NavBar />
      <Table />
    </main>
  );
}
