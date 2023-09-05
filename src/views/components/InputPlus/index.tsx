import React, { useCallback } from "react";

import s from "./index.module.scss";

interface InputPlusProps {
	onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
	const [inputValue, setInputValue] = React.useState("");
	const addTask = useCallback(() => {
		onAdd(inputValue);
		setInputValue("");
	}, [inputValue]);
	return (
		<div className={s.inputPlus}>
			<input
				type="text"
				className={s.inputPlusValue}
				value={inputValue}
				onChange={(evt) => {
					setInputValue(evt.target.value);
				}}
				placeholder="Enter text..."
			/>
			{inputValue ? (
				<button
					onClick={addTask}
					aria-label="Add"
					className={s.inputPlusButton}
					onKeyDown={(evt) => {
						if (evt.key === "Enter") {
							addTask();
						}
					}}
				/>
			) : (
				<button
					disabled
					onClick={addTask}
					aria-label="Add"
					className={s.inputPlusButtonOff}
					onKeyDown={(evt) => {
						if (evt.key === "Enter") {
							addTask();
						}
					}}
				/>
			)}
		</div>
	);
};
