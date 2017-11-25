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
    const { fromManager, noNames } = this.props;
    const categories = noNames ? CategoryManager.loadFakeCategories() : CategoryManager.loadCategories();
    // TODO: When entering EditTaskComponent, set the default category to the task's category.
    this.state = {
      searchText: '',
      categories: categories,
      chosenCategory: this.props.category, // Bug where the category seems to be selected, but it's not...
      // chosenCategory: (fromManager || noNames) ? undefined : categories[0],
      searchText: undefined
    };
    this.getCategories = this.getCategories.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.category && this.state.chosenCategory) {
      if (!nextProps.filter && this.state.searchText) {
        this.setState({
          chosenCategory: null,
          searchText: '',
          categories: nextProps.noNames ? CategoryManager.loadFakeCategories() : this.getCategories(nextProps.fakeCategories)
        });
      } else {
        this.setState({ chosenCategory: null });
      }
    }
    if (nextProps.fakeCategories && nextProps.fakeCategories.length > 0)
      this.setState({ categories: nextProps.noNames ? CategoryManager.loadFakeCategories() : this.getCategories(nextProps.fakeCategories) });
  }

  getCategories(fakeCategories) {
    const cats = CategoryManager.loadCategories();
    console.log('fks', fakeCategories);
    if (fakeCategories && fakeCategories.length > 0) {
      return cats.concat(fakeCategories);
    }
    return cats;
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
    const { fromManager, noNames } = this.props;
    const containerMargin = fromManager ? {} : { marginTop: '10px' };
    return (
      <div style={containerMargin}>
        {
          !fromManager &&
          <div>
            <span style={categoryPicker.infoText}>Choose a Category</span>
            <FlatButton label="Create new" primary />
            <div style={{ position: 'relative', display: 'inline-block', float: 'right' }}>
              <Search style={{ position: 'absolute', left: 0, top: 15, width: 20, height: 20, color: '#757575' }} />
              <TextField
                value={this.state.searchText}
                hintText="Search"
                style={{ textIndent: 30, width: '120px', paddingRight: 30 }}
                onChange={this.setSearchText}
              />
            </div>
          </div>
        }
        <div style={noNames ? categoryPicker.rootNoTitle : categoryPicker.root}>
          <GridList
            cellHeight={noNames ? 70 : 100}
            cols={noNames ? 7 : 6}
            style={(fromManager && !noNames) ? categoryPicker.largeGrid : categoryPicker.grid}
          >
            {categories.map((category, index) => (
              <GridTile
                key={index}
                rows={0}
                titleBackground={'rgba(0, 0, 0, 0)'}
              >
              <div
                style={((this.state.chosenCategory && (this.state.chosenCategory.id && (this.state.chosenCategory.id === category.id))) || (this.state.chosenCategory === category))
                  ? (noNames ? categoryPicker.categoryNoTitleItemSelected : categoryPicker.categoryItemSelected)
                  : categoryPicker.categoryItemDefault}
                onClick={() => this.setCategory(category)}
              >
                <CategoryItem category={category} noNames={noNames} />
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
  noNames: PropTypes.bool,
  fakeCategories: PropTypes.array,
};

export default CategoryPicker;
