import React, {useState} from 'react';
import {
  Grow,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import clsx from 'clsx';
import {Popper, Reference} from 'react-popper';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalItem from './HorizontalItem';
import ClientOnlyPortal from './ClientPortal';
import IntlMessages from '../../../utility/IntlMessages';
import {classes, StyledManager} from './HorizontalGroup.style';
import {NavItemProps} from '../../../../modules/routesConfig';
import {useRouter} from 'next/router';

interface HorizontalGroupProps {
  item: NavItemProps;
  nestedLevel?: number;
}

const HorizontalGroup: React.FC<HorizontalGroupProps> = ({
  item,
  nestedLevel = 0,
}) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const handleToggle = (open: boolean) => {
    setOpened(open);
  };

  function isUrlInChildren(parent: any, url: string) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (
        parent.children[i].url === url ||
        url.includes(parent.children[i].url)
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <StyledManager>
      <Reference>
        {({ref}) => (
          <ListItem
            ref={ref}
            className={clsx(
              'navItem',
              isUrlInChildren(item, router.pathname) && 'active',
            )}
            onMouseEnter={() => handleToggle(true)}
            onMouseLeave={() => handleToggle(false)}
            aria-haspopup='true'>
            {item.icon && (
              <Icon color='action' className='navLinkIcon'>
                {item.icon}
              </Icon>
            )}
            <ListItemText
              primary={<IntlMessages id={item.messageId} />}
              classes={{primary: clsx(classes.fontBold, 'uppercase')}}
            />
            {nestedLevel > 0 && (
              <IconButton disableRipple className={classes.ml2} size='large'>
                <Icon className={clsx(classes.textLg, 'arrow-icon')}>
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            )}
          </ListItem>
        )}
      </Reference>

      <ClientOnlyPortal selector='#root'>
        <Popper placement={nestedLevel === 0 ? 'bottom-start' : 'right'}>
          {({ref, style, placement}) =>
            opened && (
              <div
                ref={ref}
                style={{
                  ...style,
                  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
                  zIndex: 1110 + nestedLevel,
                }}
                data-placement={placement}
                className={clsx(classes.popper, {
                  [classes.popperClose]: !opened,
                })}>
                <Grow in={opened} style={{transformOrigin: '0 0 0'}}>
                  <Paper
                    onMouseEnter={() => handleToggle(true)}
                    onMouseLeave={() => handleToggle(false)}>
                    {item.children && Array.isArray(item.children) && (
                      <ul className={clsx(classes.children, classes.pl0)}>
                        {item.children.map((item: any) => (
                          <React.Fragment key={item.id}>
                            {item.type === 'group' && (
                              <HorizontalGroup
                                item={item}
                                nestedLevel={nestedLevel}
                              />
                            )}

                            {item.type === 'collapse' && (
                              <HorizontalCollapse
                                item={item}
                                nestedLevel={nestedLevel}
                              />
                            )}

                            {item.type === 'item' && (
                              <HorizontalItem
                                item={item}
                                // nestedLevel={nestedLevel}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </ul>
                    )}
                  </Paper>
                </Grow>
              </div>
            )
          }
        </Popper>
      </ClientOnlyPortal>
    </StyledManager>
  );
};
export default React.memo(HorizontalGroup);
