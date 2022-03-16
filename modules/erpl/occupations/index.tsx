import React, {useCallback, useState} from 'react';
import {Accordion, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  useFetchPublicRPLOccupations,
  useFetchPublicRPLSectors,
} from '../../../services/CertificateAuthorityManagement/hooks';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {Body1} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
/*const PREFIX = 'RplOccupation';*/

/*const classes = {

};*/

const StyledContainer = styled(Container)(({theme}) => ({
  padding: 20,
}));
const OccupationPage = () => {
  const {messages} = useIntl();
  const [expanded, setExpanded] = React.useState(null);
  const [sectorFilter] = useState({});
  const [occupationFilter, setOccupationFilter] = useState<any>(null);

  const {data: sectors, isLoading: isLoadingSectors} =
    useFetchPublicRPLSectors(sectorFilter);

  const {data: occupations, isLoading: isLoadingOccupations} =
    useFetchPublicRPLOccupations(occupationFilter);

  const onSectorChange = useCallback((sectorId) => {
    setOccupationFilter({rpl_sector_id: sectorId});
  }, []);

  const handleChange = (sector: any) => (event: any, newExpanded: any) => {
    const sectorId = sector?.id;
    setExpanded(newExpanded ? sectorId : false);
    onSectorChange(sectorId);
  };

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid item xs={12}>
        {isLoadingSectors ? (
          <>
            <TextInputSkeleton />
            <TextInputSkeleton />
            <TextInputSkeleton />
            <TextInputSkeleton />
          </>
        ) : sectors && sectors.length ? (
          sectors.map((sector: any) => {
            return (
              <>
                <Accordion
                  expanded={expanded === sector?.id}
                  onChange={handleChange(sector)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'>
                    <Body1>{sector?.title}</Body1>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Body1>{messages['occupations.label']}</Body1>
                    {isLoadingOccupations ? (
                      <>
                        <TextInputSkeleton />
                        <TextInputSkeleton />
                        <TextInputSkeleton />
                      </>
                    ) : occupations && occupations.length ? (
                      occupations.map((occupation: any, index: number) => {
                        return (
                          <React.Fragment key={occupation?.id}>
                            <Body1>
                              {index + 1}
                              {'. '}
                              {occupation?.title}
                            </Body1>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <NoDataFoundComponent
                        messageType={messages['occupations.label']}
                      />
                    )}{' '}
                    {/**occupations**/}
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })
        ) : (
          <NoDataFoundComponent messageType={messages['occupations.label']} />
        )}
      </Grid>
    </StyledContainer>
  );
};

export default OccupationPage;
