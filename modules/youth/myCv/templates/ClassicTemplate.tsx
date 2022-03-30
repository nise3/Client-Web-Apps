import {Box, Slide} from '@mui/material';
import {styled} from '@mui/material/styles';
import React, {FC, useCallback, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {
  generateLineFomDomPosition,
  getProps,
  getStructureData,
} from '../../../../@softbd/common/svg-d3-util';
import {setAreaText} from '../../../../@softbd/common/svg-utils';
import {AddressTypes} from '../../../../@softbd/utilities/AddressType';
import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import pageSVG from '../../../../public/images/cv/CV_Temp_Classic1';

const StyledBox = styled(Box)(({theme}) => ({
  border: '2px solid #d3d4d4',
  background: '#fff',
  padding: 20,
}));

interface ClassicTemplateProps {
  userData: any;
}

const ClassicTemplate: FC<ClassicTemplateProps> = ({userData}) => {

  const setPhoto = (data: any) => {
    var elem = document.getElementById('photo') as Element;
    var imgElem = elem.childNodes[1] as any;
    imgElem.setAttribute('xlink:href', data.photo);
  };

  const getValue = (obj: any, propsName: string, locale: string): string => {
    const propsKey = getProps(propsName, locale);
    let val = `${obj[propsKey]}`;
    let valWithNullCheck = val !== 'null' ? val : '';
    return valWithNullCheck;
  };

  const setHeaderLanguage = (headerId: string, languageKey: string) => {
    let languageHead = document.getElementById(headerId);
    let tspan = languageHead
      ?.querySelector('tspan')
      ?.querySelector('tspan') as SVGTSpanElement;
    if (tspan) {
      tspan.textContent = messages[languageKey] as string | null;
    }
    return {
      dom: {
        elem: languageHead,
        // @ts-ignore
        position: languageHead?.getBBox()
      },
      textBox: tspan.getBBox(),
      text: tspan.textContent
    }
  };

  /** present address */
  const addressText = (userData: any, locale: string) => {
    let presentAddress = userData?.youth_addresses.filter(
      (item: any) => item.address_type == AddressTypes.PRESENT,
    )[0];
    const propsArray = [
      'house_n_road',
      'village_or_area',
      'loc_upazila_title',
      'loc_district_title',
      'loc_division_title',
    ];

    let addresstxt: string = `${messages['common.address']}: `;
    let addressArray = [];
    if (presentAddress) {
      for (let i = 0; i < propsArray.length; i++) {
        const element = propsArray[i];
        let propValue = getValue(presentAddress, element, locale);
        if (propValue) {
          addressArray.push(propValue);
        }
      }
    }

    addresstxt +=
      addressArray.join() + (locale === LocaleLanguage.BN ? '।' : '.');
    // console.log(`${locale}: ${addresstxt}`)
    return addresstxt;
  };

  const renderSVG = (language: string, node?: any) => {
    let exNode = document.getElementById('svg-div');
    if (exNode) {
      node.removeChild(exNode);
    }

    // }
    const div = document.createElement('div');
    div.setAttribute('id', 'svg-div');
    div.innerHTML = pageSVG;

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
      getValue(userData, 'first_name', language) +
        ' ' +
        getValue(userData, 'last_name', language),
      'lt',
    );

    let cvHeader = setHeaderLanguage('cv-header', 'personal_info.curriculum_vitae');
    let {dom: { position }} = cvHeader;
    generateLineFomDomPosition(position);
    setHeaderLanguage('contact-address', 'common.contact_and_address');
    setAreaText(svgNode, 'phone', userData?.mobile, 'lt');
    setAreaText(svgNode, 'email', userData?.email, 'lt');

    setAreaText(svgNode, 'address', addressText(userData, language));
    getStructureData(userData, messages, language);
  };

  const {messages, locale} = useIntl();
  const theCB = useCallback(
    (node: any) => {
      if (!node || node.children.length > 0) return;
      renderSVG(locale, node);
    },
    [locale],
  );

  useEffect(() => {
    let exNode = document.getElementById('svgBox');
    renderSVG(locale, exNode);
  }, [locale]);

  return (
    <Slide direction={'right'} in={true}>
      <StyledBox id='svgBox' sx={{padding: '0 !important'}} ref={theCB} />
    </Slide>
  );
};

export default ClassicTemplate;
