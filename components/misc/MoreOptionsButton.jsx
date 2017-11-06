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
 * Example: <MoreOptionsButton options={['Edit', 'Delete']} />
 */
const MoreOptionsButton = ({ options }) => (
  <IconMenu iconButtonElement={iconButtonElement} style={moreOptions.icon}>
    {options.map((option, index) =>
      <MenuItem key={index}>{option}</MenuItem>
    )}
  </IconMenu>
);

export default MoreOptionsButton;
