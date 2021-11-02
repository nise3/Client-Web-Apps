import {Box, Button, Card, CardMedia} from '@mui/material';
import {createStyles, makeStyles} from '@mui/styles';
import {BorderColor} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import CircularDeleteButton from './CircularDeleteButton';
import React from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    image: {
      width: '100%',
      height: '150px',
    },
    buttons: {
      position: 'absolute',
      left: '5%',
      top: '4%',
      zIndex: 1,
      display: 'none',
      background: '#fff',
    },
    deleteButtons: {
      position: 'absolute',
      right: '5%',
      top: '4%',
      zIndex: 1,
      display: 'none',
      background: '#fff',
      borderRadius: 40,
      border: '1px solid',
      borderColor: theme.palette.error.main,
    },
    circularDeleteButton: {
      border: 'none',
    },
    box: {
      position: 'relative',
      '&:hover $buttons': {
        display: 'block !important',
        borderRadius: 40,
      },
      '&:hover $deleteButtons': {
        display: 'block !important',
        borderRadius: 40,
      },
    },
    editButton: {
      borderRadius: 40,
    },
  }),
);

interface cardItemWithButtonProps {
  portfolio: any;
  onClick: () => void;
  onDeletePortfolio: (itemId: number) => void;
}

const CardItemWithButton = ({
  portfolio,
  onClick: onclickHandler,
  onDeletePortfolio,
}: cardItemWithButtonProps) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Box mr={1} ml={1} key={portfolio?.id}>
      <Card>
        <Box className={classes.box}>
          <div className={classes.buttons}>
            <Button
              variant={'outlined'}
              color={'primary'}
              className={classes.editButton}
              onClick={onclickHandler}>
              <BorderColor />
              {messages['common.edit_btn']}
            </Button>
          </div>
          <div className={classes.deleteButtons}>
            <CircularDeleteButton
              className={classes.circularDeleteButton}
              deleteAction={() => {
                onDeletePortfolio(portfolio?.id);
              }}
              deleteTitle={'Delete'}
            />
          </div>
          <CardMedia
            component='img'
            alt='port folio'
            className={classes.image}
            image={
              portfolio?.file_path
                ? portfolio.file_path + '?id=' + portfolio.id
                : '/images/youth/portfolio.jpeg'
            }
          />
          {/*<Image
            className={classes.image}
            src={
              portfolio?.file_path
                ? portfolio.file_path
                : '/images/youth/portfolio.jpeg'
            }
            alt='crema-logo'
            height={50}
            width={'100%'}
            layout={'responsive'}
          />*/}
        </Box>
      </Card>
    </Box>
  );
};

export default CardItemWithButton;
