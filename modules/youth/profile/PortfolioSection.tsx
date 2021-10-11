import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {BorderColor} from '@mui/icons-material';
import HorizontalLine from './component/HorizontalLine';
import CustomCarousel from '../../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import CardItemWithButton from './component/CardItemWithButton';
import PortfolioAddEdit from './PortfolioAddEdit';

let items = [
  {
    id: 1,
    img: '/images/popular-course1.png',
    price: '৫০০০',
    title: 'লিডারশিপ স্কিল',
    duration: '১ ঘন্টা ৩০ মিনিট',
    enrolls: 'Student (16.1k)',
  },

  {
    id: 2,
    img: '/images/popular-course2.png',
    price: '৩০০০',
    title: 'প্রফেশনাল মাস্টার ক্লাস',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    id: 3,
    img: '/images/popular-course3.png',
    price: 'বিনামূল্যে',
    title: 'কম্পিঊটার স্কিল',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
];

const PortfolioSection = () => {
  const {messages} = useIntl();
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const [isOpenPortfolioAddEditForm, setIsOpenPortfolioAddEditForm] =
    useState<boolean>(false);

  const openPortfolioAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setPortfolioId(itemId);
      setIsOpenPortfolioAddEditForm(true);
    },
    [],
  );
  const closePortfolioAddEditForm = useCallback(() => {
    setPortfolioId(null);
    setIsOpenPortfolioAddEditForm(false);
  }, []);

  return isOpenPortfolioAddEditForm ? (
    <PortfolioAddEdit
      itemId={portfolioId}
      onClose={closePortfolioAddEditForm}
    />
  ) : (
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
          ]}
        />
      </CardContent>
      <HorizontalLine />
      <Box>
        <CustomCarousel>
          {items.map((item: any) => {
            return (
              <React.Fragment key={item.id}>
                <CardItemWithButton
                  item={item}
                  onClick={() => openPortfolioAddEditForm(item.id)}
                />
              </React.Fragment>
            );
          })}
        </CustomCarousel>
      </Box>
    </Card>
  );
};
export default PortfolioSection;
