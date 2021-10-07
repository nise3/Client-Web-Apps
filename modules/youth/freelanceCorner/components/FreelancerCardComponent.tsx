import React, {FC} from 'react';
import {Avatar, Box, Button, Card, CardContent} from '@mui/material';
import {useIntl} from 'react-intl';
import TagChip from '../../../../@softbd/elements/display/TagChip';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';

interface FreelancerCardComponentProps {
  freelancer: {
    image: string;
    name: string;
    designation: string;
    description?: string;
    skills: string[];
  };
}

const useStyles = makeStyles((theme: CremaTheme) => ({
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  colorGray: {
    color: theme.palette.gray['600'],
  },
}));

const FreelancerCardComponent: FC<FreelancerCardComponentProps> = ({
  freelancer,
}) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Card>
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex'}}>
            <Avatar
              src={freelancer.image}
              sx={{width: '60px', height: '60px'}}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 2,
              }}>
              <Box className={classes.titleStyle}>{freelancer.name}</Box>
              <Box className={classes.colorGray}>{freelancer.designation}</Box>
            </Box>
          </Box>
          <Box>
            <Button variant={'contained'} color={'primary'}>
              {messages['common.contact_now']}
            </Button>
          </Box>
        </Box>
        <Box sx={{margin: '15px 0px'}}>{freelancer.description}</Box>
        <Box>
          {(freelancer.skills || []).map((skill: any, index: any) => {
            return <TagChip label={skill} key={index} />;
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FreelancerCardComponent;
