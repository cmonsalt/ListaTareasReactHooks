import React, { useState, useEffect } from "react";

const InitialFormValues = {
  title: "",
  description: "",
};

const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {
  const [formValues, setFormValues] = useState(InitialFormValues);
  const { title, description } = formValues;
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (todoEdit) {
      setFormValues(todoEdit);
    } else {
      setFormValues(InitialFormValues);
    }
  }, [todoEdit]);

  const handleInputChange = (e) => {
    const changedFormValues = {
      ...formValues,
      [e.target.name]: e.target.value,
    };
    setFormValues(changedFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Debes indicar un titulo");
      return;
    }
    if (description.trim() === "") {
      setError("Debes indicar una descripción");
      return;
    }

    if (todoEdit) {
      todoUpdate(formValues);
      setSuccessMessage("Actualizado con exito");
    } else {
      todoAdd(formValues);
      setSuccessMessage("Agregado con exito");
      setFormValues(InitialFormValues);
    }

    setInterval(() => setSuccessMessage(null), 2000);
    setError(null);
  };

  return (
    <div>
      <h2 className="display-4 text-center">
        {todoEdit ? "Editar Tarea" : "Nueva Tarea"}
      </h2>
      {todoEdit ? (
        <button
          className="btn btn-sm btn-warning mb-2 "
          onClick={() => setTodoEdit(null)}
        >
          Cancelar Edición
        </button>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          className="form-control"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Descripción"
          className="form-control mt-2"
          value={description}
          name="description"
          onChange={handleInputChange}
        ></textarea>
        <button className="btn btn-primary btn-block mt-2 ">
          {todoEdit ? "Actualizar Tarea" : "Agregar Tarea"}
        </button>
      </form>
      {error ? <div className="alert alert-danger mt-2">{error}</div> : null}
      {successMessage ? (
        <div className="alert alert-success mt-2">{successMessage}</div>
      ) : null}
    </div>
  );
};

export default TodoForm;
