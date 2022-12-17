import React, {useState} from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import './App.css';
import 'animate.css';

const containerStyles = {
  margin: '6rem auto 2rem',
  textAlign: 'center',
  padding: { md: '1.6rem', xs: '1.2rem'},
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
  caretColor : 'transparent',
  backgroundColor: 'background.default'
}

const titleStyle = {
  margin: '3rem 0',
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

const theme = useTheme();

  React.useEffect(() => {
    document.querySelector(".title").classList.remove("tracking-in-expand")
    setTimeout(() => {
      document.querySelector(".title").classList.add("tracking-in-expand")
    }, 5);
  }, [])


  const [tasks, setTasks] = useState([]); //array of objects; list; tasks
  const [complete, setComplete] = useState(false)

  const addTask = (title) => {
        //add input values to existing array
    const newTasks = [...tasks, { title, completed: complete }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    setComplete(!complete)
    newTasks[index].completed = !complete;
    setTasks(newTasks);
  };


  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };




  // ======= EDITING TASK =========

  // const editTask = (index, newTitle) => { //testing
  //   const newTasks = [...tasks];
    
  //   setTasks(newTasks);
  // }

  // const [edit, setEdit] = useState(true);

  // const handleEditing = () => {
  //   setEdit(!edit)
  // }


  // TASK COMPONENT
  const Task = ({ task, index, completeTask, removeTask, editTask }) => {

    return (
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: {md: 'row', xs:'column'},
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '2rem',
        }}
      >

        {/* {edit ? ( */}

          <Typography 
            sx={{
              textDecoration: task.completed ? 'line-through' : '',
              color: task.completed ? '#454545c6' : '',
              backgroundColor: task.completed ? 'grey.100' : 'background.default',
              textAlign: 'left',
              fontSize: '1.3rem',
              border: `solid #7c7c7c94 1px`,
              width: '100%',
              margin: { md: '1rem', xs: '.5rem .25rem'},
              padding: '.15rem',
              borderRadius: '4px',
            }}
            className="animate__animated"
            id={index}
          >
            {task.title}
          </Typography>
          
         {/* ) : (

          <TextField
            type="text"
            value={task.title}

          />
        )} */}
          
         
            {/* BUTTONS */}
          <Box component="div" sx={{display: 'flex'}}>

            <Button //complete task
              onClick={() => completeTask(index)} 
              sx={iconBorderStyles}
            >
              <CheckIcon color="success"/>
            </Button>

              <Button //edit task
                // onClick={handleEditing}
                sx={iconBorderStyles}
                disabled
              >
                <EditIcon color="primary.main"/>
              </Button>

            <Button  //remove task
              sx={iconBorderStyles}
              onClick={() => {

                document.getElementById(index).classList.add("animate__fadeOutLeft");
                setTimeout(() => {
                  removeTask(index);
                }, 350)

              }} 
            >
              <DeleteOutlinedIcon color="error"/>
            </Button>
          </Box>

      </Box>
    );
  }

  // CREATE TASK COMPONENT
  const CreateTask = ({ addTask }) => {

    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
  }
    return ( 
      
      <Box component="form" onSubmit={handleSubmit} sx={{padding: '2rem 0'}}> {/* INPUT */}
        <TextField
          // multiline
          // maxRows={4}
          type="text"
          value={value}
          label="Add a task... "
          onChange={(e) => setValue(e.target.value)}
          sx={{
            // caretColor: 'transparent',
            width: 400,
            maxWidth: '100%',
            backgroundColor: 'background.default'
          }}
        />
      </Box>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='sm' sx={containerStyles}>
          <Typography 
            variant="h4" 
            sx={titleStyle} 
            className="title"
          >
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
                  // editTask={editTask}
              />

            </Box>
        ))}

          {/*CREATE TASK COMPONENT*/}
          <CreateTask addTask={addTask} />
        
      </Container>
      <Typography maxWidth='md' sx={signatureStyle}>
          &copy; {new Date().getFullYear()} samouchka
      </Typography>
    </ThemeProvider>
  )
}

export default App;
