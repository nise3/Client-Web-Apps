import React, {FC, useCallback} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Slide} from '@mui/material';
import pageSVG from '../../../../public/images/cv/CV_Temp_Classic';
import {setAreaText} from '../../../../@softbd/common/svg-utils';

const PREFIX = 'ClassicTemplate';

const classes = {
  classicRoot: `${PREFIX}-classicRoot`,
};

const StyledSlide = styled(Slide)(({theme}) => ({
  [`& .${classes.classicRoot}`]: {
    border: '2px solid #d3d4d4',
    background: '#fff',
    padding: 20,
  },
}));

interface ClassicTemplateProps {
  userData: any;
}

const ClassicTemplate: FC<ClassicTemplateProps> = ({userData}) => {
  const LanguageProficiencyType: any = {
    '1': 'Easily',
    '2': 'Not Easily',
  };

  const LanguageProficiencySpeakingType: any = {
    '1': 'Fluently',
    '2': 'Not Fluently',
  };

  const theCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;
    const div = document.createElement('div');
    div.innerHTML = pageSVG;
    // console.log('PAGE >> ', pageSVG);
    node.appendChild(div);
    const svgNode = div.children[0];
    const rects = svgNode.querySelectorAll('g[id]>text');
    for (let r = 0; r < rects.length; r++)
      // @ts-ignore
      rects[r].previousElementSibling.setAttribute('fill', 'transparent');
    // setAreaText(svgNode, 'image', userData?.photo);
    setAreaText(
      svgNode,
      'name',
      userData?.first_name + ' ' + userData?.last_name,
      'lt',
    );
    setAreaText(svgNode, 'phone', userData?.mobile, 'lt');
    setAreaText(svgNode, 'email', userData?.email, 'lt');
    /** present address */
    setAreaText(
      svgNode,
      'address',
      (userData?.youth_addresses[1]?.house_n_road
        ? userData?.youth_addresses[1]?.house_n_road + ','
        : 'Address: ') +
        (userData?.youth_addresses[1]?.village_or_area
          ? userData?.youth_addresses[1]?.village_or_area + ','
          : '&#32') +
        userData?.youth_addresses[1]?.loc_upazila_title +
        ',' +
        userData?.youth_addresses[1]?.loc_district_title +
        ',' +
        userData?.youth_addresses[1]?.loc_division_title,
      'lt',
    );
    setAreaText(
      svgNode,
      'education',
      userData?.youth_educations.map((education: any) => {
        return (
          (education?.institute_name
            ? 'Institution Name: ' + education?.institute_name + ', '
            : ' ') +
          (education?.duration
            ? 'Duration: ' + parseFloat(education?.duration) + 'yrs, '
            : ' ') +
          (education?.result?.code === 'GRADE'
            ? education?.cgpa
              ? 'CGPA: ' +
                parseFloat(education?.cgpa) +
                ' ( out of ' +
                parseInt(education?.cgpa_scale) +
                ' ), '
              : ' '
            : 'Result: ' + education?.result?.title) +
          (education?.year_of_passing
            ? 'Year of Passing: ' + parseInt(education?.year_of_passing) + ', '
            : ' ')
        );
      }),
      'lt',
    );
    setAreaText(
      svgNode,
      'language',
      userData?.youth_languages_proficiencies.map((language: any) => {
        return (
          (language?.language_title
            ? 'Language: ' + language?.language_title + ', '
            : ' ') +
          (language?.reading_proficiency_level
            ? 'Reading: ' +
              LanguageProficiencyType[language?.reading_proficiency_level] +
              ', '
            : ' ') +
          (language?.speaking_proficiency_level
            ? 'Speaking: ' +
              LanguageProficiencySpeakingType[
                language?.speaking_proficiency_level
              ] +
              ', '
            : ' ')
        );
      }),
    );
    setAreaText(svgNode, 'objective', userData.bio);
    setAreaText(
      svgNode,
      'experience',
      userData?.youth_job_experiences.map((experience: any) => {
        return (
          (experience?.company_name
            ? 'Company: ' + experience?.company_name + ', '
            : ' ') +
          (experience?.position
            ? 'Position: ' + experience?.position + ', '
            : ' ') +
          (experience?.start_date
            ? 'Start Date: ' +
              new Date(experience?.start_date).toLocaleDateString('en-US') +
              ', '
            : ' ') +
          (experience?.is_currently_working === 1
            ? 'Currently working here' + ', '
            : 'End Date: ' +
              new Date(experience?.end_date).toLocaleDateString('en-US'))
        );
      }),
    );
    setAreaText(
      svgNode,
      'computerskill',
      userData?.skills.map((skill: any, index: number) => {
        return skill?.title ? index + 1 + '. ' + skill?.title + ' ' : ' ';
      }),
    );
  }, []);

  return (
    <StyledSlide direction={'right'} in={true}>
      <Box
        className={classes.classicRoot}
        sx={{padding: '0 !important'}}
        ref={theCB}
      />
    </StyledSlide>
  );
};

export default ClassicTemplate;
