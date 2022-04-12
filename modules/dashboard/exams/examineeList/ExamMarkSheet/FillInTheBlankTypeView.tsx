import React, {FC, ReactNode} from 'react';
import {Body1, Body2} from '../../../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
import {question_type} from '../../../../../@softbd/utilities/helpers';

const PREFIX = 'FillInTheBlankTypeView';

const classes = {
  inputView: `${PREFIX}-inputView`,
  label: `${PREFIX}-label`,
};

const StyledGrid = styled(Grid)(() => {
  return {
    [`& .${classes.inputView}`]: {
      fontWeight: Fonts.MEDIUM,
      padding: '0px 30px',
      borderBottom: '1px solid',
      textAlign: 'center',
    },
  };
});
interface FillInTheBlankTypeComponentProps {
  section: any;
  inputField?: ReactNode;
}
const FillInTheBlankTypeView: FC<FillInTheBlankTypeComponentProps> = ({
  section,
  inputField,
}) => {
  const {messages} = useIntl();
  const questions = section?.questions;

  return (
    <StyledGrid container spacing={1}>
      <Grid item xs={12} display={'flex'}>
        <Body1 sx={{fontWeight: 'bold'}}>
          {messages['common.type'] + ': '}
        </Body1>
        <Body2 sx={{marginTop: '3px'}}>
          {question_type[section?.question_type - 1].label}
        </Body2>
      </Grid>
      <Grid item xs={12} display={'flex'}>
        <Body1 sx={{fontWeight: 'bold'}}>
          {messages['common.total_marks'] + ': '}
        </Body1>
        <Body2 sx={{marginTop: '3px'}}>{section?.total_marks}</Body2>
      </Grid>
      {questions && questions.length ? (
        questions.map((question: any, index: number) => {
          let fillInTheBlankItems = question?.title.split(
            /(?=\[\[\]\])|(?<=\[\[\]\])/g,
          );
          let questionIndex = 0;
          return (
            <>
              {' '}
              <Grid item xs={10} display={'flex'} key={1}>
                <Body2 sx={{fontWeight: 'bold'}}>
                  {'Q' + (index + 1) + '. ' + ' '}
                </Body2>
                {fillInTheBlankItems.map((item: any) => {
                  if (item == '[[]]') {
                    return (
                      <>
                        {' '}
                        <Body2 className={classes.inputView}>
                          {question?.answer[questionIndex++]}
                        </Body2>
                      </>
                    );
                  } else {
                    return <Body2 sx={{whiteSpace: 'pre'}}>{item}</Body2>;
                  }
                })}
              </Grid>
              <Grid item xs={2}>
                <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
                  {question?.obtained_mark}
                </Body2>
              </Grid>
            </>
          );
        })
      ) : (
        <NoDataFoundComponent />
      )}
      <Grid item xs={12} display={'flex'}>
        {/* {fillInTheBlankItems.map((item: any) => {
          if (item == '[[]]') {
            return (
              <Body2 className={classes.inputView}>
                {question?.answer[index++]}
              </Body2>
            );
          } else {
            return <Body2 sx={{whiteSpace: 'pre'}}>{item}</Body2>;
          }
        })}*/}
      </Grid>
    </StyledGrid>
  );
};

export default FillInTheBlankTypeView;
