/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Form({ onAddItems }) {
	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;
		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		setDescription("");
		setQuantity(1);
		onAddItems(newItem);
		console.log(newItem);
	}

	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need to do?</h3>
			<select
				value={quantity}
				onChange={(e) => {
					// console.log(e.target.value);
					setQuantity(Number(e.target.value));
				}}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => {
					console.log(e.target);
					setDescription(e.target.value);
				}}
			/>
			<button>Add</button>
		</form>
	);
}
