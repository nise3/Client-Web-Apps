import {Box, Card} from '@mui/material';
import Image from 'next/image';
import React, {useState} from 'react';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {BorderColor} from '@mui/icons-material';
import CardHeader from '../CardHeader';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    image: {
      width: '100%',
      height: '200px',
    },
    buttons: {
      position: 'absolute',
      right: '5%',
      top: '4%',
      zIndex: 1,
    },
    box: {
      position: 'relative',
    },
  }),
);

const CardItem = (item: any, key: number, onClick: any) => {
  const classes = useStyles();
  const {messages} = useIntl();
  const [hovers, setHover] = useState(false);

  return (
    <Box mr={6} key={key}
         onMouseEnter={() => {
           setHover(true);
         }}
         onMouseLeave={() => {
           setHover(false);
         }}>
      <Card>
        <Box className={classes.box}>
          <div className={classes.buttons}
               style={{display: hovers ? 'block' : 'none'}}
          >
            <CardHeader
              buttons={[
                {
                  label: messages['common.edit_btn'] as string,
                  icon: <BorderColor />,
                  onclick: () => onClick(key),
                },
              ]}
            />
          </div>
          <Image
            className={classes.image}
            src={item.img}
            alt='crema-logo'
            height={50}
            width={'100%'}
            layout={'responsive'}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default CardItem;
