import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Search from 'material-ui/svg-icons/action/search';
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
    this.props.onChange(category);
  }

  render() {
    const categories = this.state.categories;
    return (
      <div>
        <span style={categoryPicker.infoText}>Choose a Category</span>
        <div style={{ position: 'relative', display: 'inline-block', float: 'right' }}>
          <Search style={{ position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red' }}/>
          <TextField hintText="Search" style={{ textIndent: 30, width: '120px', paddingRight: 30 }}/>
        </div>
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

CategoryPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CategoryPicker;
