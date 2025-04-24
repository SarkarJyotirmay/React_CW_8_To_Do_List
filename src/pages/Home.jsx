import React, { useEffect, useReducer } from "react";

//! reducer state
const initalState = {
  input: "",
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [],
  isEditing: false,
  editId: null,
};
//! reducer logics = handlers
function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        input: action.payload,
      };
      break;
    case "HANDLE_ADD_TASK":
      if (state.isEditing) {
        alert("Task editted successfuly");
        return {
          ...state,
          isEditing: false,
          tasks: state.tasks.map((task) =>
            task.id === state.editId ? { ...task, body: state.input } : task
          ),
          input: "",
        };
      } else {
        alert("Task Added successfully :)");
        return {
          ...state,
          tasks: [
            ...state.tasks,
            { id: Date.now(), body: state.input, done: false },
          ],
          input: "",
        };
      }
      break;
    case "HANDLE_DELETE":
      alert("Task Deleted successfully :)");
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      break;
    case "HANDLE_EDIT":
      return {
        ...state,
        isEditing: true,
        input: action.payload.body,
        editId: action.payload.id,
      };
      break;
    case "HANDLE_CHECK":
        action.payload.done ? "" : alert("Task completed !")
      return {
        ...state,
        tasks : state.tasks.map((task)=> task.id === action.payload.id ? {...task, done: !task.done} : task)
      };
  }
}

// ! Component
function Home() {
  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state]);

  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Enter your task here"
          value={state.input}
          onChange={(e) =>
            dispatch({ type: "SET_INPUT", payload: e.target.value })
          }
        />
        <button onClick={() => dispatch({ type: "HANDLE_ADD_TASK" })}>
          {state.isEditing ? "Edit Task" : "Add Task"}
        </button>
      </div>
      {/* result */}
      <div className="result">
        <ul>
          {state.tasks.map((obj) => {
            return (
              <li key={obj.id}>
                <label htmlFor={obj.id}>{obj.body}</label>
                <span>
                  <input
                    type="checkbox"
                    id={obj.id}
                    checked={obj.done}
                    onChange={() =>
                      dispatch({ type: "HANDLE_CHECK", payload: obj })
                    }
                  />
                </span>
                <div className="actions">
                  <span
                    onClick={() =>
                      dispatch({ type: "HANDLE_EDIT", payload: obj })
                    }
                  >
                    Edit
                  </span>
                  <span
                    onClick={() =>
                      dispatch({ type: "HANDLE_DELETE", payload: obj.id })
                    }
                  >
                    delete
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;

// li => label-task + checkbox + span-edit + span-delete
