import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline';
import TaskList from '../list/TaskList.jsx';
import AddTaskButton from '../add-task/AddTaskButton.jsx';
import Search from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar } from '../../styles/styles.css.js';
import TaskManager from '../../server/managers/TaskManager.js';

class Today extends React.Component {

  constructor(props) {
    super(props);
    // Synchronously load "today's" tasks.
    this.state = {
      tasks: TaskManager.loadTasksByDate('2017-09-05')
    }
  }

  componentWillMount() {
    const { location } = this.props;
    if (location && location.state) {
      const { from, task } = this.props.location.state;

      if (from === 'task-started') {
        //task completed. TODO: show feedback message
        console.log('Task completed:', task);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    //TODO: consider endDate (range[1])
    const { range } = nextProps;
    const date = range ? range[0] : '2017-09-05';
    this.setState({
      tasks: TaskManager.loadTasksByDate(date)
      // tasks: TaskManager.loadTasksByDate(range[0])
    });
  }

  render() {
    const { title, height } = this.props;
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text={title || 'Today'} />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {
              this.state.tasks.length > 0 &&
              <div style={{position: 'relative', display: 'inline-block'}}>
                <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red'}}/>
                <TextField hintText="Search" style={{textIndent: 30, 'width':'120px', paddingRight: 30}}/>
              </div>
            }
            <AddTaskButton startDate={'2017-09-05'} endDate={'2017-09-05'} />
          </ToolbarGroup>
        </Toolbar>
        {
          this.state.tasks.length > 0 ?
          <Scrollbars style={{ height: height || 585 }}>
            <TaskList tasks={this.state.tasks} />
          </Scrollbars> :
          <div style={{ textAlign: 'center', fontFamily: 'Roboto', marginTop: '30px' }}>
            <div><ErrorIcon /></div>
            <div>No tasks to show</div>
          </div>
        }
      </div>
    );
  }
}

Today.propTypes = {
  title: PropTypes.string,
  range: PropTypes.array,
  height: PropTypes.number,
};

export default Today;
