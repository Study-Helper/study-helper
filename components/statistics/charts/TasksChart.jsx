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
    this.setState({
      data: { 
        labels: ["Tasks Completed", "Tasks Incompleted"],
        datasets: [{
          label: 'Incompleted Vs Completed Taks',
          data: [numberOfCompletedTasks, numberOfToDoTasks],
          backgroundColor: [
            '#FF4081',
            '#00BCD4'
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
    this.setState({
      options: {
        maintainAspectRatio: false,
        layout: { padding: { bottom: 510, top: 20, right: 100, left: 100 } },
        legend: {
          position: "bottom",
          display: true,          
          fullWidth: false,
          reverse: false,
          labels: {
            fontColor: "#616161"
          }
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
      <Pie 
        data={this.state.data}
        options={this.state.options}
        width={20}
        height={20}
      /> 
    );
  }
}

export default TaskChart;
