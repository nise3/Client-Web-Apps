import React from 'react';
import TextInputSkeleton from '../skeleton/TextInputSkeleton/TextInputSkeleton';
import {CardMedia} from '@mui/material';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../common/apiRoutes';

interface CardMediaImageViewProps {
  image: string;
  sx?: any;
  alt?: string;
  isLoading?: boolean;
  title?: string;
  className?: string;
  height?: string;
  width?: string;
}

const CardMediaImageView = ({
  image,
  sx,
  alt,
  isLoading,
  title,
  className,
  height,
  width,
}: CardMediaImageViewProps) => {
  const absoluteImageUrl = FILE_SERVER_FILE_VIEW_ENDPOINT + image || '';

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <CardMedia
      component='img'
      image={absoluteImageUrl}
      sx={sx}
      alt={alt ? alt : 'Image'}
      title={title}
      className={className}
      height={height}
      width={width}
    />
  );
};

export default CardMediaImageView;
