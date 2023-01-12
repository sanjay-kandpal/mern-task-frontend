import {toast} from 'react-toastify';
import TaskForm from './TaskForm';
import Task from './Task';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { URL } from '../App';
import loadingImg from '../assets/Loader.gif';

const TaskList = () => {
 const [tasks,setTasks] = useState([]);
 const [completedTasks,setcompletedTasks] = useState([]);
 const [isLoading,setIsLoading] = useState(true);
 const [isEditing,setIsEditing] = useState(false);
 const [TaskID,setTaskID] = useState("");
 const [formData,setFormData] = useState({
   name: "",
   completed: false
 });
 
 const {name} = formData;

 const handleInputChange = (e) =>{
  const {name,value} = e.target;
  setFormData({
    ...formData, [name]: value,
  });
 }
 useEffect(()=>{
  getTasks();
 },[tasks]);
 
 const getTasks = async() => { 
  try {
    const {data} = await axios.get(`${URL}/api/Alltasks`);
    setTasks(data);
    setIsLoading(false);
  } catch (error) {
    toast.error(error.message)
    setIsLoading(true)
  }
 }
 
 const createTask = async (e) =>{
   e.preventDefault();
   console.log(name);
   if(name === ""){
    return toast.error("error");
   }
   try {
  
    await axios.post(`${URL}/create/apitasks`,formData);
    toast.success("Task add successfully");
    setFormData({
      ...formData,name: ""
    })
  
   } catch (error) {
     toast.error(error.message);
   }

  }
  const taskDelete = async(id) =>{
    try {
      console.log(id);
      await axios.delete(`${URL}/api/delTask/${id}`);
      toast.success('successfully deleted task');

    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  useEffect(()=>{
    const cTAsk = tasks.filter((task) =>{
      return task.completed === true
    })
    setcompletedTasks(cTAsk);
   },[tasks])
  const updateTask = async(e) =>{
     e.preventDefault();
     
     if(name === " ")
      return toast.error('error input field cannot be empty');
    try {
      await axios.put(`${URL}/api/updateTask/${TaskID}`,formData); 
      setFormData({...formData, name: ""});
      setIsEditing(false);
      toast.success('task updated successfully'); 
    } catch (error) {
      toast.error(`error: ${error}`)
    }
  }
  const singleTask = (task) =>{
    try {
      setFormData({
        name: task.name,
        completed: false
      })
      setTaskID(task._id);
      setIsEditing(true);
      
      updateTask();
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  const setToComplete = async(task) =>{
    try {
      const newFormData = {
        name: task.name,
        completed: true
      }
      await axios.put(`${URL}/api/updateTask/${task._id}`,newFormData);
      
      toast.update('update completed');
      
    } catch (error) {
      console.log(error);
      task.error('fail to complete')
    }

  }
 
  return(
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={name} 
        handleInputChange={handleInputChange} 
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className='--flex-between --pb'>
        <p>
         <b>Total Tasks:</b>{tasks.length}
        </p>
        <p>
         <b>Completed Tasks:</b>{completedTasks.length}
        </p>      
        <hr />   
      </div>
     
      )}
      
     
      {
        isLoading && (
          <div className='--flex-center'>
           <img src={loadingImg} alt="loading image" />
          </div>
        )
      }
      {
        !isLoading && tasks.length === 0 ?(
          <p>No Task added.Please add a Task</p>
        ) : (
          <>
            {tasks.map((task,index) =>{
              return(
                <Task 
                 key={task._id} 
                 task={task} 
                 index={index} 
                 taskDelete={() => taskDelete(task._id)} 
                 singleTask ={() => singleTask(task)} 
                 setToComplete ={() => setToComplete(task)}
                 
                />
              )
            })}
          </>
        )
      }
      
    </div>
  );
}
export default TaskList;

