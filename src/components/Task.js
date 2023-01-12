import {FaCheckDouble, FaEdit} from 'react-icons/fa';
import {RiDeleteBin6Line} from 'react-icons/ri';

const Task = ({task,index,taskDelete,singleTask,setToComplete}) =>{

    return( 
        <div className={task.completed ? "--flex-between task-completed" : "--flex-between task"}> 
         
         <div>  
            <p>
                <b>{index+1}.</b>
                {task.name}
            </p>
         </div>
         <div className='task-icons'>
             <FaEdit color='green' onClick={singleTask}/>
             <RiDeleteBin6Line color='purple' onClick={taskDelete}/>
             <FaCheckDouble color='red' onClick={setToComplete}/>
            </div>
                
        </div>
        
    )
}

export default Task;