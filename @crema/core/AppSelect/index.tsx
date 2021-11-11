import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';

const PREFIX = 'AppSelect';

const classes = {
  selectBox: `${PREFIX}-selectBox`,
  selectOption: `${PREFIX}-selectOption`,
};

const StyledSelect = styled(Select)(({theme}) => ({
  [`&.${classes.selectBox}`]: {
    marginLeft: 8,
    cursor: 'pointer',
    fontSize: 14,
    [theme.breakpoints.up('xl')]: {
      marginLeft: 24,
    },
    '& .MuiSelect-select': {
      paddingLeft: 10,
    },
  },

  [`& .${classes.selectOption}`]: {
    cursor: 'pointer',
    padding: 8,
    fontSize: 14,
  },
}));

interface AppSelectProps {
  menus: string[] | any[];
  onChange: (value: any) => void;
  defaultValue: any;
  selectionKey?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  menus = [],
  onChange,
  defaultValue = '',
  selectionKey = '',
}) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  const handleSelectionType = (event: any) => {
    setSelectionType(event.target.value);
    onChange(event.target.value);
  };

  return (
    <StyledSelect
      defaultValue={defaultValue}
      value={selectionType}
      onChange={handleSelectionType}
      className={clsx(classes.selectBox, 'select-box')}>
      {menus.map((menu: any, index: number) => (
        <MenuItem
          key={index}
          value={selectionKey ? menu[selectionKey] : menu}
          className={classes.selectOption}>
          {selectionKey ? menu[selectionKey] : menu}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default AppSelect;
