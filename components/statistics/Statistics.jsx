import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TasksChart from './charts/TasksChart.jsx';
import GradesChart from './charts/GradesChart.jsx';


import { appbar, statisticButtons } from '../../styles/styles.css.js';

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
    const chart = this.state.chart == "task" ? <TasksChart/> : <GradesChart/>;

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