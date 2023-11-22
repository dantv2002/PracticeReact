//`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`

import { useEffect, useState } from "react";

export default function CurrencyConverter() {
	const [amount, setAmount] = useState(0);
	const [fromCur, setFromCur] = useState("USD");
	const [toCur, setToCur] = useState("USD");
	const [result, setResult] = useState("0");
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const convert = async () => {
			setIsLoading(true);
			const res = await fetch(
				`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
			);
			const data = await res.json();
			setResult(data.rates[toCur]);
			setIsLoading(false);
		};
		if (fromCur === toCur) {
			setResult(amount);
			return;
		}
		if (amount === 0) {
			setResult("0");
			return;
		}
		convert();
	}, [amount, fromCur, toCur]);
	return (
		<div>
			<input
				type="text"
				value={amount}
				onChange={(e) => setAmount(Number(e.target.value))}
				disabled={isLoading}
			/>
			<select
				value={fromCur}
				onChange={(e) => setFromCur(e.target.value)}
				disabled={isLoading}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select
				value={toCur}
				onChange={(e) => setToCur(e.target.value)}
				disabled={isLoading}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<p>
				{result} {toCur}
			</p>
		</div>
	);
}
