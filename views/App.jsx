import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
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
          <List style={sidebar.list}>
            <ListItem              
              primaryText={<div style={{fontSize: '14px', color: '#BDBDBD'}}>John Smith</div>}
              secondaryText={<div style={{fontWeight: 'lighter', fontSize: '12px', color: '#9E9E9E'}}>john@sh.com</div>}
              leftAvatar={<Avatar size={25} style={sidebar.userAvatar}>J</Avatar>}
              style={{backgroundColor: '#21405B', height: '70px', marginTop: '-10px'}}
            />
            <Link to='/home' style={sidebar.link}>
              <ListItem
                primaryText='Home'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<Home style={sidebar.icon} />}
                  color={this.state.activeTab === 'Home' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('Home')}
                style={this.state.activeTab === 'Home' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Link to='/calendar' style={sidebar.link}>
              <ListItem
                primaryText='Calendar'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<Today style={sidebar.icon} />}
                  color={this.state.activeTab === 'Calendar' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('Calendar')}
                style={this.state.activeTab === 'Calendar' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Link to='/grades' style={sidebar.link}>
              <ListItem
                primaryText='Grades'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<Grades style={sidebar.icon} />}
                  color={this.state.activeTab === 'Grades' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('Grades')}
                style={this.state.activeTab === 'Grades' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Link to='/statistics' style={sidebar.link}>
              <ListItem
                primaryText='Statistics'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<Timeline style={sidebar.icon} />}
                  color={this.state.activeTab === 'Statistics' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('Statistics')}
                style={this.state.activeTab === 'Statistics' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Link to='/categories' style={sidebar.link}>
              <ListItem
                primaryText='Categories'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<Face style={sidebar.icon} />}
                  color={this.state.activeTab === 'Categories' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('Categories')}
                style={this.state.activeTab === 'Categories' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Link to='/history' style={sidebar.link}>
              <ListItem
                primaryText='History'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<History style={sidebar.icon} />}
                  color={this.state.activeTab === 'History' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('History')}
                style={this.state.activeTab === 'History' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>
            <Link to='/settings' style={sidebar.link}>
              <ListItem
                primaryText='Settings'
                leftAvatar={<Avatar
                  size={35}
                  style={sidebar.avatar}
                  icon={<Settings style={sidebar.icon} />}
                  color={this.state.activeTab === 'Settings' ? sidebar.avatarIconColorFocused : sidebar.avatarIconColorNormal}
                />}
                onClick={() => this.setActiveTab('Settings')}
                style={this.state.activeTab === 'Settings' ? sidebar.focusedItem : sidebar.menuItem}
              />
            </Link>

            
          </List>

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
