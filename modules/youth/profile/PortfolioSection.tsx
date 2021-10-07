import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {BorderColor} from '@mui/icons-material';
import HorizontalLine from './component/HorizontalLine';
import CustomCarousel from '../../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import CardItem from './component/CardItem';
import React from 'react';
import {useIntl} from 'react-intl';

let items = [
  {
    img: '/images/popular-course1.png',
    price: '৫০০০',
    title: 'লিডারশিপ স্কিল',
    duration: '১ ঘন্টা ৩০ মিনিট',
    enrolls: 'Student (16.1k)',
  },

  {
    img: '/images/popular-course2.png',
    price: '৩০০০',
    title: 'প্রফেশনাল মাস্টার ক্লাস',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    img: '/images/popular-course3.png',
    price: 'বিনামূল্যে',
    title: 'কম্পিঊটার স্কিল',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    img: '/images/popular-course4.png',
    price: '২০০০',
    title: 'সেলস ট্রেনিং',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
];

type PortfolioSectionProp = {
  openPortfolioAddEditForm: (itemId: number | null) => void;
};

const PortfolioSection = ({openPortfolioAddEditForm}: PortfolioSectionProp) => {
  const {messages} = useIntl();

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <CardHeader
            headerTitle={messages['common.portfolio'] as string}
            buttons={[
              {
                label: messages['common.add_new_portfolio'] as string,
                icon: <BorderColor />,
                onclick: () => openPortfolioAddEditForm(null),
              },
              {
                label: messages['common.edit_btn'] as string,
                icon: <BorderColor />,
                onclick: () => openPortfolioAddEditForm(1),
              },
            ]}
          />
        </CardContent>
        <HorizontalLine />
        <Box>
          <CustomCarousel>
            {items.map((item: any, key: number) => CardItem(item, key))}
          </CustomCarousel>
        </Box>
      </Card>
    </Box>
  );
};
export default PortfolioSection;
