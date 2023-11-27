import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";

const PageNav = () => {
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default PageNav;
