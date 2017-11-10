import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import {Pie, Bar} from 'react-chartjs-2';

import { appbar, statisticButtons } from '../../styles/styles.css.js';

function format_chart_data(completed, incompleted) {
  return { 
    labels: ["Tasks Completed", "Tasks Incompleted"],
    datasets: [{
      label: 'Incompleted Vs Completed Taks',
      data: [completed, incompleted],
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
}

function da() {
  return { 
    labels: ["Maths", "Chemestry", "Physics", "History", "English"],
    datasets: [{
      label: 'Grade',
      data: [18, 15, 14, 13, 16],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  }
}

const options = {
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 30
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        display:false
      }
    }],
    yAxes: [{
      gridLines: {
        display:true,
      },
      ticks: {
        suggestedMax: 20,
        min: 0,
        stepSize: 5
      }   
    }]
  },
  legend: {
    display: false
  },
  title: { 
    display: true,
    text: 'Grades' 
  }
}

const legend = {
  "display": true,
  "position": "bottom",
  "fullWidth": true,
  "reverse": false,
  "labels": {
    "fontColor": "rgb(255, 99, 132)"
  }
}

class Statistics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {chart: "task"};
  }

  switchToGrades() {
      this.setState({chart: "grade"});
  }

  switchToTasks() {
      this.setState({chart: "task"});
  }

  render() {
    var chart = this.state.chart == "task" ? <Pie
            data={format_chart_data(12, 16)}
            width={900}
            height={300}
            legend={legend}
            options={{
              maintainAspectRatio: false,
              title: { 
                display: true,
                text: 'Tasks Done' 
              }
            }}
          /> : 
          <Bar
            data={da()}
            width={900}
            height={350}
            options={options}
          />;

    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text="Statistics" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
        </Toolbar>
        <RaisedButton 
          label="Tasks"
          primary
          style={statisticButtons.tasks}
          onClick={this.switchToTasks.bind(this)}
        />
        <RaisedButton 
          label="Grades"
          primary
          style={statisticButtons.grades}
          onClick={this.switchToGrades.bind(this)}
        />
        <div style={{'marginTop':'50px', 'marginLeft':'50px', 'marginRight':'50px'}}>
          {chart}
        </div>
      </div>
    )
  }
}

export default Statistics;