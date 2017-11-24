import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { appbar, taskList } from '../../styles/styles.css.js';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggableData: [
        {
          primary: 'Show Notification',
          secondary: 'Display native macOS notifications',
          isToggled: true
        },
        {
          primary: 'Update Automatically',
          secondary: 'Keep your application up to date',
          isToggled: true
        },
        {
          primary: 'Send Anonymous Crash Reports',
          secondary: 'Help us grow!',
          isToggled: false
        }
      ],
      idiom: 'English',
      theme: 'Default'
    }
    this.handleIdiomChange = this.handleIdiomChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleIdiomChange(event, index, idiom) {
    this.setState({ idiom });
  }

  handleThemeChange(event, index, theme) {
    this.setState({ theme });
  }

  handleClose() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text="Settings" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
        </Toolbar>

        <Subheader style={{fontFamily: 'Roboto'}}>General</Subheader>
        <List style={taskList.list}>
          {this.state.toggableData.map((data, index) =>
            <div key={index}>
              <ListItem
                key={index}
                style={{fontFamily: 'Roboto'}}
                primaryText={data.primary}
                secondaryText={data.secondary}
                rightToggle={<Toggle style={{marginRight: '15px'}} defaultToggled={data.isToggled} />}
              />
              <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />
            </div>
          )}
        </List>
        <Subheader style={{fontFamily: 'Roboto'}}>Customization</Subheader>
        <ListItem primaryText={'Application Idiom'}>
          <DropDownMenu
            value={this.state.idiom}
            onChange={this.handleIdiomChange}
            style={{marginRight: '-20px', marginTop: '-25px', float:'right', width: '160px'}}
          >
            <MenuItem value={"English"} primaryText="English" />
            <MenuItem value={"Portuguese"} primaryText="Portuguese" />
            <MenuItem value={"French"} primaryText="French" />
          </DropDownMenu>
        </ListItem>
        <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />
        <ListItem primaryText={'Color Theme'}>
          <DropDownMenu
            value={this.state.theme}
            onChange={this.handleThemeChange}
            style={{marginRight: '-20px', marginTop: '-25px', float:'right', width: '160px'}}
          >
            <MenuItem value={"Default"} primaryText="Default" />
            <MenuItem value={"Dark"} primaryText="Dark" />
            <MenuItem value={"Steel"} primaryText="Steel" />
          </DropDownMenu>
        </ListItem>
        <Divider style={{backgroundColor: '#EEEEEE', width: '650px', marginLeft: '20px'}} />
        <RaisedButton
          label="Save"
          onClick={this.handleClose}
          style={{float: 'right', marginTop: '60px', marginRight: '15px'}}
          primary
        />
        <FlatButton
          label="Cancel"
          onClick={this.handleClose}
          style={{float: 'right', marginTop: '60px', marginRight: '15px'}}
          secondary
        />
      </div>
    );
  }
}

export default Settings;
