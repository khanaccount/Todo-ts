import React from "react";

import { useToDoStore } from "../../data/stores/useToDoStore";
import { InputPlus } from "../components/InputPlus";

import s from "./index.module.scss";
import { InputTask } from "../components/InputTask";

export const App: React.FC = () => {
	const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
		state.tasks,
		state.createTask,
		state.updateTask,
		state.removeTask
	]);
	return (
		<article className={s.article}>
			<h1 className={s.articleTitle}>To Do App</h1>
			<section className={s.articleSection}>
				<InputPlus
					onAdd={(title) => {
						createTask(title);
					}}
				/>
			</section>
			<section className={s.articleSection}>
				{!tasks.length && <p className={s.articleText}> No task.</p>}
				{tasks.map((task) => (
					<InputTask
						key={task.id}
						id={task.id}
						title={task.title}
						onDone={removeTask}
						onEdited={updateTask}
						onRemoved={removeTask}
					/>
				))}
			</section>
		</article>
	);
};
