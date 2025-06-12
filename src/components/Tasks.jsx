import { X, Plus, Search, Check, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Tasks({ isLightTheme, setTask, tasks }) {


  
  const [filter, setFilter] = useState("all");
  const [isTaskModal, setTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [search , setSearch] = useState("")
  const [showButtons , setShowButtons] = useState(false)

  // Keyboard listener for Enter key when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleAddTask(title, desc, category, priority);
      }
    };
    if (isTaskModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTaskModal, title, desc, category, priority]);

  // Filter tasks based on status
  const handleFilter = (fltr, taskList = tasks) => {
    setFilter(fltr);
    if (fltr === "all") {
      setVisibleTasks(taskList);
    } else {
      setVisibleTasks(taskList.filter((t) => t.status === fltr));
    }
  };

  // Reset form fields and close modal
  const resetForm = () => {
    setTitle("");
    setDesc("");
    setCategory("");
    setPriority("");
    setEditing(false);
    setEditTaskId(null);
    setTaskModal(false);
  };

  // Add or edit task
  const handleAddTask = (title, desc, category, priority) => {
    if (!title.trim() || !priority.trim() || !category.trim()) return;

    if (!isEditing) {
      // Add new task
      const task = {
        title,
        description: desc,
        category,
        priority,
        id: Date.now(),
        status: "pending",
      };
      const updatedTasks = [...tasks, task];
      setTask(updatedTasks);
      handleFilter(filter, updatedTasks);
    } else {
      // Edit existing task
      const updatedTasks = tasks.map((t) =>
        t.id === editTaskId
          ? { ...t, title, description: desc, category, priority }
          : t
      );
      setTask(updatedTasks);
      handleFilter(filter, updatedTasks);
    }

    resetForm(); // Always reset form after add/edit
  };

  // Update visible tasks when tasks change
  useEffect(() => {
    handleFilter(filter, tasks);
  }, [tasks]);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTask(updatedTasks);
    handleFilter(filter, updatedTasks);
  };

  const handleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "completed" } : task
    );
    setTask(updatedTasks);
    handleFilter(filter, updatedTasks);
  };

  const handleEdit = (task) => {
    setEditing(true);
    setEditTaskId(task.id);
    setTitle(task.title);
    setDesc(task.description);
    setCategory(task.category);
    setPriority(task.priority);
    setTaskModal(true);
  };


