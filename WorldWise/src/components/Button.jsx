import styles from "./Button.module.css";

const Button = ({ children, onCLick, type }) => {
	return (
		<button onClick={onCLick} className={`${styles.btn} ${styles[type]}`}>
			{children}
		</button>
	);
};

export default Button;
