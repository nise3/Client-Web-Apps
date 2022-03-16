import { Box, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { setAreaText } from '../../../../@softbd/common/svg-utils';
import { getStructureData } from '../../../../@softbd/common/svg-d3-util';
import { AddressTypes } from '../../../../@softbd/utilities/AddressType';
import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import pageSVG from '../../../../public/images/cv/CV_Temp_Classic1';

const StyledBox = styled(Box)(({ theme }) => ({
  border: '2px solid #d3d4d4',
  background: '#fff',
  padding: 20,
}));

interface ClassicTemplateProps {
  userData: any;
}

const ClassicTemplate: FC<ClassicTemplateProps> = ({ userData }) => {
  const LanguageProficiencyType: any = {
    '1': 'Easily',
    '2': 'Not Easily',
  };

  const setPhoto = (data: any) => {
    var elem = document.getElementById('photo') as Element;
    var imgElem = elem.childNodes[1] as any;
    imgElem.setAttribute('xlink:href', data.photo);
  }

  const getProps = (propsName: string, locale: string): string => {
    const props = (locale === LocaleLanguage.BN) ? propsName : propsName + '_en';
    // console.log(`getProps method:- ${locale}: ${props}`)
    return props;
  }
  const getValue = (obj: any, propsName: string, locale: string): string => {
    const propsKey = getProps(propsName, locale);
    let val = `${obj[propsKey]}`;
    let valWithNullCheck = val !== 'null' ? val : "";
    return valWithNullCheck;
  }

  const setHeaderAndLinePosition = (innerCordObj: any, headerId: string, headlineId: string, rectAreaId: string) => {
    // update langulage rect, line and heading from the last cord
    const lastCords = innerCordObj.lastCord + 40;
    let languageHead = document.getElementById(headerId);
    let languageHeadLine = document.getElementById(headlineId);
    languageHead?.children[0].setAttribute('transform', `translate(18 ${lastCords})`);
    languageHeadLine?.children[0].setAttribute('y1', (lastCords + 15) + '');
    languageHeadLine?.children[0].setAttribute('y2', (lastCords + 15) + '');
    // langular rectangle cord change
    let rectCord = document.getElementById(rectAreaId);
    rectCord?.children[0].setAttribute('y', (lastCords + 20) + '');
    return {
      rectCord
    }
  }

  const setHeaderLanguage = (headerId: string, languageKey: string) => {
    let languageHead = document.getElementById(headerId);
    let tspan = languageHead?.querySelector('tspan')?.querySelector('tspan') as SVGTSpanElement;
    if (tspan) {
      tspan.textContent = messages[languageKey] as string | null;
    }
  }

  /** present address */
  const addressText = (userData: any, locale: string) => {
    let presentAddress = userData?.youth_addresses.filter((item: any) => item.address_type == AddressTypes.PRESENT)[0];
    const propsArray = ['house_n_road', 'village_or_area', 'loc_upazila_title', 'loc_district_title', 'loc_division_title'];

    let addresstxt: string = `${messages['common.address']}: `;
    let addressArray = [];
    for (let i = 0; i < propsArray.length; i++) {
      const element = propsArray[i];
      let propValue = getValue(presentAddress, element, locale);
      if (propValue) {
        addressArray.push(propValue);
      }
    }
    addresstxt += addressArray.join() + (locale === LocaleLanguage.BN ? '।' : '.');
    // console.log(`${locale}: ${addresstxt}`)
    return addresstxt;
  }

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

  const renderSVG = (language: string, node?: any) => {
    // console.log(`renderSVG: ${language}`)
    // if (node == undefined) {
      let exNode = document.getElementById("svg-div");
      if (exNode) {
        node.removeChild(exNode);
      }
      
    // }
    const div = document.createElement('div');
    div.setAttribute("id", "svg-div");
    div.innerHTML = pageSVG;

    // console.log('PAGE >> ', pageSVG);
    node.appendChild(div);
    const svgNode = div.children[0];
    const rects = svgNode.querySelectorAll('g[id]>text');
    for (let r = 0; r < rects.length; r++)
      // @ts-ignore
      if (rects[r].previousElementSibling) {
        // @ts-ignore
        rects[r].previousElementSibling.setAttribute('fill', 'transparent');
      }

    setPhoto(userData);
    setAreaText(
      svgNode,
      'name',
      getValue(userData, 'first_name', language) + ' ' + getValue(userData, 'last_name', language),
      'lt',
    );
    setHeaderLanguage('contact-address', "common.contact_and_address");
    setAreaText(svgNode, 'phone', userData?.mobile, 'lt');
    setAreaText(svgNode, 'email', userData?.email, 'lt');

    setAreaText(
      svgNode,
      'address',
      addressText(userData, language)
    );


    // setHeaderLanguage('objective-headling', "common.objective");
    // setAreaText(svgNode, 'objective', userData[getProps('bio', language)]);
    // setHeaderLanguage('jobexperiance-headling', "common.job_experience");
    // const experiance = setAreaText(
    //   svgNode,
    //   'experience',
    //   userData?.youth_job_experiences.map((experience: any) => {
    //     return (
    //       (experience?.company_name
    //         ? `${messages['common.company_name_bn']}: ` + experience[getProps('company_name', language)] + ', '
    //         : ' ') +
    //       (experience?.position
    //         ? `${messages['common.position']}: ` + experience[getProps('position', language)] + ', '
    //         : ' ') +
    //       (experience?.start_date
    //         ? 'Start Date: ' +
    //         new Date(experience?.start_date).toLocaleDateString('en-US') +
    //         ', '
    //         : ' ') +
    //       (experience?.is_currently_working === 1
    //         ? 'Currently working here' + ', '
    //         : 'End Date: ' +
    //         new Date(experience?.end_date).toLocaleDateString('en-US'))
    //     );
    //   }),
    // );
    // setHeaderAndLinePosition(experiance, 'education-headling', 'education-headling-line', 'education');
    // setHeaderLanguage('education-headling', "common.educations");
    // const education = setAreaText(
    //   svgNode,
    //   'education',
    //   userData?.youth_educations.map((education: any) => {
    //     return educationText(education, language);
    //   }),
    //   'lt',
    // );
    // setHeaderAndLinePosition(education, 'computerskill-headling', 'computerskill-headling-line', 'computerskill')
    // setHeaderLanguage('computerskill-headling', "common.skills");
    // const skill = setAreaText(
    //   svgNode,
    //   'computerskill',
    //   userData?.skills.map((skill: any, index: number) => {
    //     return skill?.title ? skill[getProps('title', language)] as any + ' ' : ' ';
    //   }),
    // );
    // let languageReact = setHeaderAndLinePosition(skill, 'language-headling', 'language-headling-line', 'language');
    // setHeaderLanguage('language-headling', "language.proficiency");
    // setAreaText(
    //   svgNode,
    //   'language',
    //   userData?.youth_languages_proficiencies.map((language: any) => {
    //     return (
    //       (language?.language_title
    //         ? `${messages['common.language']}: ` + language?.language_title + ', '
    //         : ' ') +
    //       (language?.reading_proficiency_level
    //         ? `${messages['language.read']}: ` +
    //         LanguageProficiencyType[language?.reading_proficiency_level] +
    //         ', '
    //         : ' ') +
    //       (language?.speaking_proficiency_level
    //         ? `${messages['language.speak']}: ` +
    //         LanguageProficiencySpeakingType[
    //         language?.speaking_proficiency_level
    //         ] +
    //         ', '
    //         : ' ')
    //     );
    //   }),
    // );
    // //@ts-ignore
    // const langulageRect = languageReact.rectCord?.children[0].getBBox();
    // const languageLastBoxBottomY = langulageRect.y + langulageRect.height;
    // const bottomPadding = 20;

    // // update svg if less then last cord
    // let svg = document.getElementById('svg') as Element;
    // svg.setAttribute('viewBox', `0 0 595.276 ${languageLastBoxBottomY + bottomPadding}`);

    // let cvBody = document.getElementById('classic-data') as HTMLElement;
    getStructureData();
    
  }
  

  const LanguageProficiencySpeakingType: any = {
    '1': 'Fluently',
    '2': 'Not Fluently',
  };
  // const chk = useIntl();
  const { messages, locale } = useIntl();
  // const [currentLang, setCurrentLang] = useState("");
  // let svgNodeRef: HTMLElement;
  // console.log(messages, locale)
  // const theCB = useCallback((node) => {
  const theCB = useCallback((node: any) => {
    // console.log('inside CB: ', locale);

    // const language = locale;
    // setCurrentLang(language);
    // console.log('locale: ', locale);
    // console.log('currentLang: ', currentLang);
    // console.log('is not same lang: ', locale !== currentLang);
    // if (node && locale !== currentLang) {
    //   svgNodeRef = node;
    // } else {
    //   node = svgNodeRef;
    //   let exNode = document.getElementById("svg-div");
    //   if(exNode)
    //     node.removeChild(exNode);
    // }
    // console.log('node.children.length: ', node.children.length)
    if (!node || node.children.length > 0) return;
    renderSVG(locale, node);
  }, [locale]);

  useEffect(() => {
    // console.log('1. inside effect ', locale);
    // setLanguage(locale);
    // console.log('2. inside effect ', language);
    // console.log('svgNodeRef before assign ', svgNodeRef);
    // theCB(svgNodeRef);
    let exNode = document.getElementById("svgBox");
    renderSVG(locale, exNode);
    // console.log('asd;flasjf', exNode)
  }, [locale])

  return (
    <Slide direction={'right'} in={true}>
      <StyledBox id="svgBox" sx={{ padding: '0 !important' }} ref={theCB} />
    </Slide>
  );
};

export default ClassicTemplate;
