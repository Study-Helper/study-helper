import React from 'react';
import {Pie} from 'react-chartjs-2';
import TaskManager from '../../../server/managers/TaskManager.js';

let numberOfToDoTasks;
let numberOfCompletedTasks;

class TaskChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      options: {}
    }
  }

  componentWillMount(){
    this.load_data();
    this.set_chart_data();
    this.set_chart_options();
  }

  set_chart_data(){
    this.setState({data: { 
        labels: ["Tasks Completed", "Tasks Incompleted"],
        datasets: [{
          label: 'Incompleted Vs Completed Taks',
          data: [numberOfToDoTasks, numberOfCompletedTasks],
          backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)'
          ],
          borderColor: [
              'rgba(255,255,255,1)',
              'rgba(255, 255, 255, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  set_chart_options(){
    this.setState({options: {
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
          fullWidth: true,
          reverse: false,
          labels: {
            fontColor: "rgb(255, 99, 132)"
          }
        },
        title: { 
          display: true,
          text: 'Tasks Done' 
        }
      }
    });
  }

  load_data(){
    numberOfToDoTasks = TaskManager.getNumberOfToDoTasks();
    numberOfCompletedTasks = TaskManager.getNumberOfCompletedTasks();
  }

  render() {
    return (
      <Pie data={this.state.data}
          width={900}
          height={300}
          options={this.state.options}
      /> 
    )
  }
}

export default TaskChart;