useEffect(()=>{
 const filteredTasks = tasks.filter(t =>
  t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
 )
 setVisibleTasks(filteredTasks)
},[search,tasks])


  return (



    <div
      className={`flex flex-col gap-5 flex-1 w-full h-full ${isLightTheme ? "text-black" : "text-white"
        } `}
    >

      {/* header */}
      <div
        className={`flex flex-col w-full px-8 py-6 gap-6 ${isLightTheme ? "bg-slate-100" : "bg-black"
          }`}
      >


        {/* Header */}
        <div className="flex w-full justify-between items-start">
          <h2 className="text-3xl font-bold leading-tight">
            Tasks
            <span className="block text-base font-light mt-1">
              Manage your tasks
            </span>
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-br
           from-blue-600 via-cyan-600 to-purple-700 hover:opacity-80 transition"
            onClick={() => setTaskModal(true)}
          >
            <Plus size={18} /> New Task
          </button>
        </div>

        {/* Controls */}
        <div className="flex w-full justify-between items-center flex-wrap gap-4">
          {/* Search input */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks"
              className={`pl-10 pr-4 py-2 w-full rounded-md text-sm bg-transparent border ${isLightTheme ? "border-gray-300" : "border-gray-600"
                } focus:outline-none focus:ring-2 ${isLightTheme ? "focus:ring-blue-400" : "focus:ring-cyan-500"
                }`
              }
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
            />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {["all", "pending", "completed"].map((type) => {
              const isActive = filter === type;
              const baseStyle =
                "px-4 py-1.5 rounded-md text-sm font-medium transition";

              const lightThemeStyle = isActive
                ? "bg-blue-300 text-black"
                : "bg-gray-200 hover:bg-blue-200 text-black";

              const darkThemeStyle = isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-blue-700 text-white";

              return (
                <button
                  key={type}
                  onClick={() => handleFilter(type)}
                  className={`${baseStyle} ${isLightTheme ? lightThemeStyle : darkThemeStyle
                    }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* Add tasks Modal */}
      {isTaskModal && (

        <div className="flex z-50 fixed inset-0 items-center justify-center  ">


          <div
            className=" inset-0 absolute bg-black/30 backdrop-blur-md"
            onClick={() => setTaskModal(false)}
          ></div>

          <motion.div
            initial={{ opacity: 0.2, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.4 }}
            transition={{ duration: 0.4, ease: "circInOut" }}
            className={`md:w-96 relative w-80 z-50 ${isLightTheme ? "bg-white text-black" : "bg-gray-800 text-white/50"
              } gap-6 flex flex-col py-6 px-5 items-center shadow-xl rounded-xl justify-center `}
          >
            <div className="flex justify-between items-center w-full">
              <h2 className="text-cyan-500 text-xl font-bold">Add Task</h2>
              <button
                className="absolute top-3 right-2"
                onClick={() => setTaskModal(false)}
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col w-full gap-3">

              {/* title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className={`${isLightTheme ? "text-gray-600" : "text-gray-300"
                    }`}
                >
                  {" "}
                  Add Title : *{" "}
                </label>
                <input
                  type="text"
                  required={true}
                  placeholder="Title..."
                  className="text-center placeholder:opacity-70 focus:outline-none rounded-md text-black/60 p-1.5 shadow-2xl border border-gray-400 "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>


              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className={`${isLightTheme ? "text-gray-600" : "text-gray-300"
                    }`}
                >
                  {" "}
                  (optional) Add Description :{" "}
                </label>
                <input
                  type="text"
                  placeholder="Description..."
                  className="text-center placeholder:opacity-70 focus:outline-none rounded-md text-black/60 p-1.5 shadow-2xl border border-gray-400 "
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Category"
                  className={`${isLightTheme ? "text-gray-600" : "text-gray-300"
                    }`}
                >
                  {" "}
                  Category : *{" "}
                </label>
                <input
                  type="text"
                  placeholder="Category... Eg : Study , work etc"
                  className="text-center placeholder:opacity-70 focus:outline-none rounded-md text-black/60 p-1.5 shadow-2xl border border-gray-400 "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>



              {/* Priority */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="priority"
                  className={`${isLightTheme
                    ? "text-gray-700 font-medium"
                    : "text-gray-200 font-medium"
                    }`}
                >
                  Select Priority:
                </label>
                <select
                  name="priority"
                  id="priority"
                  className={`
      ${isLightTheme
                      ? "bg-white border-gray-300 text-gray-700 focus:border-blue-500"
                      : "bg-gray-800 border-gray-600 text-gray-200 focus:border-blue-400"
                    }
      border-2 rounded-lg px-4 py-3 text-base
      focus:outline-none focus:ring-2 focus:ring-blue-500/20
      transition-all duration-200 ease-in-out
      hover:border-opacity-80 cursor-pointer
      shadow-sm hover:shadow-md
    ` } value={priority} onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="" disabled className="text-gray-400">
                    Choose priority level
                  </option>
                  <option
                    value="low"
                    className={`${isLightTheme
                      ? "bg-white text-gray-700"
                      : "bg-gray-800 text-gray-200"
                      }`}
                  >
                    🟢 Low Priority
                  </option>
                  <option
                    value="medium"
                    className={`${isLightTheme
                      ? "bg-white text-gray-700"
                      : "bg-gray-800 text-gray-200"
                      }`}
                  >
                    🟡 Medium Priority
                  </option>
                  <option
                    value="high"
                    className={`${isLightTheme
                      ? "bg-white text-gray-700"
                      : "bg-gray-800 text-gray-200"
                      }`}
                  >
                    🔴 High Priority
                  </option>
                </select>
              </div>
              {/* Buttons */}
              <div className="flex items-center justify-center gap-6 ">

                <button className="bg-green-600  rounded-xl shadow-xl text-white px-4 py-2  hover:opacity-80"
                  onClick={() => handleAddTask(title, desc, category, priority)}
                >Save</button>
                <button className="bg-gray-500 rounded-xl shadow-xl text-white px-4 py-2 hover:opacity-80"
                  onClick={() => setTaskModal(false)}>Cancel</button>

              </div>
            </div>
          </motion.div>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 py-2">
        {visibleTasks.length > 0 ?
          visibleTasks.map((task) => (
            <div
              className={`group relative rounded-xl shadow-md p-4 flex flex-col gap-3 border-l-4 
      ${task.priority === "high" ? "border-red-500" : task.priority === "medium" ? "border-yellow-500" : "border-green-500"}
      ${isLightTheme ? "bg-white text-gray-800" : "bg-gray-800 text-white/80"}`}
              key={task.id}
            >
              {/* Title */}
              <h3 className={`text-xl font-semibold ${task.status === "completed" ? "line-through decoration-red-500 decoration-2 italic text-gray-400" : ""}`}>{task.title}</h3>

              {/* Description */}
              {task.description && (
                <p className="text-sm italic text-gray-800 dark:text-gray-400">{task.description}</p>
              )}

              {/* Meta Info */}
              <div className="flex justify-between items-center text-xs text-gray-300">
                <span className="bg-gray-200 dark:bg-gray-700 px-2.5 py-2 rounded-full text-[15px]">
                  {task.category}
                </span>
                <span
                  className={`font-bold uppercase tracking-wide 
        ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Buttons - absolute and hidden by default */}
              <div className={`mt-3 flex gap-3 sm:absolute sm:top-4 sm:right-4 sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto`}>


                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-md bg-green-500   text-white text-sm font-semibold
         hover:bg-green-600 transition ${task.status === "completed" ? "hidden" : ""}`}
                  aria-label="Mark task complete"
                  onClick={() => handleCompletion(task.id)}
                >
                  <Check size={16} />
                  Complete
                </button>

                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                  aria-label="Delete task"
                  onClick={() => handleDelete(task.id)}
                >
                  <X size={16} />
                  Delete
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white text-sm font-semibold
                  hover:bg-blue-600 transition ${task.status === "completed" ? "hidden" : ""}`}
                  aria-label="Edit task"
                  onClick={() => handleEdit(task)}
                >
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>



          )) : <p className={`my-2 italic text-xl ${isLightTheme ? "text-gray-700" : "text-white/30"} text-center`}>
            Nothing here yet... Add your first task to get started 🚀
          </p>
        }
      </div>
    </div>



  );
}
