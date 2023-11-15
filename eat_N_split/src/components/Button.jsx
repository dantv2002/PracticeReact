/* eslint-disable react/prop-types */
export default function Button({ children, onClick }) {
	return (
		<div>
			<button className="button" onClick={onClick}>
				{children}
			</button>
		</div>
	);
}
