/* "CSS in JS" */

export const sidebar = {
  link: {
    textDecoration: 'none'
  },
  menuItem: {
    height: '60px'
  },
  focusedItem: {
    height: '60px',
    backgroundColor: 'rgba(0, 0, 255, 0.2)'
  },
  component: {
    paddingLeft: '179px'
  }
};

export const appbar = {
  barLayout: {
    width: '663px',
    height: '60px',
    marginTop: '-8px'
  }
};

export const taskDescription = {
  description: {
    fontFamily: 'Roboto',
    marginTop: '-20px',
    paddingLeft: '73px'
  },
  icon: {
    paddingLeft: '20px',
    paddingTop: '7px'
  }
};

export const taskList = {
  list: {
    width: '665px',
    marginTop: '-9px'
  },
  avatar: {
    marginTop: '3px'
  },
  iconButton: {
    marginTop: '-7px',
    float: 'right'
  }
};

export const moreOptions = {
  icon: {
    float:'right',
    marginTop: '-8px'
  }
};

export const statisticButtons = {
  tasks: {
    marginTop: '20px',
    marginLeft: '162px'
  },
  grades: {
    marginTop: '20px',
    marginLeft: '162px'
  }
};

export const addTask = {
  window: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  button: {
    float: 'right',
    marginTop: '40px'
  }
};

export const categoryPicker = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  grid: {
    display: 'flex',
    width: 650,
    height: 125,
    overflowY: 'auto',
    border: '1px solid #E0E0E0'
  },
  // TODO: This is not well.
  infoText: {
    color: '#BDBDBD',
    fontFamily: 'Roboto'
  },
  categoryItemDefault: {
    height: '85px'
  },
  categoryItemSelected: {
    height: '85px',
    backgroundColor: 'rgba(220, 220, 220, 1)'
  }
};

export const categoryItem = {
  avatar: {
    marginLeft: '24px',
    marginTop: '7px'
  },
  font: {
    textAlign:'center',
    fontSize: 'small',
    fontFamily: 'Roboto',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: '6px',
    wordWrap: 'pre-line'
  }
}
