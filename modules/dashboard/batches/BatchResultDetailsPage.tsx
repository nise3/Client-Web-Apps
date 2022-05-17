import {useIntl} from 'react-intl';
import IconBatch from '../../../@softbd/icons/IconBatch';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Button, Divider, Grid} from '@mui/material';
import React, {Fragment} from 'react';
import {Body1} from '../../../@softbd/elements/common';
import {
  useFetchBatch,
  useFetchBatchResult,
} from '../../../services/instituteManagement/hooks';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/router';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';

const BatchResultDetailsPage = () => {
  const {messages, formatDate} = useIntl();

  const router = useRouter();
  const BatchId = Number(router.query.id);

  const {data: itemData1} = useFetchBatchResult(BatchId); //todo: implement after api is ready
  console.log('itemdata1->', itemData1);

  const {data: batchData} = useFetchBatch(BatchId);

  // todo: remove after api is done
  const itemData = [
    {
      id: 1,
      batch_id: 1,
      youth_id: 1,
      result_type: 1,
      total_marks: '66.25',
      result: 'A',
      deleted_at: null,
      created_at: '2022-05-17T09:18:08.000000Z',
      updated_at: '2022-05-17T09:18:08.000000Z',
      youth_profile: {
        first_name: 'Rahul Das',
        first_name_en: null,
        last_name: 'last_name updated',
        last_name_en: null,
        email: 'ybergstrom@example.com',
        mobile: 'ybergstrom@example.com',
      },
    },
    {
      id: 2,
      batch_id: 1,
      youth_id: 2,
      result_type: 1,
      total_marks: '0.00',
      result: 'F',
      deleted_at: null,
      created_at: '2022-05-17T09:18:08.000000Z',
      updated_at: '2022-05-17T09:18:08.000000Z',
      youth_profile: {
        first_name: 'Richard Torphy III',
        first_name_en: null,
        last_name: 'Richard Torphy III',
        last_name_en: null,
        email: 'otilia51@example.com',
        mobile: 'otilia51@example.com',
      },
    },
    {
      id: 3,
      batch_id: 1,
      youth_id: 3,
      result_type: 1,
      total_marks: '5.25',
      result: 'F',
      deleted_at: null,
      created_at: '2022-05-17T09:18:08.000000Z',
      updated_at: '2022-05-17T09:18:08.000000Z',
      youth_profile: {
        first_name: 'Eric McGlynn',
        first_name_en: null,
        last_name: 'Eric McGlynn',
        last_name_en: null,
        email: 'ykoelpin@example.org',
        mobile: 'ykoelpin@example.org',
      },
    },
  ];

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBatch />
            <IntlMessages id='common.batch_result' />
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => router.back()}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>
                  {messages['common.batch_name'] + ': ' + batchData.title}
                </Body1>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>
                  {messages['common.published_at'] +
                    ': ' +
                    getIntlDateFromString(
                      formatDate,
                      itemData[0].created_at,
                      'short',
                    )}
                </Body1>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>{messages['examinee.label']}</Body1>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>{messages['common.email']}</Body1>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>{messages['education.result']}</Body1>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>{messages['common.obtained_mark']}</Body1>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {itemData &&
              (itemData || []).map((result: any) => (
                <Fragment key={result.id}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}>
                      <Body1>
                        {result.youth_profile.first_name}{' '}
                        {result.youth_profile.last_name}
                      </Body1>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Body1>{result.youth_profile.email}</Body1>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Body1>{result.result}</Body1>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Body1>{result.total_marks}</Body1>
                    </Grid>
                  </Grid>
                  <Divider sx={{marginY: 2}} />
                </Fragment>
              ))}
          </Grid>
        </Grid>
      </PageBlock>
    </>
  );
};

export default BatchResultDetailsPage;
