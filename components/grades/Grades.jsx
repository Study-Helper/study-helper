import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Scrollbars } from 'react-custom-scrollbars';
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SubjectManager from '../../server/managers/SubjectManager.js';
import SubjectsList from '../list/SubjectsList.jsx';

import Add from 'material-ui/svg-icons/content/add';

import { appbar } from '../../styles/styles.css.js';

class Grades extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subjects: SubjectManager.loadSubjects()
    }
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{'marginLeft': '15px'}} text="Grades" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton 
              label="Add Subject"
              labelPosition="before"
              primary
              icon={<Add/>}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          this.state.subjects.length > 0 ?
          <Scrollbars style={{ width: 697, height: 540 }}>
            <SubjectsList subjects={this.state.subjects} />
          </Scrollbars> :
          <div style={{ textAlign: 'center', fontFamily: 'Roboto', marginTop: '30px' }}>
            <div><ErrorIcon /></div>
            <div>No subjects to show</div>
          </div>
        }
      </div>
    );
  }
}

export default Grades;