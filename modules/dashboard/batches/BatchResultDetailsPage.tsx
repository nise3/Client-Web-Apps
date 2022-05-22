import {useIntl} from 'react-intl';
import IconBatch from '../../../@softbd/icons/IconBatch';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Button, Divider, Grid} from '@mui/material';
import React, {Fragment, useCallback, useState} from 'react';
import {Body1} from '../../../@softbd/elements/common';
import {
  useFetchBatch,
  useFetchBatchResult,
} from '../../../services/instituteManagement/hooks';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/router';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';
import TableSkeleton from '../../../@softbd/elements/display/skeleton/TableSkeleton/TableSkeleton';
import {LINK_BATCH, LINK_YOUTH_EXAM} from '../../../@softbd/common/appLinks';
import YouthSingleExamDetailsPopup from './YouthSingleExamDetailsPopup';

const BatchResultDetailsPage = () => {
  const {messages, formatDate} = useIntl();
  const router = useRouter();
  const batchId = Number(router.query.id);
  const {data: results, isLoading} = useFetchBatchResult(batchId);
  const {data: batchData} = useFetchBatch(batchId);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>('');
  const [isOpenSingleExam, setIsOpenSingleExam] = useState(false);

  const openExamModal = useCallback((itemId: number, firstName, lastName) => {
    let name = firstName + lastName;
    setSelectedItemName(name);

    setIsOpenSingleExam(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenSingleExam(false);
  }, []);

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
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Body1>
              {messages['common.batch_name'] + ': ' + batchData?.title}
            </Body1>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4,
            }}>
            <Body1>
              {messages['common.published_at'] +
              ': ' +
              batchData?.result_published_at
                ? getIntlDateFromString(
                    formatDate,
                    batchData?.result_published_at,
                    'short',
                  )
                : ''}
            </Body1>
          </Grid>
          <Grid item xs={12}>
            <Divider
              sx={{marginY: 2, borderBottomWidth: 2, borderColor: '#837c7c'}}
            />
            <Grid container spacing={1}>
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
                xs={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Body1>{messages['common.obtained_mark']}</Body1>
              </Grid>
              <Grid
                item
                xs={1}
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
                <Body1>{messages['common.actions']}</Body1>
              </Grid>
            </Grid>
          </Grid>
          {isLoading ? (
            <Grid item xs={12}>
              <TableSkeleton rowSize={5} columnNumbers={4} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              {results &&
                (results || []).map((result: any) => (
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
                          {result?.youth_profile?.first_name}{' '}
                          {result?.youth_profile?.last_name}
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
                        <Body1>{result?.youth_profile?.email}</Body1>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Body1>{result?.total_marks}</Body1>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Body1>{result?.result}</Body1>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          size={'small'}
                          onClick={() =>
                            openExamModal(
                              result.id,
                              result?.youth_profile?.first_name,
                              result?.youth_profile?.last_name,
                            )
                          }>
                          {messages['common.details']}
                        </Button>

                        <Button
                          sx={{marginLeft: '5px'}}
                          variant={'contained'}
                          color={'primary'}
                          size={'small'}
                          onClick={() =>
                            router.push(
                              `${LINK_BATCH}${batchId}${LINK_YOUTH_EXAM}${result.youth_id}`,
                            )
                          }>
                          {messages['common.all_result']}
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider sx={{marginY: 2}} />
                  </Fragment>
                ))}
            </Grid>
          )}
        </Grid>

        {isOpenSingleExam && (
          <YouthSingleExamDetailsPopup
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            batchTitle={batchData?.title}
            YouthTitle={selectedItemName}
          />
        )}
      </PageBlock>
    </>
  );
};

export default BatchResultDetailsPage;
