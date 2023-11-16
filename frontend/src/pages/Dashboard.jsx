import { makeStyles } from "@fluentui/react-components";
import OptionBar from "../components/OptionBar";
import Table from "../components/Table";

const useStyles = makeStyles({
  mainContainer:{
    height: "100%",
  }
})

export default function Dashboard() {
  const styles = useStyles();
  return (
    <main className={styles.mainContainer}>
      <OptionBar />
        <Table />
    </main>
  );
}
