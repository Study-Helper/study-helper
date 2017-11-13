import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';

import { blue500, red500 } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

import { categoryItem } from '../../../styles/styles.css.js';

// TODO: props would be icon/color? Or maybe string (depends on some external map).
const CategoryItem = () => (
  <div>
   <Avatar
    size={50}
    icon={<EditorInsertChart />}
    backgroundColor={red500}
    style={categoryItem.avatar}
  />
  <p style={categoryItem.font}>Exam</p>
  </div>
);

export default CategoryItem;