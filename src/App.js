import React, {useState} from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

const containerStyles = {
  margin: '5rem auto',
  textAlign: 'center',
  padding: '25px',
  bgcolor: '#c6d8ff',
  borderRadius: '5px',
  border: 'solid .5px #aaaaaa',
  boxShadow: '2px 2px 4px #c4c4c4'
}


const App = () => {
  //USE STATE
  const [tasks, setTasks] = useState([]); //array of objects; list; tasks

  // TASK COMPONENT
  const Task = ({ task, index, removeTask }) => {
    return (
        <Box
            className="task"
            sx={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
            <Button onClick={() => removeTask(index)}>
              <DeleteIcon color="error"/>
            </Button>
        </Box>
    );
  }

  // CREATE TASK COMPONENT
  const CreateTask = ({ addTask }) => {
    //USE STATE
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
  }
    return ( 
      <Box component="form" onSubmit={handleSubmit}> {/*<=======  INPUT */}
        <TextField
          type="text"
          value={value}
          label="Add a task... "
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
    )
  }

  // ADD TASK
  const addTask = (title) => {
                //add input values to existing array
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  // COMPLETE TASK
  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks); //<======= setTasks
  };

  //REMOVE TASK
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks); //<======= setTasks
  };


  return (

    <Container maxWidth={'xs'} sx={containerStyles}>
      <Typography variant="h4" sx={{margin: '1.5rem 0'}}>
        Todo App!
      </Typography>

      {tasks.map((task, index) => (
        <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '1rem 3rem'}}>
          
          {/*TASK COMPONENT;  pass index + task */}
          <Task
              task={task}
              index={index}
              key={index}
              completeTask={completeTask}
              removeTask={removeTask}
          />
        </Box>
      ))}

        <CreateTask addTask={addTask} /> {/* <======= CREATE TASK COMPONENT; pass addTask*/}
      
    </Container>
  )
}

export default App;
