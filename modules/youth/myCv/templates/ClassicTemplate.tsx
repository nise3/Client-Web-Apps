import React, {FC, useCallback} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Slide} from '@mui/material';
import pageSVG from '../../../../public/images/cv/CV_Temp_Classic';
import {setAreaText} from '../../../../@softbd/common/svg-utils';
import {ISkill} from '../../../../shared/Interface/organization.interface';
import { useIntl } from 'react-intl';import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import { AddressTypes } from '../../../../@softbd/utilities/AddressType';

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

  const LanguageProficiencySpeakingType: any = {
    '1': 'Fluently',
    '2': 'Not Fluently',
  };
  const {messages, locale} = useIntl();
  console.log(messages, locale)
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
    const getProps = (propsName: string, locale: string): string =>{
      return (locale === LocaleLanguage.BN) ? propsName : propsName + '_en';
    }
    const getValue = (presentAddress: any, propsName: string, locale: string): string =>{
      let val = `${presentAddress[getProps(propsName, locale)]}`;
      let valWithComma = val !== 'null' ? val : "";
      return valWithComma;
    }
    /** present address */
    const addressText = (userData: any, locale: string) => {
      let presentAddress = userData?.youth_addresses.filter((item:any)=> item.address_type == AddressTypes.PRESENT)[0];
      const propsArray = ['house_n_road', 'village_or_area', 'loc_upazila_title', 'loc_district_title', 'loc_division_title' ];

        // presentAddress.house_n_road = '৩৫/৬/২৩/এ';
        // presentAddress.house_n_road_en = '35/6/2/A';
        // presentAddress.village_or_area = 'কমলাপুর';
        // presentAddress.village_or_area_en = 'Kamlapur';
        // presentAddress.loc_upazila_title = 'ফরিদপুর সদর';
        // presentAddress.loc_upazila_title_en = 'Faridpur Sadar';

      let addresstxt:string = `Address: `;
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
      // (userData?.youth_addresses[1]?.house_n_road
      //   ? userData?.youth_addresses[1]?.house_n_road + ','
      //   : 'Address: ') +
      //   (userData?.youth_addresses[1]?.village_or_area
      //     ? userData?.youth_addresses[1]?.village_or_area + ','
      //     : '&#32') +
      // (userData?.youth_addresses[1]?.loc_upazila_title
      //   ? userData?.youth_addresses[1]?.loc_upazila_title  + ','
      //   : '&#32')+
      //   userData?.youth_addresses[1]?.loc_district_title +
      //   ',' +
      //   userData?.youth_addresses[1]?.loc_division_title,
      // 'lt',
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
      userData?.skills.map((skill: ISkill, index: number) => {
        return skill?.title ? index + 1 + '. ' + skill?.title + ' ' : ' ';
      }),
    );
  }, [locale]);

  return (
    <Slide direction={'right'} in={true}>
      <StyledBox sx={{padding: '0 !important'}} ref={theCB} />
    </Slide>
  );
};

export default ClassicTemplate;
