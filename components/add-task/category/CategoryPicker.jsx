import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
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
      chosenCategory: null, // TODO: Default to the first item
      searchText: ''
    };
    this.setCategory = this.setCategory.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.category && this.state.chosenCategory) {
      if (!nextProps.filter && this.state.searchText) {
        this.setState({
          chosenCategory: null,
          searchText: '',
          categories: CategoryManager.loadCategories()
        });
      } else {
        this.setState({ chosenCategory: null });
      }
    }
  }

  setCategory(category) {
    this.setState({ chosenCategory: category });
    this.props.onChange(category);
  }

  setSearchText(event) {
    let searchText = event.target.value;
    if (searchText && searchText.length > 0) {
      searchText = searchText.toLowerCase();
      const categories = this.state.categories.filter(category => category.title.toLowerCase().includes(searchText));
      this.setState({ categories, searchText });
    } else {
      this.setState({ categories: CategoryManager.loadCategories(), searchText });
    }
  }

  render() {
    const categories = this.state.categories;
    const { fromManager } = this.props;
    const containerMargin = fromManager ? {} : { marginTop: '10px' };
    return (
      <div style={containerMargin}>
        {
          !this.props.fromManager &&
          <div>
            <span style={categoryPicker.infoText}>Choose a Category</span>
            <FlatButton label="Create new" primary />
            <div style={{ position: 'relative', display: 'inline-block', float: 'right' }}>
              <Search style={{ position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: 'red' }} />
              <TextField
                value={this.state.searchText}
                hintText="Search"
                style={{ textIndent: 30, width: '120px', paddingRight: 30 }}
                onChange={this.setSearchText}
              />
            </div>
          </div>
        }
        <div style={categoryPicker.root}>
          <GridList
            cellHeight={100}
            cols={6}
            style={fromManager ? categoryPicker.largeGrid : categoryPicker.grid}
          >
            {categories.map((category, index) => (
              <GridTile
                key={index}
                rows={0}
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
  category: PropTypes.object,
  filter: PropTypes.string,
  createBtn: PropTypes.bool,
  fromManager: PropTypes.bool,
};

export default CategoryPicker;
