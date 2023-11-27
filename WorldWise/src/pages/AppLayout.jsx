import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

function AppLayout() {
	return (
		<div className={styles.app}>
			<h1>App</h1>
			<AppNav />
		</div>
	);
}

export default AppLayout;
