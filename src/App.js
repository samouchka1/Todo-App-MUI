import React, {useState} from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Tooltip,
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
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
  margin: '2rem 0',
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

  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState(false)

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
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

  const editTask = (index, editedTitle) => {
    const newTasks = [...tasks];
    newTasks[index] = editedTitle;
    setTasks(newTasks);
  }


  // TASK COMPONENT
  const Task = ({ task, index, completeTask, removeTask, editTask }) => {

    //edit states
    const [editValue, setEditValue] = useState(task.title);
    const [cancel, setCancel] = useState(false)
    const [isEditing, setIsEditing] = useState({index, bool: false});

    const handleClearEdit = () => {
      setEditValue(task.title);
      setIsEditing({index, bool: false});
      setCancel(false);
    }

    const handleEditSubmit = (e) => {
      e.preventDefault();
      if (!editValue) return;
      task.title = editValue;
      editTask(editValue);
    }

    return (
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: {md: 'row', xs:'column'},
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: {
            md: '2rem',
            xs: '1.4rem'
          }
        }}
      >


        {isEditing.bool ? 

          <Box 
            component="form" 
            onSubmit={handleEditSubmit}
            sx={{
              margin: {
                md: '.95rem 0 .95rem .95rem',
                xs: '.95rem 0'
              },
              backgroundColor: 'background.default'
            }} 
          >
            <TextField 
              type="text"
              value={editValue}
              label="Edit task"
              onChange={(e) => {
                setEditValue(e.target.value)
                setCancel(true);
              }}
              sx={{
                width: {
                  md: 260,
                  xs: 300,
                },
              }}
            />
          </Box> 

        : 

          <Typography 
            sx={{
              textDecoration: task.completed ? 'line-through' : '',
              color: task.completed ? '#454545c6' : '',
              // backgroundColor: task.completed ? '#bbbbbb85' : '#ffffff85',
              textAlign: 'left',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '1.5rem',
              // border: `solid #7c7c7c94 1px`,
              width: '100%',
              margin: { md: '1rem', xs: '.5rem .25rem'},
              padding: '.95rem',
              borderRadius: '4px',
            }}
            className="animate__animated"
            id={index}
          >
            {task.title}
          </Typography>

        }


            {/* BUTTONS */}
          <Box component="div" sx={{display: 'flex'}}>
            <Tooltip title="Complete Task">
              <Button //complete task
                onClick={() => completeTask(index)} 
                sx={iconBorderStyles}
              >
                <CheckIcon color="success"/>
              </Button>
            </Tooltip>

            {cancel ? 
            <Tooltip title="Cancel Edit">
              <Button //cancel edit
                sx={iconBorderStyles} 
                onClick={handleClearEdit}>
                <ClearIcon />
              </Button> 
            </Tooltip>
            : 
            <Tooltip title="Edit Task">
              <Button //edit task
                sx={iconBorderStyles}
                onClick={() => setIsEditing({index, bool: !isEditing.bool})}
              >
                <EditIcon color="primary.main" />
              </Button>
            </Tooltip>
            }

            <Tooltip title="Remove Task">
              <Button  //remove task
                sx={iconBorderStyles}
                onClick={() => {
                  document.getElementById(index).classList.add("animate__bounceOut");
                  setTimeout(() => {
                    removeTask(index);
                  }, 550);
                }} 
              >
                <DeleteOutlinedIcon color="error"/>
              </Button>
            </Tooltip>

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
      
      <Box component="form" onSubmit={handleSubmit} sx={{p: '2rem 0'}}> {/* INPUT */}
        <TextField
          // multiline
          // maxRows={4}
          type="text"
          value={value}
          label="Add task"
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
            className="title animate__animated"
          >
            To-do App
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
                editTask={editTask}
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
