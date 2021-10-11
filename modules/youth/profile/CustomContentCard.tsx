import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import CustomParabolaButton from './component/CustomParabolaButton';
import VerticalLine from './component/VerticalLine';
import React, {ReactElement} from 'react';
import {createStyles, makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {AccessTime, BorderColor} from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import CircularDeleteButton from './component/CircularDeleteButton';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    skillIssueDate: {
      display: 'flex',
      flexDirection: 'row',
      color: theme.palette.primary.main,
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
  contentLogo: string;
  contentServiceProvider: string | ReactElement;
  contentEditButton?: any;
  date?: string;
  location?: string;
  contentDeleteButton?: () => void;
};

const CustomContentCard = ({
  contentTitle,
  contentLogo,
  contentServiceProvider,
  contentEditButton,
  date,
  location,
  contentDeleteButton,
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
        <Grid item>
          <Grid container>
            {contentLogo && (
              <Avatar alt={contentTitle + ' logo'} src={contentLogo} />
            )}
            <Grid item>
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
          <Grid item>
            <Grid container justifyContent={'flex-end'}>
              <Box>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onclick={contentEditButton}
                />
                {contentDeleteButton && (
                  <CircularDeleteButton
                    deleteAction={contentDeleteButton}
                    deleteTitle={'delete'}
                  />
                )}
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
