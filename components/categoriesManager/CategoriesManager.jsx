import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Add from 'material-ui/svg-icons/av/playlist-add';
import Search from 'material-ui/svg-icons/action/search';

import CategoryPicker from '../add-task/category/CategoryPicker.jsx';

import { appbar } from '../../styles/styles.css.js';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeCategory: undefined, openWarning: false, checked: false };
    this.setCategory = this.setCategory.bind(this);
    this.handleOpenWarning = this.handleOpenWarning.bind(this);
    this.handleCloseWarning = this.handleCloseWarning.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  setCategory(activeCategory) {
    this.setState({ activeCategory });
  }

  deleteCategory() {
    //TODO
  }

  handleOpenWarning() {
    if (!this.state.checked) {
      this.setState({ openWarning: true });
    } else {
      this.deleteCategory();
    }
  }

  handleCloseWarning(confirmed) {
    if (confirmed) {
      this.deleteCategory();
      this.setState({ openWarning: false });
    } else {
      this.setState({ openWarning: false, checked: false });
    }
  }

  updateCheck() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const style = {
      margin: 12,
    };

    const disabled = !this.state.activeCategory;

    const actions = [
       <FlatButton
         label="Cancel"
         keyboardFocused
         onClick={() => this.handleCloseWarning(false)}
       />,
       <FlatButton
         label="Confirm"
         primary
         onClick={() => this.handleCloseWarning(true)}
       />,
     ];

     console.log(this.state.activeCategory);

    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ marginLeft: '15px' }} text="Categories" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Search
                style={{ position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red' }}
              />
              <TextField
                hintText="Search"
                style={{ textIndent: 30, width: '120px', paddingRight: 30 }}
              />
            </div>
            <RaisedButton
              style={{ margin: '0px 25px 0px 20px' }}
              primary
              label='Add Category'
              icon={<Add />}
            />
          </ToolbarGroup>
        </Toolbar>
        <div style={{ textAlign: 'center' }}>
          <RaisedButton label="See tasks" primary style={style} disabled={disabled} />
          <RaisedButton label="Edit" primary style={style} disabled={disabled} />
          <RaisedButton
            label="Delete"
            secondary
            onClick={() => this.handleOpenWarning()}
            style={style}
            disabled={disabled}
          />
        </div>
        <CategoryPicker
          onChange={this.setCategory}
          category={this.state.activeCategory}
          fromManager
        />
        {
          this.state.activeCategory &&
          <Dialog
            title="Warning"
            actions={actions}
            modal={false}
            open={this.state.openWarning}
            onRequestClose={() => this.handleCloseWarning(false)}
          >
            <div>
              <p>{`Are you sure you want to delete "${this.state.activeCategory.title}" category?`}</p>
              <Checkbox
                label="Do not show this warning again."
                checked={this.state.checked}
                onCheck={this.updateCheck}
                style={{ fontSize: '12px' }}
              />
            </div>
          </Dialog>
        }
      </div>
    );
  }
}

export default Calendar;
