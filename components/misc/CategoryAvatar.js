import React from 'react';
import Avatar from 'material-ui/Avatar';
import categories from '../../server/categories.js';
import { taskList } from '../../styles/styles.css.js';

/** @private */
const getCategoryAvatarData = (category) => categories[category];

const CategoryAvatar = ({ category }) => (
  <Avatar
    size={35}
    icon={getCategoryAvatarData(category).icon}
    backgroundColor={getCategoryAvatarData(category).backgroundColor}
    style={taskList.avatar}
  />
);

export default CategoryAvatar;
