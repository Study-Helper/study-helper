import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import SubjectsList from '../list/SubjectsList.jsx';
import AddSubjectModal from '../modals/Subject-modals/AddSubjectModal.jsx';

import Add from 'material-ui/svg-icons/av/playlist-add';

import { appbar } from '../../styles/styles.css.js';

class Grades extends React.Component {

  constructor(props) {
    super(props);
  }

  openAddModal() {
    AddSubjectModal.openSelf();
  }

  render() {
    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={appbar.header} text="Grades" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              primary
              label="Add Subject"
              labelPosition="before"
              style={{margin: '0px 30px 0px 20px'}}
              icon={<Add/>}
              onClick={() => this.openAddModal()}
            />
          </ToolbarGroup>
        </Toolbar>
        <SubjectsList/>
        <AddSubjectModal/>
      </div>
    );
  }
}

export default Grades;