import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Add from 'material-ui/svg-icons/av/playlist-add';
import Search from 'material-ui/svg-icons/action/search';

import CategoryPicker from '../add-task/category/CategoryPicker.jsx';
import Today from '../home/Today.jsx';

import CategoryManager from '../../server/managers/CategoryManager.jsx';
import { appbar } from '../../styles/styles.css.js';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: undefined,
      openWarning: false,
      openSeeTasks: false,
      checked: false,
      openEditMode: false,
      newCategory: undefined,
      newCategoryName: '',
      fakeCategories: [],
    };
    this.setCategory = this.setCategory.bind(this);
    this.setNewCategory = this.setNewCategory.bind(this);
    this.setNewCategoryName = this.setNewCategoryName.bind(this);
    this.handleOpenWarning = this.handleOpenWarning.bind(this);
    this.handleCloseWarning = this.handleCloseWarning.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.handleOpenSeeTasks = this.handleOpenSeeTasks.bind(this);
    this.handleCloseSeeTasks = this.handleCloseSeeTasks.bind(this);
    this.handleOpenEditMode = this.handleOpenEditMode.bind(this);
    this.handleCloseEditMode = this.handleCloseEditMode.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
  }

  componentWillUpdate() {
    console.log(this.state.fakeCategories);
  }

  setCategory(activeCategory) {
    this.setState({ activeCategory });
  }

  setNewCategory(newCategory) {
    this.setState({ newCategory });
  }

  setNewCategoryName(event) {
    this.setState({ newCategoryName: event.target.value });
  }

  deleteCategory() {
    //TODO
  }

  handleOpenWarning() {
    this.setState({ openWarning: true });
  }

  handleCloseWarning(confirmed) {
    if (confirmed) {
      this.deleteCategory();
    }
    this.setState({ openWarning: false, checked: false });
  }

  handleOpenSeeTasks() {
    this.setState({ openSeeTasks: true });
  }

  handleCloseSeeTasks() {
    this.setState({ openSeeTasks: false });
  }

  handleOpenEditMode(isCreating) {
    if (!isCreating) {
      const { title } = this.state.activeCategory;
        this.setState({
          openEditMode: true,
          isCreating,
          newCategoryName: title,
          newCategory: CategoryManager.getCategoryIcon(this.state.activeCategory)
        });
    } else {
      this.setState({ openEditMode: true, isCreating });
    }
  }

  handleCloseEditMode() {
    this.setState({ openEditMode: false, newCategory: undefined, newCategoryName: '' });
  }

  handleSaveCategory() {
    if (this.state.isCreating) {
      const newFake = {
        name: this.state.newCategoryName,
        title: this.state.newCategory.title,
        icon: this.state.newCategory.title,
      };

      const copy = this.state.fakeCategories;
      copy.push(newFake);

      this.setState({
        openEditMode: false,
        newCategoryName: '',
        newCategory: undefined,
        fakeCategories: copy,
        snackMessage: 'Category created successfuly!',
        openSnack: true,
      });
    } else {
      //TODO
      //EDIT Category
      //name: this.state.newCategoryName
      //icon: this.state.newCategory.title
      this.setState({
        openEditMode: false,
        snackMessage: 'Category edited successfuly!',
        openSnack: true,
       });
    }
  }

  closeSnack() {
    this.setState({ openSnack: false });
  }

  updateCheck() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const style = {
      margin: 12,
    };

    const customContentStyle = {
      width: '100%',
    };

    const disabled = !this.state.activeCategory;

    const actions = [
       <FlatButton
         label="Cancel"
         secondary
         keyboardFocused
         onClick={() => this.handleCloseWarning(false)}
       />,
       <FlatButton
         label="Confirm"
         primary
         onClick={() => this.handleCloseWarning(true)}
       />,
     ];

     const seeTaskActions = [
        <FlatButton
          label="Close"
          onClick={() => this.handleCloseSeeTasks()}
        />,
      ];

      const editModeActions = [
         <FlatButton
           label="Cancel"
           secondary
           onClick={() => this.handleCloseEditMode()}
         />,
         <FlatButton
           label="Save"
           primary
           disabled={!this.state.newCategoryName || this.state.newCategoryName.length <= 0 || this.state.newCategory === undefined}
           onClick={() => this.handleSaveCategory()}
         />,
       ];

    return (
      <div>
        <Toolbar style={appbar.barLayout}>
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ marginLeft: '15px' }} text="Categories" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              style={{ margin: '0px 25px 0px 20px' }}
              primary
              label='Add Category'
              labelPosition="before"
              onClick={() => this.handleOpenEditMode(true)}
              icon={<Add />}
            />
          </ToolbarGroup>
        </Toolbar>
        <div style={{ textAlign: 'center' }}>
          <RaisedButton
            label="See tasks"
            onClick={() => this.handleOpenSeeTasks()}
            primary style={style}
            disabled={disabled}
          />
          <RaisedButton
            label="Edit"
            primary
            onClick={() => this.handleOpenEditMode(false)}
            style={style}
            disabled={disabled}
          />
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
          fakeCategories={this.state.fakeCategories}
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
                label="Delete all tasks associated to this category."
                checked={this.state.checked}
                onCheck={this.updateCheck}
                style={{ fontSize: '13px' }}
              />
            </div>
          </Dialog>
        }
        {
          this.state.activeCategory && this.state.openSeeTasks &&
          <Dialog
            actions={seeTaskActions}
            modal={false}
            open={this.state.openSeeTasks}
            onRequestClose={() => this.handleCloseSeeTasks()}
            contentStyle={customContentStyle}
          >
            <Today
              title="Scheduled Tasks"
              height={300}
              withFilter={false}
              fromCategoriesManager
              category={this.state.isCreating ? this.state.newCategory : this.state.activeCategory}
            />
          </Dialog>
        }
          <Dialog
            title={this.state.isCreating ? 'Create category' : 'Edit category'}
            actions={editModeActions}
            modal={false}
            open={this.state.openEditMode}
            onRequestClose={() => this.handleCloseEditMode()}
          >
            <div style={{ marginTop: -10 }}>
              <TextField
                autoFocus
                value={this.state.newCategoryName}
                hintText="Category name"
                floatingLabelText="Category name"
                fullWidth
                onChange={event => this.setNewCategoryName(event)}
              />
              <p>Choose an icon</p>
              <div style={{ marginTop: 10 }}>
                <CategoryPicker
                  onChange={this.setNewCategory}
                  category={this.state.isCreating ? this.state.newCategory : this.state.activeCategory}
                  noNames
                  fromManager
                />
              </div>
            </div>
          </Dialog>
          <Snackbar
          open={this.state.openSnack}
          message={this.state.snackMessage}
          autoHideDuration={2000}
          onRequestClose={this.closeSnack}
          />
      </div>
    );
  }
}

export default Calendar;
