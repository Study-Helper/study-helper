import React from 'react';
import IconButton from 'material-ui/IconButton';
import GoBack from 'material-ui/svg-icons/navigation/chevron-left';
import { appbar } from '../../styles/styles.css.js';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

class AddTaskComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
    console.log(this.context);
    console.log(this.props.location.state);
  }

  render() {
    const goBack = this.props.history.goBack;
    return (
      <Toolbar style={appbar.barLayout}>
        <ToolbarGroup firstChild>
          <IconButton onClick={goBack} tooltip='Back'><GoBack /></IconButton>
          <ToolbarTitle style={{'marginLeft': '15px'}} text='Add Task' />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default AddTaskComponent;
