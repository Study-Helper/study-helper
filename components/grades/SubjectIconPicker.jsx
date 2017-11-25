import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';

import SubjectIconsManager from '../../server/managers/SubjectIconsManager.jsx';
import SubjectIconItem from './SubjectIconItem.jsx';

import { categoryPicker } from '../../styles/styles.css.js';

class SubjectIconPicker extends React.Component {

  constructor(props) {
    super(props);
    const icons = SubjectIconsManager.getAllIcons();
    this.state = {
      icons: icons,
      chosenIcon: undefined
    };
    this.setIcon = this.setIcon.bind(this);
  }

  setIcon(icon) {
    this.setState({ chosenIcon: icon });
    this.props.onChange(icon);
  }

  render() {
    const icons = this.state.icons;
    return (
      <div style={{'marginTop': '10px'}}>
        <div style={categoryPicker.rootNoTitle}>
          <GridList
            cellHeight={70}
            cols={7}
            style={categoryPicker.grid}
          >
            {
              icons.map((icon, index) => (
              <GridTile
                key={index}
                rows={0}
                titleBackground={'rgba(0, 0, 0, 0)'}
              >
              <div
                style={this.state.chosenIcon === icon
                  ? (categoryPicker.categoryNoTitleItemSelected)
                  : categoryPicker.categoryItemDefault}
                onClick={() => this.setIcon(icon)}
              >
                <SubjectIconItem icon={icon} />
              </div>
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

SubjectIconPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string
};

export default SubjectIconPicker;