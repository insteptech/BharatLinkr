import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPage from "./admin";
import HomeLayout from "../components/homeLayout";
import { getRole } from "../components/utils";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Home({ children }) {
  return (
    <div className={styles.container}>

      {getRole() !== "admin" ? <HomeLayout /> : null}

      {/* <HomeLayout /> */}
      {/* <AdminPage children={children} /> */}
    </div>
  );
}
