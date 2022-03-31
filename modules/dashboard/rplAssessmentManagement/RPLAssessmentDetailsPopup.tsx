import React, {useEffect, useState} from 'react';
import {Grid, Box} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchAssessmentDetails} from '../../../services/instituteManagement/hooks';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {
  getNationalityTitle,
  isBreakPointUp,
} from '../../../@crema/utility/Utils';
import IconCourse from '../../../@softbd/icons/IconCourse';

type Props = {
  itemId: number;
  onClose: () => void;
};

const RPLAssessmentDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchAssessmentDetails(itemId);
  const [youthDetails, setYouthDetails] = useState<any>({});

  const religions = [
    {
      id: 1,
      label: messages['common.religion_islam'],
    },
    {
      id: 2,
      label: messages['common.religion_hinduism'],
    },
    {
      id: 3,
      label: messages['common.religion_christianity'],
    },
    {
      id: 4,
      label: messages['common.religion_buddhism'],
    },
    {
      id: 5,
      label: messages['common.notDefined'],
    },
  ];

  useEffect(() => {
    if (itemData) {
      setYouthDetails(itemData?.youth_details);
    }
  }, [itemData]);

  const getEmploymentStatusTitle = (id: any) => {
    if (id == 0) {
      return messages['common.unemployed'];
    } else {
      return messages['common.employed'];
    }
  };

  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconCourse />
            <IntlMessages id='applicationManagement.details' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Link
              href={`${path}/youth-cv/${itemData?.youth_id}`}
              passHref={true}>
              <CommonButton
                btnText='common.see_cv'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                style={{marginTop: '10px'}}
              />
            </Link>
          </Grid>
          {youthDetails && Object.keys(youthDetails).length ? (
            <>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.first_name']}
                  value={youthDetails?.first_name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.last_name']}
                  value={youthDetails?.last_name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.father_name']}
                  value={youthDetails?.father_name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.mother_name']}
                  value={youthDetails?.mother_name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.guardian_name']}
                  value={youthDetails?.guardian_name}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.mobile']}
                  value={youthDetails?.mobile}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.nationality']}
                  value={getNationalityTitle(youthDetails?.nationality)}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.nid']}
                  value={youthDetails?.identity_number}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.registration_number']}
                  value={youthDetails?.registration_number}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.date_of_birth']}
                  value={youthDetails?.date_of_birth}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.employment_status']}
                  value={getEmploymentStatusTitle(
                    youthDetails?.employment_status,
                  )}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['common.religion']}
                  value={religions[youthDetails?.religion - 1]?.label}
                  isLoading={isLoading}
                />
              </Grid>
            </>
          ) : (
            <></>
          )}
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rpl_occupation.label']}
              value={itemData?.rpl_occupation_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rpl_level.label']}
              value={itemData?.rpl_level_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rpl_sector.label']}
              value={itemData?.rpl_sector_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rto_country.label']}
              value={itemData?.rto_country_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['assessmentManagement.target_country']}
              value={itemData?.target_country_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['rto.label']}
              value={itemData?.rto_title}
              isLoading={isLoading}
            />
          </Grid>

          {/* Educations
          {youthDetails?.education_info &&
            youthDetails?.education_info?.map((education: any) => {
              return (
                <Grid item xs={6} key={education.id}>
                  <fieldset style={{backgroundColor: '#e7e5e2'}}>
                    <legend style={{fontSize: '25px', color: '#4d39bf'}}>
                      {education?.education_level_title}
                    </legend>
                    <ul>
                      {education?.edu_board_title && (
                        <li>Education Board: {education?.edu_board_title}</li>
                      )}
                      {education?.institute_name && (
                        <li>Institute name: {education?.institute_name}</li>
                      )}
                      {education?.edu_group_title && (
                        <li>Education Group: {education?.edu_group_title}</li>
                      )}
                      <li>
                        Is foreign institute:{' '}
                        {education?.is_foreign_institute === 1 ? 'Yes' : 'No'}
                      </li>
                      {education?.is_foreign_institute === 1 &&
                        education?.foreign_institute_country_title && (
                          <li>
                            Country Name:{' '}
                            {education?.foreign_institute_country_title}
                          </li>
                        )}
                      {education?.result?.title &&
                        education?.result?.title !== 'Grade' && (
                          <li>Result: {education?.result?.title}</li>
                        )}
                      {education?.marks_in_percentage && (
                        <li>
                          Marks: {parseInt(education?.marks_in_percentage)}%
                        </li>
                      )}
                      {education?.cgpa && education?.cgpa_scale && (
                        <li>
                          CGPA: {parseFloat(education?.cgpa)} (out of{' '}
                          {parseInt(education?.cgpa_scale)})
                        </li>
                      )}
                      {education?.duration && (
                        <li>Duration: {education?.duration}</li>
                      )}
                      <li>
                        Exam Title:{' '}
                        {education?.exam_degree_id
                          ? education?.exam_degree_title
                          : education?.exam_degree_name}
                      </li>
                      {education?.year_of_passing && (
                        <li>
                          Year of passing:{' '}
                          {parseInt(education?.year_of_passing)}
                        </li>
                      )}
                      {education?.expected_year_of_passing && (
                        <li>
                          Expected year of passing:{' '}
                          {parseInt(education?.expected_year_of_passing)}
                        </li>
                      )}
                      {education?.achievements && (
                        <li>Achievements: {education?.achievements}</li>
                      )}
                    </ul>
                  </fieldset>
                </Grid>
              );
            })}*/}

          {/** addresses */}
          {youthDetails?.permanent_address && (
            <Grid item xs={6}>
              <fieldset style={{backgroundColor: '#e7e5e2'}}>
                <legend style={{fontSize: '25px', color: '#4d39bf'}}>
                  {messages['common.addresses']}
                </legend>
                <Box>
                  <h2>{messages['common.permanent_address']}</h2>
                  <ul>
                    {youthDetails?.permanent_address?.loc_division_title && (
                      <li>
                        Division:{' '}
                        {youthDetails?.permanent_address?.loc_division_title}
                      </li>
                    )}
                    {youthDetails?.permanent_address?.loc_district_title && (
                      <li>
                        District:{' '}
                        {youthDetails?.permanent_address?.loc_district_title}
                      </li>
                    )}
                    {youthDetails?.permanent_address?.loc_upazila_title && (
                      <li>
                        Upazila:{' '}
                        {youthDetails?.permanent_address?.loc_upazila_title}
                      </li>
                    )}
                    {youthDetails?.permanent_address?.village_or_area && (
                      <li>
                        Village Area:{' '}
                        {youthDetails?.permanent_address?.village_or_area}
                      </li>
                    )}
                    {youthDetails?.permanent_address?.house_n_road && (
                      <li>
                        House & Road:{' '}
                        {youthDetails?.permanent_address?.house_n_road}
                      </li>
                    )}
                    {youthDetails?.permanent_address?.zip_or_postal_code && (
                      <li>
                        Zip or postal code:{' '}
                        {youthDetails?.permanent_address?.zip_or_postal_code}
                      </li>
                    )}
                  </ul>
                </Box>
                <Box>
                  <h2>{messages['common.present_address']}</h2>
                  <ul>
                    {youthDetails?.present_address?.loc_division_title && (
                      <li>
                        Division:{' '}
                        {youthDetails?.present_address?.loc_division_title}
                      </li>
                    )}
                    {youthDetails?.present_address?.loc_district_title && (
                      <li>
                        District:{' '}
                        {youthDetails?.present_address?.loc_district_title}
                      </li>
                    )}
                    {youthDetails?.present_address?.loc_upazila_title && (
                      <li>
                        Upazila:{' '}
                        {youthDetails?.present_address?.loc_upazila_title}
                      </li>
                    )}
                    {youthDetails?.present_address?.village_or_area && (
                      <li>
                        Village Area:{' '}
                        {youthDetails?.present_address?.village_or_area}
                      </li>
                    )}
                    {youthDetails?.present_address?.house_n_road && (
                      <li>
                        House & Road:{' '}
                        {youthDetails?.present_address?.house_n_road}
                      </li>
                    )}
                    {youthDetails?.present_address?.zip_or_postal_code && (
                      <li>
                        Zip or postal code:{' '}
                        {youthDetails?.present_address?.zip_or_postal_code}
                      </li>
                    )}
                  </ul>
                </Box>
              </fieldset>
            </Grid>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default RPLAssessmentDetailsPopup;
