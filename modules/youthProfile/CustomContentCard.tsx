import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import CustomParabolaButton from './component/CustomParabolaButton';
import VerticalLine from './component/VerticalLine';
import React from 'react';
import {createStyles, makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';
import {AccessTime, BorderColor} from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Box, Grid, Typography} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    skillIssueDate: {
      display: 'flex',
      flexDirection: 'row',
      color: 'green',
    },
    accessTime: {
      marginTop: '2px',
      marginLeft: '5px',
    },
    skillCard: {
      marginTop: '16px',
    },
  }),
);

type CustomContentCardProp = {
  contentTitle: string;
  contentLogo: any;
  contentServiceProvider: string | element;
  contentEditButton?: any;
  date?: string;
  location?: string;
};

const CustomContentCard = ({
  contentTitle,
  contentLogo,
  contentServiceProvider,
  contentEditButton,
  date,
  location,
}: CustomContentCardProp) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <>
      <HorizontalLine />

      <Grid
        container
        justifyContent={'space-between'}
        className={classes.skillCard}>
        <Grid item sm={6}>
          <Grid container>
            {contentLogo && <Grid item>{contentLogo}</Grid>}
            <Grid item sm={6}>
              <Box ml={1} mb={2}>
                <Typography variant={'subtitle2'}>{contentTitle}</Typography>
                <Typography variant={'caption'}>
                  {contentServiceProvider}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {contentEditButton && (
          <Grid item sm={6}>
            <Grid container justifyContent={'flex-end'}>
              <Box>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onclick={contentEditButton}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item container>
        {location && (
          <Box className={classes.skillIssueDate} mb={4}>
            <AccessTime />
            <Typography className={classes.accessTime}>{date}</Typography>
            <VerticalLine
              lineHeight={'15px'}
              lineWidth={'2px'}
              marginLeft={2}
              marginRight={2}
            />
            {location && (
              <Box className={classes.skillIssueDate}>
                <LocationOnIcon />
                <Typography>{location}</Typography>
              </Box>
            )}
          </Box>
        )}
      </Grid>
    </>
  );
};

export default CustomContentCard;
