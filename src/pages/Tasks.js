import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // create task
  const createTask = async () => {
    try {
      await API.post("/tasks/create", {
        title,
        assignedTo: "PUT_USER_ID",
        projectId: "PUT_PROJECT_ID"
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Create */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Create</button>

      <hr />

      {/* List */}
      {tasks.map((task) => (
        <div key={task._id}>
          <p>{task.title} - {task.status}</p>

          <button onClick={() => updateStatus(task._id, "pending")}>
            Pending
          </button>
          <button onClick={() => updateStatus(task._id, "in-progress")}>
            In Progress
          </button>
          <button onClick={() => updateStatus(task._id, "done")}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;