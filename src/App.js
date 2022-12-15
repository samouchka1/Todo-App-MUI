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
  margin: '10rem auto 2rem',
  textAlign: 'center',
  padding: '1.57rem',
  background: 'linear-gradient(150deg, rgba(212,208,239,1) 0%, rgba(241,241,241,1) 100%);', //gradient
  borderRadius: '5px',
  border: 'solid .5px #aaaaaa',
  boxShadow: '2px 2px 4px #c4c4c4'
}

const iconBorderStyles = {
  border: 'solid #a9a8a8f7 1px', //icon border color
    '&:hover': {
      border: 'solid #000000c6 1px'
    },
  caretColor : 'transparent'
}

const titleStyle = {
  margin: '1.5rem 0',
  fontFamily: 'Nunito, sans-serif', //font family
  color: '#090909f7', //title color
  textShadow: 'white 3px 3px 3px',
}

const signatureStyle = {
  color: '#2d2d2d',
  margin: '2rem auto',
  fontSize: '.7rem',
  textAlign: 'right',
  caretColor: 'transparent',
  paddingRight: '.5rem'
}


const App = () => {

  const [tasks, setTasks] = useState([]); //array of objects; list; tasks


  const addTask = (title) => {
        //add input values to existing array
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };


  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };


  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
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
    <div>
      <Container maxWidth='sm' sx={containerStyles}>
        <Typography variant="h4" sx={titleStyle}>
          Todo App
        </Typography>

        {tasks.map((task, index) => (
            <Box component="div">

              {/*TASK COMPONENT */}
              <Task
                  task={task}
                  index={index}
                  key={index}
                  completeTask={completeTask}
                  removeTask={removeTask}
              />
              
            </Box>
        ))}

          {/*CREATE TASK COMPONENT*/}
          <CreateTask addTask={addTask} />
        
      </Container>
      <Typography maxWidth='md' sx={signatureStyle}>
          &copy; {new Date().getFullYear()} samouchka
      </Typography>
    </div>
  )
}

export default App;
