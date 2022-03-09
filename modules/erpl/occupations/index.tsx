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
  const [sectorFilter] = useState({});
  const [occupationFilter, setOccupationFilter] = useState<any>(null);

  const {data: sectors, isLoading: isLoadingSectors} =
    useFetchPublicRPLSectors(sectorFilter);

  const {data: occupations, isLoading: isLoadingOccupations} =
    useFetchPublicRPLOccupations(occupationFilter);

  const onSectorChange = useCallback((sectorId) => {
    setOccupationFilter({rpl_sector_id: sectorId});
  }, []);

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
                  onChange={(e) => {
                    const sectorId = sector?.id;
                    onSectorChange(sectorId);
                  }}>
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
                      <NoDataFoundComponent />
                    )}{' '}
                    {/**occupations**/}
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })
        ) : (
          <NoDataFoundComponent />
        )}
      </Grid>
    </StyledContainer>
  );
};

export default OccupationPage;
