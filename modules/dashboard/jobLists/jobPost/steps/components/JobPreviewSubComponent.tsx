import React from 'react';
import {S2} from '../../../../../../@softbd/elements/common';
import {Box} from '@mui/material';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

interface Props {
  title: string | MessageFormatElement[];
  titleProps?: any;
  children: React.ReactNode;
  childContainerProps?: any;
}

const JobPreviewSubComponent = ({
  title,
  titleProps,
  children,
  childContainerProps,
}: Props) => {
  return (
    <React.Fragment>
      <S2 mt={2} fontWeight={'bold'} {...titleProps}>
        {title}
      </S2>
      <Box
        mt={1}
        paddingLeft={'20px'}
        color={'grey.600'}
        whiteSpace={'break-spaces'}
        {...childContainerProps}>
        {children}
      </Box>
    </React.Fragment>
  );
};

export default JobPreviewSubComponent;
