import React, {FC} from 'react';
import {Body2} from '../../../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const PREFIX = 'FillInTheBlankTypeAnswer';

const classes = {
  inputView: `${PREFIX}-inputView`,
  label: `${PREFIX}-label`,
};

const StyledGrid = styled(Grid)(() => {
  return {
    display: 'flex',
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
}
const FillInTheBlankTypeAnswer: FC<FillInTheBlankTypeComponentProps> = ({
  question,
}) => {
  let fillInTheBlankItems = question?.title.split(
    /(?=\[\[\]\])|(?<=\[\[\]\])/g,
  );
  console.log('items', fillInTheBlankItems);
  let index = 0;
  return (
    <StyledGrid>
      {fillInTheBlankItems.map((item: any) => {
        if (item == '[[]]') {
          return (
            <Body2 className={classes.inputView}>
              {question?.answer[index++]}
            </Body2>
          );
        } else {
          return <Body2 sx={{whiteSpace: 'pre'}}>{item}</Body2>;
        }
      })}
    </StyledGrid>
  );
};

export default FillInTheBlankTypeAnswer;
