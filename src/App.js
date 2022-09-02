import React, {useState} from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
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

  const [tasks, setTasks] = useState([
      {
          title: "Grab some Pizza",
          completed: true
      },
      {
          title: "Do your workout",
          completed: true
      },
      {
          title: "Hangout with friends",
          completed: false
      }
  ]);

  const Task = ({ task }) => {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
        </div>
    );
  }

  return (

    <Container maxWidth={'xs'} sx={containerStyles}>
      <Typography variant="h4" sx={{margin: '1.5rem 0'}}>
        Todo App!
      </Typography>

      {tasks.map((task, index) => (
        <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '1rem 3rem'}}>
          <Task
              task={task}
              index={index}
              key={index}
          />
          <Button variant="outlined">
            <DeleteIcon />
          </Button>
        </Box>
      ))}
      
    </Container>
  )
}

export default App;
