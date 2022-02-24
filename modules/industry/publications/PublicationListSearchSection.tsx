import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import {Search} from '@mui/icons-material';
import React, {useCallback, useRef} from 'react';
import {useIntl} from 'react-intl';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';

const PREFIX = 'MemberListSearchSection';

export const classes = {
  thinSearchButton: `${PREFIX}-thinSearchButton`,
  searchInputBorderHide: `${PREFIX}-searchInputBorderHide`,
};

export const StyledBox = styled(Box)(({theme}) => ({
  background: theme.palette.primary.main,
  color: '#fff',
  paddingTop: 20,
  paddingBottom: 20,

  [`& .${classes.thinSearchButton}`]: {
    color: '#fff',
    padding: '10px 0',
    width: '100%',
    height: '100%',
  },

  [`& .${classes.searchInputBorderHide}`]: {
    padding: 0,
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

interface IProps {
  addFilterKey: (filterKey: string, filterValue: any) => void;
  defaultValue: string;
  label: string;
  onChange: (value: any) => void;
  optionValueProp: string;
  options: any;
  optionTitleProp: any;
}

const PublicationListSearchSection = ({
  addFilterKey,
  defaultValue,
  label,
  optionValueProp,
  options,
  optionTitleProp,
  onChange,
}: IProps) => {
  const {messages} = useIntl();

  const searchTextField = useRef<any>();

  const onSearch = useCallback(() => {
    addFilterKey('search_text', searchTextField.current.value);
  }, []);

  const onClickResetButton = useCallback(() => {
    searchTextField.current.value = '';
    addFilterKey('search_text', '');
    onChange('');
  }, []);

  return (
    <StyledBox sx={{borderTop: '1px solid #340946'}}>
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{alignItems: 'center'}}>
              <Grid container spacing={3} sx={{alignItems: 'center'}}>
                <Grid item xs={8} sm={9}>
                  <TextField
                    inputRef={searchTextField}
                    variant='outlined'
                    name='searchBox'
                    placeholder={messages['common.search'] as string}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position='start'
                          sx={{marginLeft: '20px'}}>
                          <Search />
                        </InputAdornment>
                      ),
                      className: classes.searchInputBorderHide,
                    }}
                    onKeyDown={(event) => {
                      if (event.code == 'Enter') onSearch();
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={3} sx={{paddingRight: '4px'}}>
                  <Button
                    variant='contained'
                    color={'primary'}
                    className={classes.thinSearchButton}
                    onClick={onSearch}>
                    {messages['common.search']}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} display={'flex'} alignItems={'flex-end'}>
            <Button
              fullWidth
              variant={'contained'}
              color={'secondary'}
              size={'small'}
              sx={{
                height: '48px',
                marginBottom: '6px',
              }}
              onClick={onClickResetButton}>
              {messages['common.reset']}
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'author'}
                  defaultValue={defaultValue}
                  label={label}
                  onChange={(value) => onChange(value)}
                  isLoading={false}
                  optionValueProp={optionValueProp}
                  options={options}
                  optionTitleProp={optionTitleProp}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledBox>
  );
};
export default PublicationListSearchSection;
