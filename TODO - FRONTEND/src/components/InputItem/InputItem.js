import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import TodoList from "../TodoList/TodoList";
import "./style.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import EditTodo from "../EditTodo/EditTodo";
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: {
        title: "",
        description: "",
        status: "",
      },
      showTaskData: [],
      successAlertMsg: "",
      todoDeleteMsg: "",
      editTaskDataModal: false,
      editTaskData: {
        title: "",
        description: "",
      },
      successTodoUpdatedMsg: "",
    };
  }
  componentDidMount() {
    this.getTaskData();
  }
    
       
 /**
  * description create task items
  */

  addItem = () => {
    const formData = new FormData();
    formData.append("title", this.state.taskData.title);
    formData.append("description", this.state.taskData.description);
  
    axios.post("http://127.0.0.1:8000/api/todos/store", formData, {
      withCredentials: true, // Send cookies along with the request
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
    })
    .then((response) => {
      const result = response.data;
      if (result.status === "success") {
        this.setState({ successAlertMsg: result.message }, () => this.getTaskData());
        setTimeout(() => {
          this.setState({ successAlertMsg: "" });
        }, 1000);
      }
      if (result.error === false) {
        this.setState({
          taskData: {
            title: "",
            description: "",
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  /**
   * description fetch/get all tasks
   */
  getTaskData() {
    
    
    axios.get("http://127.0.0.1:8000/api/", {
      withCredentials: true, // Send cookies along with the request
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
    })
    .then((response) => {
      const result = response.data;
      
        this.setState({
          showTaskData: result,
        });
       
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  /**
   * 
   * @param {Object} event - on click event 
   */
  onChangehandler = (e) => {
    const { taskData } = this.state;
    taskData[e.target.name] = e.target.value;
    console.log((taskData[e.target.name] = e.target.value));
    this.setState({ taskData });
  };

  /**
   * description - clear task list
   */

  clearList = () => {
    this.setState({
      showTaskData: [],
    });
  };

  /**
   * 
   * @param {value} id - deletes a single task 
   */

  handleDelete = (id) => {
   
    axios.delete(`http://127.0.0.1:8000/api/todos/delete/${id}`, {
      withCredentials: true, // Send cookies along with the request
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
    })
      .then((response) => {
        const result = response.data;
        
          this.setState(
            {
              todoDeleteMsg: result.message,
            },
            () => this.getTaskData()
          );
          setTimeout(() => {
            this.setState({ todoDeleteMsg: "" });
          }, 1000);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * show edit modal
   */

  toggleEditTaskModal = () => {
    this.setState({
      editTaskDataModal: !this.state.editTaskDataModal,
    });
  };

  /**
   * 
   * @param {event} event -  this function handles edit submissions
   */
  
  onChangeEditTodoHandler = (e) => {
    let { editTaskData } = this.state;
    editTaskData[e.target.name] = e.target.value;
    this.setState({ editTaskData });
  };

  /**
   * 
   * @param {value} id -  this is the id of the task
   * @param {value} title - this is the title of the task
   * @param {value} description - this is the description of the task
   */
  editTodo = (id, title, description) => {
    this.setState({
      editTaskData: { id, title, description },
      editTaskDataModal: !this.state.editTaskDataModal,
    });
  };

  /**
   * submits updated data to the laravel api
   */

  updateTodo = () => {
    let { id, title, description } = this.state.editTaskData;
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    axios.put(`http://127.0.0.1:8000/api/todos/update/${id}`, {title, description}, {
      withCredentials: true, // Send cookies along with the request
    })
      .then(response => {
        const result = response.data;
  
        this.setState({
          editTaskDataModal: false,
          editTaskData: { title, description }
        }, () => this.getTaskData());
  
        setTimeout(() => {
          this.setState({ editTaskDataModal: false });
        }, 1000);
  
        this.setState({
          successTodoUpdatedMsg: result.message,
        });
  
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  render() {
    const { title, description } = this.state.taskData;
    
    return (
      <Container className="themed-container mt-5" fluid="sm">
        <div className="input-field-container">
          <ThemeProvider theme={theme}>
            <TextField
              type="text"
              name="title"
              placeholder="Task Title"
              value={title}
              onChange={this.onChangehandler}
              color="primary"
              variant="outlined"
            />
            <TextField
              type="text"
              name="description"
              placeholder="Task description"
              value={description}
              onChange={this.onChangehandler}
              color="primary"
              variant="outlined"
              style={{ width: "50%" }}
            />

            <Button
              color="success"
              className="font-weight-bold add-task"
              onClick={this.addItem}
            >
              +
            </Button>
          </ThemeProvider>
        </div>
        <div class="text-success p-4 mt-2">{this.state.successAlertMsg}</div>
        {/*TODO list  */}
        <TodoList
          showTaskData={this.state.showTaskData}
          clearList={this.clearList}
          handleDelete={this.handleDelete}
          todoDeleteMsg={this.state.todoDeleteMsg}
          editTodo={this.editTodo}
          toggleEditTaskModal={this.toggleEditTaskModal}
        />
        {/* Model for Edit Todo */}
        <EditTodo
          toggleEditTaskModal={this.toggleEditTaskModal}
          editTaskDataModal={this.state.editTaskDataModal}
          onChangeEditTodoHandler={this.onChangeEditTodoHandler}
          editTodo={this.editTodo}
          editTaskData={this.state.editTaskData}
          updateTodo={this.updateTodo}
          successTodoUpdatedMsg={this.state.successTodoUpdatedMsg}
        />
      </Container>
    );
  }
}
