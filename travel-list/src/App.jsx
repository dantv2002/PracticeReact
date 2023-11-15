import Logo from "./components/Logo";
import Form from "./components/Form";
import PackageList from "./components/PackageList";
import Stats from "./components/Stats";
import { useState } from "react";

function App() {
	const [items, setItems] = useState([]);

	const handleAddItems = (item) => {
		setItems((items) => [...items, item]);
	};

	const handleDeleteItem = (id) => {
		setItems((items) => items.filter((item) => item.id !== id));
	};

	const handleToggleItem = (id) => {
		setItems((items) =>
			items.map((item) => {
				return item.id !== id
					? item
					: { ...item, packed: !item.packed };
			})
		);
	};

	const handleClearList = () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete all items?"
		);

		if (confirmed) setItems([]);
	};

	// const initialItems = [
	// 	{ id: 1, description: "First", quantity: 2, packed: false },
	// 	{ id: 2, description: "Second", quantity: 12, packed: true },
	// 	{ id: 3, description: "Third", quantity: 1, packed: false },
	// ];

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackageList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
				onClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}

export default App;
