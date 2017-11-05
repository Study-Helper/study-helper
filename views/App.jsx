import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/* Import the sidebar icons. */
import Home from 'material-ui/svg-icons/action/home';
import Today from 'material-ui/svg-icons/action/today';
import Grades from 'material-ui/svg-icons/action/chrome-reader-mode';
import Timeline from 'material-ui/svg-icons/action/timeline';
import History from 'material-ui/svg-icons/action/history';
import Book from 'material-ui/svg-icons/action/book';
import Settings from 'material-ui/svg-icons/action/settings';

/* Import the components for each menu item. */
import TodayComponent from '../components/Today.jsx';

/* Import custom styles. */
import { sidebar } from '../styles/styles.css.js';

const App = () => (
  <Router>
     <div>
      <Drawer open width='22%' zDepth={1}>
        <Link to='/' style={sidebar.link}>
          <MenuItem primaryText='Home' leftIcon={<Home />} style={sidebar.menuItem} />
        </Link>
        <Divider />
        <Link to='/calendar' style={sidebar.link}>
          <MenuItem primaryText='Calendar' leftIcon={<Today />} style={sidebar.menuItem} />
        </Link>
        <Divider />
        <Link to='/grades' style={sidebar.link}>
          <MenuItem primaryText='Grades' leftIcon={<Grades />} style={sidebar.menuItem} />
        </Link>
        <Divider />
        <Link to='/statistics' style={sidebar.link}>
          <MenuItem primaryText='Statistics' leftIcon={<Timeline />} style={sidebar.menuItem} />
        </Link>
        <Divider />
        <Link to='/history' style={sidebar.link}>
          <MenuItem primaryText='History' leftIcon={<History />} style={sidebar.menuItem} />
        </Link>
        <Divider />
        <Link to='/categories' style={sidebar.link}>
          <MenuItem primaryText='Categories' leftIcon={<Book />} style={sidebar.menuItem} />
        </Link>
        <Divider />
        <Link to='/settings' style={sidebar.link}>
          <MenuItem primaryText='Settings' leftIcon={<Settings />} style={sidebar.menuItem} />
        </Link>
        <Divider />
      </Drawer>

      <div style={sidebar.component}>
        <Route exact path='/' component={TodayComponent} />
        <Route path='/calendar' component={() => <div>Calendar!</div>} />
        <Route path='/grades' component={() => <div>Grades!</div>} />
        <Route path='/statistics' component={() => <div>Statistics!</div>} />
        <Route path='/history' component={() => <div>History!</div>} />
        <Route path='/categories' component={() => <div>Categories!</div>} />
        <Route path='/settings' component={() => <div>Settings!</div>} />
      </div>
    </div>
  </Router>
);

export default App;
