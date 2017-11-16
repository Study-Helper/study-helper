import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';
import CategoryManager from '../../../server/managers/CategoryManager.jsx';
import CategoryItem from './CategoryItem.jsx';

import { blue500, red500 } from 'material-ui/styles/colors';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { categoryPicker } from '../../../styles/styles.css.js';

class CategoryPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: CategoryManager.loadCategories(),
      chosenCategory: null // TODO: Default to the first item
    }
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category) {
    this.setState({ chosenCategory: category });
  }

  render() {
    const categories = this.state.categories;
    return (
      <div>
        <p style={categoryPicker.infoText}>Choose a Category</p>
        <div style={categoryPicker.root}>
          <GridList
            cellHeight={100}
            cols={6}
            style={categoryPicker.grid}
          >
            {categories.map((category, index) => (
              <GridTile
                key={index}
                titleBackground={'rgba(0, 0, 0, 0)'}
              >
              <div
                style={this.state.chosenCategory === category
                  ? categoryPicker.categoryItemSelected
                  : categoryPicker.categoryItemDefault}
                onClick={() => this.setCategory(category)}
              >
                <CategoryItem category={category} />
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
