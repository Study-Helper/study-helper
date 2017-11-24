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
import Face from 'material-ui/svg-icons/action/face';
import History from 'material-ui/svg-icons/action/history';
import Settings from 'material-ui/svg-icons/action/settings';

/* Import the components for each menu item. */
import TodayComponent from '../components/home/Today.jsx';
import TaskHistoryComponent from '../components/history/TaskHistory.jsx';
import CalendarComponent from '../components/calendar/Calendar.jsx';
import GradesComponent from '../components/grades/Grades.jsx';
import SettingsComponent from '../components/settings/Settings.jsx';
import StatisticsComponent from '../components/statistics/Statistics.jsx';
import AddTaskComponent from '../components/add-task/AddTaskComponent.jsx';
import EditTaskComponent from '../components/edit-task/EditTaskComponent.jsx';
import TaskStarted from '../components/task-started/TaskStarted.jsx';
import CategoriesManager from '../components/categoriesManager/CategoriesManager.jsx';

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
          <Drawer open width='21%' zDepth={1}>
            <Link to='/home' style={sidebar.link}>
              <MenuItem
                primaryText='Home'
                leftIcon={<Home style={sidebar.icon} />}
                onClick={() => this.setActiveTab('Home')}
                style={this.state.activeTab === 'Home' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider style={{backgroundColor: '#EEEEEE'}} />
            <Link to='/calendar' style={sidebar.link}>
              <MenuItem
                primaryText='Calendar'
                leftIcon={<Today style={sidebar.icon} />}
                onClick={() => this.setActiveTab('Calendar')}
                style={this.state.activeTab === 'Calendar' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider style={{backgroundColor: '#EEEEEE'}} />
            <Link to='/grades' style={sidebar.link}>
              <MenuItem
                primaryText='Grades'
                leftIcon={<Grades style={sidebar.icon} />}
                onClick={() => this.setActiveTab('Grades')}
                style={this.state.activeTab === 'Grades' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider style={{backgroundColor: '#EEEEEE'}} />
            <Link to='/statistics' style={sidebar.link}>
              <MenuItem
                primaryText='Statistics'
                leftIcon={<Timeline style={sidebar.icon} />}
                onClick={() => this.setActiveTab('Statistics')}
                style={this.state.activeTab === 'Statistics' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider style={{ backgroundColor: '#EEEEEE' }} />
            <Link to='/categories' style={sidebar.link}>
              <MenuItem
                primaryText='Categories'
                leftIcon={<Face style={sidebar.icon} />}
                onClick={() => this.setActiveTab('Categories')}
                style={this.state.activeTab === 'Categories' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider style={{backgroundColor: '#EEEEEE'}} />
            <Link to='/history' style={sidebar.link}>
              <MenuItem
                primaryText='History'
                leftIcon={<History style={sidebar.icon} />}
                onClick={() => this.setActiveTab('History')}
                style={this.state.activeTab === 'History' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Divider style={{backgroundColor: '#EEEEEE'}} />
            <Link to='/settings' style={sidebar.link}>
              <MenuItem
                primaryText='Settings'
                leftIcon={<Settings style={sidebar.icon} />}
                onClick={() => this.setActiveTab('Settings')}
                style={this.state.activeTab === 'Settings' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
          </Drawer>

          <div style={sidebar.component}>
            <Switch>
              <Route exact path='/home' component={TodayComponent} />
              <Route path='/calendar' component={CalendarComponent} />
              <Route path='/grades' component={GradesComponent} />
              <Route path='/statistics' component={StatisticsComponent} />
              <Route path='/history' component={TaskHistoryComponent} />
              <Route path='/settings' component={SettingsComponent} />
              <Route path='/add-task' component={AddTaskComponent} />
              <Route path='/edit-task' component={EditTaskComponent} />
              <Route path='/task-started' component={TaskStarted} />
              <Route path='/categories' component={CategoriesManager} />
              <Redirect to='/home' />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
