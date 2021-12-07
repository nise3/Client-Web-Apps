import React from 'react';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../skeleton/TextInputSkeleton/TextInputSkeleton';
import FormLabel from '@mui/material/FormLabel';
import {Box, CardMedia} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';

const PREFIX = 'ImageView';

const classes = {
  label: `${PREFIX}-label`,
  image: `${PREFIX}-image`,
  noImage: `${PREFIX}-noImage`,
};

const StyledBox = styled(Box)(() => {
  return {
    [`& .${classes.label}`]: {
      fontWeight: Fonts.BOLD,
      fontSize: 14,
      marginBottom: '5px',
    },
    [`& .${classes.image}`]: {
      border: '1px solid #e9e9e9',
      width: '99%',
      borderRadius: '5px',
      marginTop: '8px',
    },
    [`& .${classes.noImage}`]: {
      fontWeight: Fonts.MEDIUM,
      fontSize: 14,
      width: '100%',
      minHeight: '40px',
      padding: '8px',
      lineHeight: 1.5,
      boxShadow: '0px 0px 3px #ddd',
      borderRadius: '0.25rem',
      marginTop: '8px',
      maxHeight: '150px',
      overflow: 'auto',
    },
  };
});

interface ImageViewProps {
  label: string | MessageFormatElement[];
  imageUrl: string;
  imageAltText?: string;
  isLoading?: boolean;
}

const ImageView = ({
  label,
  imageUrl,
  imageAltText,
  isLoading,
}: ImageViewProps) => {
  const {messages} = useIntl();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <StyledBox>
      <FormLabel className={classes.label}>{label}</FormLabel>
      {imageUrl ? (
        <CardMedia
          component='img'
          height='194'
          className={classes.image}
          image={imageUrl}
          alt={imageAltText ? imageAltText : 'Image'}
        />
      ) : (
        <div className={classes.noImage}>{messages['common.no_image']}</div>
      )}
    </StyledBox>
  );
};

export default ImageView;
