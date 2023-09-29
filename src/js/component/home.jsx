import React, { useEffect, useState } from "react";

let initialTarea = {
	label: "",
	done: false
}

let mainUrl = "https://playground.4geeks.com/apis/fake/todos/user/omararcx"

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState(initialTarea)
	const [tareaLista, setTareaLista] = useState([])
	const [error, setError] = useState(false)


	const getTask = async () => {
		try {
			let response = await fetch(mainUrl)
			let data = await response.json()
			if (response.ok) {
				setTareaLista(data)
			}
			if (response.status == 404) {
				createUSer()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = (event) => {
		setTarea({
			label: event.target.value,
			done: false
		})
	}

	const createUSer = async () => {
		try {
			let response = await fetch(mainUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (response.ok) {
				getTask()
			}


		} catch (error) {
			console.log(error)

		}
	}

	const handleSaveTask = async (event) => {
		if (event.key === "Enter") {
			if (tarea.label.trim() !== "") {
				//setTareaLista([...tareaLista, tarea])
				//setTarea(initialTarea)
				//setError(false)
				try {
					let response = await fetch(mainUrl, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify([...tareaLista, tarea])
					})
					if (response.ok) {
						getTask()
						setTarea(initialTarea)
						setError(false)
					}

				} catch (error) {
					console.log(error)

				}
			}
			else {
				setError(true)
				console.log("Debes introducir una tarea valida")
			}
		}
	}

	const deleteTask = async (id) => {
		let newArr = tareaLista.filter((item, index) => index != id)
		try {
			let response = await fetch(mainUrl, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newArr)
			})
			if (response.ok) {
				getTask()
			}

		} catch (error) {
			console.log(error)
		}

	}

	const deleteAll = async () => {
		try {
			let response = await fetch(mainUrl, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
			})
			if (response.ok) {
				getTask()

			}
		} catch (error) {
			console.log(error)
		}

	}

	useEffect(() => { getTask() }, [])

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
			<div className="listas">
				<ol>
					{tareaLista.map((item, index) => {
						return <li key={index} onClick={() => deleteTask(index)}>{item.label} </li>

					})}
				</ol>
			</div>
			<button onClick={() => deleteAll()}>Borrar Todo</button>
		</div >
	);
};

export default Home;
