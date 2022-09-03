import React, {useState} from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './App.css';

const containerStyles = {
  margin: '5rem auto',
  textAlign: 'center',
  padding: '1.57rem',
  background: 'linear-gradient(180deg, rgba(71,57,176,1) 0%, rgba(147,226,227,1) 100%);', //gradient
  borderRadius: '5px',
  border: 'solid .5px #aaaaaa',
  boxShadow: '2px 2px 4px #c4c4c4'
}

const iconBorderStyles = {
  border: 'solid #ffffffa8 1px', //icon border color
    '&:hover': {
      border: 'solid #000000c6 1px'
    },
  caretColor : 'transparent'
}

const titleStyle = {
  margin: '1.5rem 0',
  fontFamily: 'Permanent Marker, cursive',
  color: '#dedcff', 
  // bgcolor: 'white', 
  // borderRadius: '4px', 
  // padding: '10px 0'
}


const App = () => {
  //USE STATE
  const [tasks, setTasks] = useState([]); //array of objects; list; tasks

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

  // TASK COMPONENT
  const Task = ({ task, index, completeTask, removeTask }) => {
    return (
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem'}}>
          <Typography 
            sx={{textDecoration: task.completed ? 'line-through' : '',
            color: task.completed ? '#454545c6' : '',
            textAlign: 'left',
            fontSize: '1.3rem'
          }}
          >
            {task.title}
          </Typography>
          <Box component="div" sx={{display: 'flex'}}>
            <Button onClick={() => completeTask(index)} sx={iconBorderStyles}>
              <CheckIcon color="success"/>
            </Button>
            <Button onClick={() => removeTask(index)} sx={iconBorderStyles}>
              <DeleteOutlinedIcon color="error"/>
            </Button>
          </Box>
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
      <Box component="form" onSubmit={handleSubmit} sx={{padding: '2rem 0'}}> {/*<=======  INPUT */}
        <TextField
          type="text"
          value={value}
          label="Add a task... "
          onChange={(e) => setValue(e.target.value)}
          sx={{caretColor: 'transparent'}}
        />
      </Box>
    )
  }

  return (

    <Container maxWidth={'xs'} sx={containerStyles}>
      <Typography variant="h5" sx={titleStyle}>
        Todo App
      </Typography>

      {tasks.map((task, index) => (
          <Box component="div">
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

        <CreateTask addTask={addTask} /> {/* <======= CREATE TASK COMPONENT; pass addTask; input*/}
      
    </Container>
  )
}

export default App;
