import { useState } from "react";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendsList from "./components/FriendsList";

function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	const handleShowAdd = () => {
		setShowAddFriend((show) => !show);
	};

	const handleAddFriend = (friend) => {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend(false);
	};

	const handleSelection = (friend) => {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	};

	const handleSplitBill = (value) => {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);
		setSelectedFriend(null);
	};

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelection={handleSelection}
					selectedFriend={selectedFriend}
				/>
				{showAddFriend && (
					<FormAddFriend
						onAddFriend={handleAddFriend}
					></FormAddFriend>
				)}
				<Button onClick={handleShowAdd}>
					{showAddFriend ? "Close" : "Add friend"}
				</Button>
				{selectedFriend && (
					<FormSplitBill
						selectedFriend={selectedFriend}
						key={selectedFriend.id}
						onSplitBill={handleSplitBill}
					></FormSplitBill>
				)}
			</div>
		</div>
	);
}

export default App;

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];
