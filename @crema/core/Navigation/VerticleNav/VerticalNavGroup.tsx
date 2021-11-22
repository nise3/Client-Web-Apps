import React, {useContext} from 'react';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import IntlMessages from '../../../utility/IntlMessages';
import {NavItemProps} from '../../../../modules/routesConfig';
import {styled} from '@mui/material/styles';
import {ListItem} from '@mui/material';
import {ThemeMode} from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import AppContext from '../../../utility/AppContext';

interface VerticalNavGroupProps {
  item: NavItemProps;
  level: number;
}

const StyledListItem = styled(ListItem)(({theme}) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  return {
    height: 40,
    marginTop: 2,
    marginBottom: 2,
    color:
      themeMode === ThemeMode.LIGHT
        ? theme.palette.text.secondary
        : 'rgba(255,255,255,0.38)',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'none!important',

    [theme.breakpoints.up('xl')]: {
      marginTop: 4,
      marginBottom: 4,
    },
    '&.nav-item-header': {
      textTransform: 'uppercase',
    },
  };
});

const VerticalNavGroup: React.FC<VerticalNavGroupProps> = ({item, level}) => {
  return (
    <>
      <StyledListItem
        // @ts-ignore
        component='li'
        className={'nav-item nav-item-header'}
        style={{
          paddingLeft: 24 + 20 * level,
          paddingRight: 12,
        }}>
        {<IntlMessages id={item.messageId} />}
      </StyledListItem>

      {item.children && Array.isArray(item.children) && (
        <>
          {item.children.map((item: any) => (
            <React.Fragment key={item.id}>
              {item.type === 'group' && (
                <VerticalNavGroup item={item} level={level} />
              )}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default VerticalNavGroup;
