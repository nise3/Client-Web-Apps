import { Box, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { setAreaText } from '../../../../@softbd/common/svg-utils';
import { AddressTypes } from '../../../../@softbd/utilities/AddressType';
import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import pageSVG from '../../../../public/images/cv/CV_Temp_Classic';
import { ISkill } from '../../../../shared/Interface/organization.interface';

const StyledBox = styled(Box)(({theme}) => ({
  border: '2px solid #d3d4d4',
  background: '#fff',
  padding: 20,
}));

interface ClassicTemplateProps {
  userData: any;
}

const ClassicTemplate: FC<ClassicTemplateProps> = ({userData}) => {
  const LanguageProficiencyType: any = {
    '1': 'Easily',
    '2': 'Not Easily',
  };

  const setPhoto = (data) => {
    var elem = document.getElementById('photo');
    var imgElem = elem.childNodes[1];
    imgElem.setAttribute('xlink:href', data.photo);
    }
  const LanguageProficiencySpeakingType: any = {
    '1': 'Fluently',
    '2': 'Not Fluently',
  };
  const {messages, locale} = useIntl();
  // console.log(messages, locale)
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
      if(rects[r].previousElementSibling){
        // @ts-ignore
        rects[r].previousElementSibling.setAttribute('fill', 'transparent');
      }

    // setAreaText(svgNode, 'image', userData?.photo);
    // console.log(svgNode)
    const getProps = (propsName: string, locale: string): string =>{
      return (locale === LocaleLanguage.BN) ? propsName : propsName + '_en';
    }
    const getValue = (presentAddress: any, propsName: string, locale: string): string =>{
      let val = `${presentAddress[getProps(propsName, locale)]}`;
      let valWithNullCheck = val !== 'null' ? val : "";
      return valWithNullCheck;
    }

    setPhoto(userData);
    setAreaText(
      svgNode,
      'name',
      getValue(userData, 'first_name', locale) + ' ' + getValue(userData, 'last_name', locale),
      'lt',
    );
    setAreaText(svgNode, 'phone', userData?.mobile, 'lt');
    setAreaText(svgNode, 'email', userData?.email, 'lt');
    
    
    /** present address */
    const addressText = (userData: any, locale: string) => {
      let presentAddress = userData?.youth_addresses.filter((item:any)=> item.address_type == AddressTypes.PRESENT)[0];
      const propsArray = ['house_n_road', 'village_or_area', 'loc_upazila_title', 'loc_district_title', 'loc_division_title' ];

      let addresstxt:string = `${messages['common.address']}: `;
      let addressArray = [];
      for (let i = 0; i < propsArray.length; i++) {
        const element = propsArray[i];
        let propValue = getValue(presentAddress, element, locale);
        if (propValue) {
          addressArray.push(propValue);
        }
      }
      addresstxt += addressArray.join() + (locale === LocaleLanguage.BN ? '।' : '.');
      return addresstxt;
    }
    setAreaText(
      svgNode,
      'address',
      addressText(userData, locale)
    );
    const educationText = (education: any, locale: string) => {
      return (
        (education?.institute_name
          ? `${messages['common.institute_name']}: ${education[getProps('institute_name', locale)]}, `
          : ' ') +
        (education?.duration
          ? `${messages['education.duration']}: ${parseFloat(education?.duration)} yrs,`
          : ' ') +
        (education?.result?.code === 'GRADE'
          ? education?.cgpa
            ? `${messages['education.cgpa']}: ` + parseFloat(education?.cgpa) + ' ( out of ' + parseInt(education?.cgpa_scale) + ' ), '
            : ' '
          : `${messages['education.result']}: ` + education?.result?.title) +
        (education?.year_of_passing
          ? `${messages['education.passing_year']}: ` + parseInt(education?.year_of_passing) + ', '
          : ' ')
      );
    };
    setAreaText(
      svgNode,
      'education',
      userData?.youth_educations.map((education: any) => {
        return educationText(education, locale);
        // return (
        //   (education?.institute_name
        //     ? 'Institution Name: ' + education[getProps('institute_name', locale)] + ', '
        //     : ' ') +
        //   (education?.duration
        //     ? 'Duration: ' + parseFloat(education?.duration) + 'yrs, '
        //     : ' ') +
        //   (education?.result?.code === 'GRADE'
        //     ? education?.cgpa
        //       ? 'CGPA: ' +
        //         parseFloat(education?.cgpa) +
        //         ' ( out of ' + 
        //         parseInt(education?.cgpa_scale) +
        //         ' ), '
        //       : ' '
        //     : 'Result: ' + education?.result?.title) +
        //   (education?.year_of_passing
        //     ? 'Year of Passing: ' + parseInt(education?.year_of_passing) + ', '
        //     : ' ')
        // );
      }),
      'lt',
    );

    setAreaText(svgNode, 'objective', userData[getProps('bio', locale)]);
    setAreaText(
      svgNode,
      'experience',
      userData?.youth_job_experiences.map((experience: any) => {
        return (
          (experience?.company_name
            ? `${messages['common.company_name_bn']}: ` + experience[getProps('company_name', locale)] + ', '
            : ' ') +
          (experience?.position
            ? `${messages['common.position']}: ` + experience[getProps('position', locale)] + ', '
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
    const skill = setAreaText(
      svgNode,
      'computerskill',
      userData?.skills.map((skill: ISkill, index: number) => {
        // return skill?.title ? index + 1 + '. ' + skill[getProps('title', locale)] + ' ' : ' ';
        return skill?.title ? skill[getProps('title', locale)] + ' ' : ' ';
      }),
    );
    console.log('skill cord', skill)
    let svg = document.getElementById('svg') as Element;
    // svg.setAttribute('viewBox', `0 0 595.276 ${skill.lastCord + 20}`)
    // update langulage rect, line and heading from the last cord
    const lastCords = skill.lastCord + 40;
    let languageHead = document.getElementById('language-headling');
    let languageHeadLine = document.getElementById('language-headling-line');
    languageHead?.children[0].setAttribute('transform', `translate(18 ${lastCords})`);
    languageHeadLine?.children[0].setAttribute('y1', (lastCords + 15) + '');
    languageHeadLine?.children[0].setAttribute('y2', (lastCords + 15) + '');
    // langular rectangle cord change
    let languageReact = document.getElementById('language');
    languageReact?.children[0].setAttribute('y', (lastCords + 20) + '');

    setAreaText(
      svgNode,
      'language',
      userData?.youth_languages_proficiencies.map((language: any) => {
        return (
          (language?.language_title
            ? `${messages['common.language']}: ` + language?.language_title + ', '
            : ' ') +
          (language?.reading_proficiency_level
            ? `${messages['language.read']}: ` +
              LanguageProficiencyType[language?.reading_proficiency_level] +
              ', '
            : ' ') +
          (language?.speaking_proficiency_level
            ? `${messages['language.speak']}: ` +
              LanguageProficiencySpeakingType[
                language?.speaking_proficiency_level
              ] +
              ', '
            : ' ')
        );
      }),
    );
    //@ts-ignore
    const langulageRect = languageReact?.children[0].getBBox();
    const languageLastBoxBottomY = langulageRect.y + langulageRect.height;
    console.log('lang rectangle ', languageLastBoxBottomY);
    // update svg if less then last cord
    svg.setAttribute('viewBox', `0 0 595.276 ${languageLastBoxBottomY}`);
    }, [locale]);

  return (
    <Slide direction={'right'} in={true}>
      <StyledBox sx={{padding: '0 !important'}} ref={theCB} />
    </Slide>
  );
};

export default ClassicTemplate;
