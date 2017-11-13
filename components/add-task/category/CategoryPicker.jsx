import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';

import { blue500, red500 } from 'material-ui/styles/colors';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CategoryManager from '../../../server/managers/CategoryManager.js';

import CategoryItem from './CategoryItem.jsx';

/** @private */
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridList: {
    display: 'flex',
    width: 650,
    height: 125,
    overflowY: 'auto',
    marginTop: '-10px',
    paddingTop: '7px',
    border: '1px solid #E0E0E0'
  },
};

class CategoryPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: CategoryManager.loadCategories()
    }
  }

  render() {
    const categories = this.state.categories;
    return (
      <div>
        <p style={{color: '#BDBDBD', fontSize: 'small', fontFamily: 'Roboto'}}>Choose a Category</p>
        <div style={styles.root}>
          <GridList
            cellHeight={105}
            cols={6}
            style={styles.gridList}
          >
            {categories.map((category, index) => (
              <GridTile
                key={index}
                titleBackground={'rgba(0, 0, 0, 0)'}
              >
              <div onClick={() => console.log("Click!")}>
                {/* Avatars don't have onClick... */}
                <CategoryItem />
              </div>
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default CategoryPicker;
