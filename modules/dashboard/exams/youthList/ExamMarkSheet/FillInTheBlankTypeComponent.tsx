import React, {FC} from 'react';
import {Body2} from '../../../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import {getIntlNumber} from '../../../../../@softbd/utilities/helpers';

const PREFIX = 'FillInTheBlankTypeComponent';

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
  question: any;
  index: number;
}
const FillInTheBlankTypeComponent: FC<FillInTheBlankTypeComponentProps> = ({
  question,
  index,
}) => {
  const {formatNumber} = useIntl();
  let fillInTheBlankItems = question?.title.split(
    /(?=\[\[\]\])|(?<=\[\[\]\])/g,
  );
  let questionIndex = 0;
  return (
    <StyledGrid container spacing={2}>
      <Grid item xs={10} display={'flex'} key={1}>
        <Body2 sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
          {getIntlNumber(formatNumber, index) + '. ' + ' '}
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
        <Body2 sx={{fontWeight: 'bold'}}>
          {'(' + getIntlNumber(formatNumber, question?.individual_marks) + ')'}
        </Body2>
      </Grid>
      <Grid item xs={2}>
        <Body2 sx={{fontWeight: 'bold', textAlign: 'center'}}>
          {getIntlNumber(formatNumber, question?.marks_achieved)}
        </Body2>
      </Grid>
    </StyledGrid>
  );
};

export default FillInTheBlankTypeComponent;
