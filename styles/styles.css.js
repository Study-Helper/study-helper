/* "CSS in JS" */

export const sidebar = {
  link: {
    textDecoration: 'none'
  },
  menuItem: {
    height: '60px',
    lineHeight: '57px',
    verticalAlign: 'top'
  },
  icon: {
    width: '23px',
    height: '23px',
    marginTop: '17px'
  },
  focusedItem: {
    height: '60px',
    lineHeight: '57px',
    backgroundColor: 'rgba(0, 0, 255, 0.2)'
  },
  component: {
    paddingLeft: '177px'
  }
};

export const appbar = {
  barLayout: {
    width: '705px',
    height: '60px',
    marginTop: '-8px'
  }
};

export const taskDescription = {
  description: {
    fontFamily: 'Roboto',
    paddingLeft: '73px'
  },
  icon: {
    paddingLeft: '20px',
    paddingTop: '7px'
  }
};

export const subjectDescription = {
  description: {
    fontFamily: 'Roboto',
    paddingLeft: '73px'
  },
  icon: {
    paddingLeft: '20px',
    paddingTop: '7px'
  }
};

export const taskList = {
  list: {
    width: '695px',
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
    marginTop: '15px'
  },
  grades: {
    marginTop: '15px',
    marginLeft: '165px'
  }
};

export const addTask = {
  window: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  button: {
    float: 'right',
    marginLeft: '10px'
  }
};

export const categoryPicker = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    float: 'right'
  },
  rootNoTitle: {
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
  largeGrid: {
    display: 'flex',
    width: 675,
    maxHeight: 420,
    overflowY: 'auto',
    border: 'none',
    marginTop: 10
  },
  // TODO: This is not well.
  infoText: {
    color: '#BDBDBD',
    fontFamily: 'Roboto',
    fontSize: '18px',
    height: '40px',
    lineHeight: '40px',
    marginRight: '10px'
  },
  categoryItemDefault: {
    height: '85px'
  },
  categoryItemSelected: {
    height: '85px',
    backgroundColor: 'rgba(220, 220, 220, 1)',
    borderRadius: '5px'
  },
  categoryNoTitleItemSelected: {
    height: '65px', //85
    backgroundColor: 'rgba(220, 220, 220, 1)',
    borderRadius: '5px'
  }
};

export const categoryItem = {
  avatar: {
    marginLeft: '28px',
    marginTop: '7px'
  },
  avatarNoTitle: {
    marginLeft: '15px',
    marginTop: '7px'
  },
  font: {
    textAlign: 'center',
    fontSize: 'small',
    fontFamily: 'Roboto',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: '6px',
    wordWrap: 'pre-line'
  }
};

export const StudentsMeanText = {
  textAlign:'center',
  fontFamily: 'Roboto',
  color: 'rgba(0, 0, 0, 1)'
};
