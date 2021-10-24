import React, {FC, useCallback} from 'react';
import useStyles from '../index.style';
import {Box, Slide, Typography} from '@mui/material';
import pageSVG from '../../../../public/images/cv/CV_Temp_Classic.cv.svg';
import {setAreaText} from '../../../../@softbd/common/svg-utils';

interface ClassicTemplateProps {
  userData: any;
}

const getEducationItem = (
  caption: string,
  text: string,
  isBold: boolean,
  classes: any,
) => {
  return (
    <Box className={classes.classicEducationItem} mt={isBold ? 2 : 0}>
      <Typography variant={'caption'} className='caption'>
        {caption}
      </Typography>
      :
      <Typography
        variant={'caption'}
        fontWeight={isBold ? 'bold' : 'normal'}
        className='text'>
        {text}
      </Typography>
    </Box>
  );
};

const ClassicTemplate: FC<ClassicTemplateProps> = ({userData}) => {
  const classes: any = useStyles();

  const theCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;
    const div = document.createElement('div');
    div.innerHTML = pageSVG;
    node.appendChild(div);
    const svgNode = div.children[0];
    const rects = svgNode.querySelectorAll('g[id]>text');
    for (let r = 0; r < rects.length; r++)
      rects[r].previousElementSibling.setAttribute('fill', 'transparent');
    // setAreaText(svgNode, 'image', userData.image);
    setAreaText(
      svgNode,
      'name',
      userData.first_name_en + ' ' + userData.last_name_en,
      'lt',
    );
    setAreaText(svgNode, 'phone', userData.mobile, 'lt');
    setAreaText(svgNode, 'email', userData.email, 'lt');
    // setAreaText(svgNode, 'address', userData.address);
    // setAreaText(svgNode, 'education', userData.educations);
    // setAreaText(svgNode, 'language', userData.languages);
    setAreaText(svgNode, 'objective', userData.bio_en);
    // setAreaText(svgNode, 'experience', userData.jobExperiences);
    // setAreaText(svgNode, 'computerskill', userData.skills);
  }, []);

  return (
    <Slide direction={'right'} in={true}>
      <Box
        className={classes.classicRoot}
        sx={{padding: '0 !important'}}
        ref={theCB}
      />
    </Slide>
  );
};

export default ClassicTemplate;
