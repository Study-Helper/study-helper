import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';

import CategoryManager from '../../../server/managers/CategoryManager.jsx';
import { categoryItem } from '../../../styles/styles.css.js';

const CategoryItem = ({ category }) => (
  <div>
   <Avatar
    size={50}
    icon={CategoryManager.getCategoryIcon(category)}
    backgroundColor={CategoryManager.getCategoryBackgroundColor(category)}
    style={categoryItem.avatar}
  />
  <p style={categoryItem.font}>{category.title}</p>
  </div>
);

export default CategoryItem;
