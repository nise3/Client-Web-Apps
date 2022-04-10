import React, {FC} from 'react';
import {Body1} from '../../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Fonts} from '../../../../shared/constants/AppEnums';

const PREFIX = 'FillInTheBlankTypeAnswer';

const classes = {
  inputView: `${PREFIX}-inputView`,
  label: `${PREFIX}-label`,
};

const StyledGrid = styled(Grid)(() => {
  return {
    [`& .${classes.inputView}`]: {
      fontWeight: Fonts.MEDIUM,
      width: '100%',
      padding: '8px',
      boxShadow: '0px 0px 3px #ddd',
      borderRadius: '0.25rem',
      marginTop: '8px',
      maxHeight: '150px',
      overflow: 'auto',
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
  let index = 0;
  return (
    <StyledGrid>
      {fillInTheBlankItems.map((item: any) => {
        if (item == '[[]]') {
          return (
            <Body1 className={classes.inputView}>
              {question?.answer[index++]}
            </Body1>
          );
        } else {
          return <Body1 sx={{whiteSpace: 'pre'}}>{item}</Body1>;
        }
      })}
    </StyledGrid>
  );
};

export default FillInTheBlankTypeAnswer;
