import React from 'react';
import {Pie} from 'react-chartjs-2';
  
function load_data(){
  
}

const data = { 
  labels: ["Tasks Completed", "Tasks Incompleted"],
  datasets: [{
    label: 'Incompleted Vs Completed Taks',
    data: [12, 20],
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

const options = {
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

const TaskChart = () => (
  <Pie data={data}
      width={900}
      height={300}
      options={options}
  /> 
);

export default TaskChart;