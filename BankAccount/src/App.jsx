import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
	const fullName = useSelector((state) => state.customer.fullName);
	return (
		<div>
			{fullName === "" ? (
				<CreateCustomer />
			) : (
				<div>
					<Customer />
					<AccountOperations />
					<BalanceDisplay />
				</div>
			)}
		</div>
	);
}

export default App;
