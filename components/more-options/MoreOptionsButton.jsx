import React from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { grey400 } from 'material-ui/styles/colors';
import { moreOptions } from '../../styles/styles.css.js';

/** @private */
const iconButtonElement = (
  <IconButton touch>
    <MoreVertIcon color={grey400} />
  </IconButton>
);

/**
 * Inject the options that you want.
 * IMPORTANT: touchTapCloseDelay should be as small as possible, otherwise it looks strange.
 * @see http://www.material-ui.com/#/components/icon-menu
 * @param options - Objects of type { name: string, onClickFunction: function }
 */
const MoreOptionsButton = ({ options }) => (
  <IconMenu 
    iconButtonElement={iconButtonElement} 
    touchTapCloseDelay={1} 
    style={moreOptions.icon}
  >
    {options.map((option, index) =>
      <MenuItem key={index} onClick={option.onClickFunction}>
        {option.name}
      </MenuItem>
    )}
  </IconMenu>
);

export default MoreOptionsButton;
