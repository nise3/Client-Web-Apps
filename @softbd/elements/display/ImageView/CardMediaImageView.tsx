import React from 'react';
import TextInputSkeleton from '../skeleton/TextInputSkeleton/TextInputSkeleton';
import {Box, CardMedia} from '@mui/material';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../common/apiRoutes';

interface CardMediaImageViewProps {
  imageUrl: string;
  sx?: any;
  imageAltText?: string;
  isLoading?: boolean;
  title?: string;
  className?: string;
  height?: string;
  width?: string;
}

const CardMediaImageView = ({
  imageUrl,
  sx,
  imageAltText,
  isLoading,
  title,
  className,
  height,
  width,
}: CardMediaImageViewProps) => {
  const absoluteImageUrl = FILE_SERVER_FILE_VIEW_ENDPOINT + imageUrl || '';

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Box>
      <CardMedia
        component='img'
        image={absoluteImageUrl}
        sx={sx}
        alt={imageAltText ? imageAltText : 'Image'}
        title={title}
        className={className}
        height={height}
        width={width}
      />
    </Box>
  );
};

export default CardMediaImageView;
