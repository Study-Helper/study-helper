import React from 'react';
import { blue500, red500 } from 'material-ui/styles/colors';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

const categories = {
  'Studying': {
    icon: <ActionAssignment />,
    backgroundColor: blue500
  },
  'Housekeeping': {
    icon: <EditorInsertChart />,
    backgroundColor: red500
  }
};

export default categories;