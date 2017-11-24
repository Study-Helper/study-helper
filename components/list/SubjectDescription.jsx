import React from 'react';
import { ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/description';
import { subjectDescription, taskDescription} from '../../styles/styles.css.js';

import Book from 'material-ui/svg-icons/action/book';

const SubjectDescription = ({ description }) => (
  <ListItem 
    disabled 
    style={subjectDescription.description} 
    key={1}
    leftIcon={<Book style={taskDescription.icon} />}
    secondaryText={ description }
    secondaryTextLines={2}
  />
);

export default SubjectDescription;