import React from 'react';
import { ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/description';
import { subjectDescription, taskDescription} from '../../styles/styles.css.js';

import Book from 'material-ui/svg-icons/action/book';
import Info from 'material-ui/svg-icons/action/info-outline';

const SubjectDescription = ({ description }) => (
	<ListItem
    disabled
		disableTouchRipple
    style={subjectDescription.description}
    key={1}
    leftIcon={
    	description === 'No tests available.' ? <Info style={taskDescription.icon} /> :
    		<Book style={taskDescription.icon} />
    }
    secondaryText={ description }
    secondaryTextLines={2}
	 />
);

export default SubjectDescription;
