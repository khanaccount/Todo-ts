import React, { useEffect } from "react";

import s from "./index.module.scss";

interface InputTaskProps {
	id: string;
	title: string;
	onDone: (id: string) => void;
	onEdited: (id: string, title: string) => void;
	onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onRemoved, onEdited }) => {
	const [checked, setChecked] = React.useState(false);
	const [isEditMode, setIsEditMode] = React.useState(false);
	const [value, setValue] = React.useState(title);
	const editTitleInputRef = React.useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditMode) {
			editTitleInputRef?.current?.focus();
		}
	}, [isEditMode]);

	return (
		<div className={s.inputTask}>
			<label className={s.inputTaskLabel}>
				<input
					type="checkbox"
					checked={checked}
					disabled={isEditMode}
					className={s.inputTaskCheckbox}
					onChange={(evt) => {
						setChecked(evt.target.checked);
						if (evt.target.checked) {
							setTimeout(() => {
								onDone(id);
							}, 300);
						}
					}}
				/>
				{isEditMode ? (
					<input
						className={s.inputTaskEditTitle}
						value={value}
						ref={editTitleInputRef}
						onChange={(evt) => {
							setValue(evt.target.value);
						}}
						onKeyDown={(evt) => {
							if (evt.key === "Enter") {
								onEdited(id, value);
								setIsEditMode(false);
							}
						}}
					/>
				) : (
					<h3 className={s.inputTaskTitle}>{title}</h3>
				)}
			</label>
			{isEditMode ? (
				<button
					aria-label="Save"
					className={s.inputTaskSave}
					onClick={() => {
						onEdited(id, value);
						setIsEditMode(false);
					}}
				/>
			) : (
				<button
					aria-label="Edit"
					className={s.inputTaskEdit}
					onClick={() => {
						setIsEditMode(true);
					}}
				/>
			)}

			<button
				aria-label="Remove"
				className={s.inputTaskRemove}
				onClick={() => {
					if (confirm("Are you sure ?")) {
						onRemoved(id);
					}
				}}
			/>
		</div>
	);
};
