import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

/* Import the sidebar icons. */
import Home from 'material-ui/svg-icons/action/home';
import Today from 'material-ui/svg-icons/action/today';
import Grades from 'material-ui/svg-icons/action/chrome-reader-mode';
import Timeline from 'material-ui/svg-icons/action/timeline';
import History from 'material-ui/svg-icons/action/history';
import Book from 'material-ui/svg-icons/action/book';
import Settings from 'material-ui/svg-icons/action/settings';

/* Import the components for each menu item. */
import TodayComponent from '../components/home/Today.jsx';
import TaskHistoryComponent from '../components/history/TaskHistory.jsx';
import CalendarComponent from '../components/calendar/Calendar.jsx';
import GradesComponent from '../components/grades/Grades.jsx';
import ScheduleComponent from '../components/schedule/Schedule.jsx';
import SettingsComponent from '../components/settings/Settings.jsx';
import StatisticsComponent from '../components/statistics/Statistics.jsx';
import AddTaskComponent from '../components/add-task/AddTaskComponent.jsx';
import TaskStarted from '../components/task-started/TaskStarted.jsx';

/* Import custom styles. */
import { sidebar } from '../styles/styles.css.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 'Home' }
  }

  setActiveTab(newTab) {
    this.setState({ activeTab: newTab });
  }

  render() {
    return (
      <Router>
        <div>
          <Drawer open width='22%' zDepth={1}>
            <Link to='/home' style={sidebar.link}>
              <MenuItem
                primaryText='Home'
                leftIcon={<Home />}
                onClick={() => this.setActiveTab('Home')}
                style={this.state.activeTab === 'Home' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider />
            <Link to='/schedule' style={sidebar.link}>
              <MenuItem
                primaryText='Schedule'
                leftIcon={<Book />}
                onClick={() => this.setActiveTab('Schedule')}
                style={this.state.activeTab === 'Schedule' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider />
            <Link to='/calendar' style={sidebar.link}>
              <MenuItem
                primaryText='Calendar'
                leftIcon={<Today />}
                onClick={() => this.setActiveTab('Calendar')}
                style={this.state.activeTab === 'Calendar' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider />
            <Link to='/grades' style={sidebar.link}>
              <MenuItem
                primaryText='Grades'
                leftIcon={<Grades />}
                onClick={() => this.setActiveTab('Grades')}
                style={this.state.activeTab === 'Grades' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider />
            <Link to='/statistics' style={sidebar.link}>
              <MenuItem
                primaryText='Statistics'
                leftIcon={<Timeline />}
                onClick={() => this.setActiveTab('Statistics')}
                style={this.state.activeTab === 'Statistics' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider />
            <Link to='/history' style={sidebar.link}>
              <MenuItem
                primaryText='History'
                leftIcon={<History />}
                onClick={() => this.setActiveTab('History')}
                style={this.state.activeTab === 'History' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider />
            <Link to='/settings' style={sidebar.link}>
              <MenuItem
                primaryText='Settings'
                leftIcon={<Settings />}
                onClick={() => this.setActiveTab('Settings')}
                style={this.state.activeTab === 'Settings' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
          </Drawer>

          <div style={sidebar.component}>
            <Switch>
              <Route exact path='/home' component={TodayComponent} />
              <Route path='/schedule' component={ScheduleComponent} />
              <Route path='/calendar' component={CalendarComponent} />
              <Route path='/grades' component={GradesComponent} />
              <Route path='/statistics' component={StatisticsComponent} />
              <Route path='/history' component={TaskHistoryComponent} />
              <Route path='/settings' component={SettingsComponent} />
              <Route path='/add-task' component={AddTaskComponent} />
              <Route path='/task-started' component={TaskStarted} />
              <Redirect to='/home' />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
