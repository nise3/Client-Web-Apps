import {styled} from '@mui/material/styles';
import {Container, Skeleton} from '@mui/material';
import {useIntl} from 'react-intl';
import React, {useState} from 'react';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';
import {useFetchStaticPageBlock} from '../../services/cmsManagement/hooks';
import {BLOCK_ID_ABOUT_US} from '../../@softbd/utilities/StaticContentConfigs';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .editor-template-table`]: {
    [`& tr`]: {
      width: '100%',
    },
    [`& td`]: {
      width: '50%',
      verticalAlign: 'top',
      wordBreak: 'break-word',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingRight: '0',
        display: 'inline-block',
      },
    },
    [`& td h3`]: {
      fontSize: '40px',
      margin: '10px 0',
    },
    [`& td p`]: {
      lineHeight: '30px',
    },
    [`& td:first-of-type`]: {
      paddingRight: '20px',
      [theme.breakpoints.down('sm')]: {
        paddingRight: '0',
      },
    },
    [`& td:last-of-type`]: {
      paddingLeft: '20px',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0',
      },
    },
    [`& td>img`]: {
      height: '300px',
      width: '100%',
    },
    [`& td>iframe`]: {
      height: '300px',
      width: '100%',
    },
    [`& .link-button`]: {
      borderColor: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.main} !important`,
      position: 'relative',
      padding: '10px 50px 10px 10px !important',
      [`&:hover`]: {
        background: theme.palette.primary.main,
        color: `${theme.palette.common.white} !important`,
        [`&::before`]: {
          backgroundColor: `${theme.palette.common.white} !important`,
        },
      },
      [`&::after`]: {
        content: "''",
        position: 'absolute',
        width: '13px',
        height: '13px',
        right: '16px',
        border: '3px solid',
        borderLeft: 'none',
        borderBottom: 'none',
        top: '13px',
        transform: 'rotate(45deg)',
      },
      [`&::before`]: {
        content: "''",
        position: 'absolute',
        width: '25px',
        height: '3px',
        right: '16px',
        top: '20px',
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const AboutUsSection = () => {
  const {messages} = useIntl();
  const [staticPageParams] = useState<any>({});

  const {data: blockData, isLoading} = useFetchStaticPageBlock(
    BLOCK_ID_ABOUT_US,
    staticPageParams,
  );

  return (
    <StyledContainer maxWidth='lg' sx={{marginTop: '60px'}}>
      <UnderlinedHeading>{messages['footer.about_us']}</UnderlinedHeading>

      {isLoading ? (
        <Skeleton variant='rectangular' width={'100%'} height={250} />
      ) : blockData ? (
        <div
          dangerouslySetInnerHTML={{
            __html: blockData?.content,
          }}
        />
      ) : (
        <NoDataFoundComponent />
      )}
    </StyledContainer>
  );
};
export default AboutUsSection;
