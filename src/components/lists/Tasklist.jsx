// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { addTask, getTasks, updateTask } from "../../firebase/tasksController";
import useList from "../../hooks/useList";

/**
 * Componente que gestiona la lista de tareas
 * v2: la nueva tarea se añade para ver si está completada
 * @returns {React.component}
 */

const Tasklist = ({ showSettings, setShowSettings }) => {
  const tasks = useList([]);
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  /**
   * Añade una nueva tarea a la lista
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask === "") return;
    // Vamos a añadir una nueva tarea a la base de datos
    // Cuando se haya añadido la mostraremos dentro del estado tasklist
    const task = { task: newTask, completed: false };
    addTask(task)
      .then(() => {
        return setTaskList([...taskList, task]);
      })
      .finally(() => {
        setNewTask("");
      });

    /* event.preventDefault();
    tasks.push(newTask);
    setNewTask(""); */
    return true;
  };

  /**
   * Función para chequear si la lista de tareas está vacía
   * @returns true si taskList.length === 0;
   */
  const isTaskEmpty = () => tasks.length === 0;

  /**
   * Editar el nombre de la nueva tarea
   * @param {*} e - Evento de onchange proveniente de React
   */
  const editeNewItem = (e) => setNewTask(e.target.value);

  /**
   * Función para eliminar de una tarea en concreto
   * @param {*} index -- Indice de la tarea a eliminar
   */
  const removeItem = (index) => {
    tasks.remove(index);
  };

  const getTasksAll = () => {
    getTasks().then((tasks) => setTaskList([...tasks]));
  };

  /**
   * Cambia al estado de la tarea segun la posicion
   * @param {*} index Posicion de la tarea
   */
  const changeItem = (index) => {
    // tasks.change(index);
    const task = taskList.find((t) => t.id === index);
    updateTask(task).then(() => {
      getTasksAll();
    });
  };

  /**
   * Función para cambiar el estado del NewTak con lo que digites
   * @param {*} event Valor del input
   */
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    getTasksAll();
  }, []);

  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-3xl text-sky-700 font-semibold dark:text-sky-300">
          Task List v2 - Hosted on: Firebase
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          {!showSettings ? "Show Settings" : "Hidde Settings"}
        </motion.button>
      </header>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onKeyDown={(e) => e.key === "Enter" && handleSubmit}
          className="shadow py-1 px-2 rounded-lg outline-none hover:bg-sky-200 transition-all duration-300 focus:ring-2 mr-2 dark:bg-slate-700"
          onChange={handleInputChange}
          value={newTask}
          placeholder="New Task"
          type="text"
        />
        <button className="btn" type="submit">
          Create Task
        </button>
      </form>
      {taskList.length < 1 ? (
        <p>La lista esta vacia</p>
      ) : (
        <div>
          <ul>
            {taskList.map((task, index) => (
              <motion.li
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                key={index}
                style={{ padding: "5px", margin: "5px" }}
                size="sm"
              >
                <button
                  type="button"
                  variant="danger"
                  onClick={() => changeItem(task.id)}
                >
                  X
                </button>
                <span
                  className={`ml-2 text-gray-800 text-sm italic dark:text-gray-100 ${
                    task.completed && "line-through"
                  }`}
                >
                  {task.task}
                </span>
              </motion.li>
            ))}
          </ul>
          <button className="btn m-5" type="button">
            Eliminar
          </button>
          <button className="btn m-5" type="button" onClick={tasks.orden}>
            Ordenar
          </button>
          <button className="btn m-5" type="button" onClick={tasks.invert}>
            Invertir
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasklist;
