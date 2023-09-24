import React, { useState } from "react";

let initialTarea = {
	label: "",
	done: false
}

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState(initialTarea)
	const [tareaLista, setTareaLista] = useState([])
	const [error, setError] = useState(false)


	const handleChange = (event) => {
		setTarea({
			label: event.target.value,
			done: false
		})
	}


	const handleSaveTask = (event) => {
		if (event.key === "Enter") {
			if (tarea.label.trim() !== "") {
				setTareaLista([...tareaLista, tarea])
				setTarea(initialTarea)
				setError(false)
			}
			else {
				setError(true)
				console.log("Debes introducir una tarea valida")
			}
		}
	}

	const deleteTask = (id) => {
		let newArr = tareaLista.filter((item, index) => index != id)
		setTareaLista(newArr)

	}


	return (
		<div className="contenedor">
			<h1>Lista de Tareas</h1>
			{error ? <h3 className="errorMessage">Todos los campos son obligatorios</h3> : ""}
			<form onSubmit={(event) => event.preventDefault()}>
				<input className="textArea"
					type="text"
					value={tarea.label}
					placeholder="Escribe una tarea"
					onChange={handleChange}
					onKeyDown={handleSaveTask}
				>
				</input>
			</form>
			<ol>
				{tareaLista.map((item, index) => {
					return <li key={index} onClick={() => deleteTask(index)}>{item.label}</li>

				})}
			</ol>
		</div>
	);
};

export default Home;
