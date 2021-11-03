import React from 'react';
import ImageCarousel from '../../@softbd/elements/display/ImageCarousel/ImageCarousel';

const images = [
  '/images/institute/cover1.jpg',
  '/images/institute/cover2.jpg',
  '/images/institute/cover3.jpg',
];

const headings = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
];

const CoverArea = () => {
  return (
    <>
      <ImageCarousel images={images} headings={headings} />
    </>
  );
};

export default CoverArea;
