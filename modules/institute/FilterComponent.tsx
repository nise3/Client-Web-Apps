import FilterListIcon from '@mui/icons-material/FilterList';
import {Grid, Typography, Box, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import yup from '../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

const FilterComponent = () => {

  const {items} = usePagination({
    count: 10,
  });

  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>('');

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      video_category: yup.string().label(messages['recipient.institute'] as string),
      select_video: yup.string().label(messages['common.name'] as string),
    });
  }, [messages]);

  const {
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {

    setItemData({
      video_category: '',
      select_video: '',
    });
  }, []);

  useEffect(() => {

    reset({
      video_category: itemData.video_category,
      select_video: itemData.select_video,
    });
  }, []);

  return (
    <Box>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <FilterListIcon />
        <Typography ml={2}>Filter</Typography>
        <CustomFormSelect
          id='video_category'
          label={messages['common.location']}
          isLoading={false}
          control={control}
          optionValueProp={'id'}
        />
        <CustomFormSelect
          id='select_video'
          label={messages['common.location']}
          isLoading={false}
          control={control}
          optionValueProp={'id'}
        />
        <Button variant={'contained'} color={'primary'}>Reset</Button>
      </Box>
      <Grid>
        <nav>
          <List>
            {items.map(({page, type, selected, ...item}, index) => {
              let children = null;

              if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                children = '…';
              } else if (type === 'page') {
                children = (
                  <button
                    type='button'
                    style={{
                      fontWeight: selected ? 'bold' : undefined,
                    }}
                    {...item}
                  >
                    {page}
                  </button>
                );
              } else {
                children = (
                  <button type='button' {...item}>
                    {type}
                  </button>
                );
              }

              return <li key={index}>{children}</li>;
            })}
          </List>
        </nav>
      </Grid>
    </Box>
  );
};

export default FilterComponent;
