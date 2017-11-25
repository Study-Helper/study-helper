import React from 'react';
import Avatar from 'material-ui/Avatar';

import SubjectIconsManager from '../../server/managers/SubjectIconsManager.jsx';
import { categoryItem } from '../../styles/styles.css.js';

const SubjectIconItem = ({ icon }) => (
  <div>
   <Avatar
    size={50}
    icon={SubjectIconsManager.getSubjectIconFromString(icon)}
    backgroundColor={SubjectIconsManager.getSubjectBackgroundColorFromString(icon)}
    style={categoryItem.avatarNoTitle}
   />
  </div>
);

export default SubjectIconItem;
