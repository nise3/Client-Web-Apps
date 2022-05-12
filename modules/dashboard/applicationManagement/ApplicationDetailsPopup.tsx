import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchApplicationDetails} from '../../../services/instituteManagement/hooks';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {nationalities} from '../../../@softbd/utilities/Nationalities';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import IconCourse from '../../../@softbd/icons/IconCourse';

type Props = {
  itemId: number;
  onClose: () => void;
};

const ApplicationDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchApplicationDetails(itemId);

  const router = useRouter();
  const path = router.pathname;

  const getGenderTitle = (genderNumber: number) => {
    switch (genderNumber) {
      case 1:
        return messages['common.male'];
      case 2:
        return messages['common.female'];
      case 3:
        return messages['common.others'];
      default:
        return messages['common.notDefined'];
    }
  };

  const getPaymentTitle = (paymentNumber: number) => {
    switch (paymentNumber) {
      case 0:
        return messages['common.unpaid'];
      case 1:
        return messages['common.paid'];
      default:
        return messages['common.notDefined'];
    }
  };

  const getReligionTitle = (religionNumber: number) => {
    switch (religionNumber) {
      case 1:
        return messages['common.religion_islam'];
      case 2:
        return messages['common.religion_hinduism'];
      case 3:
        return messages['common.religion_christianity'];
      case 4:
        return messages['common.religion_buddhism'];
      case 5:
        return messages['common.religion_judaism'];
      case 6:
        return messages['common.religion_sikhism'];
      case 7:
        return messages['common.religion_ethnic'];
      case 8:
        return messages['common.religion_atheist'];
      default:
        return messages['common.notDefined'];
    }
  };

  const getMaritalStatusTitle = (maritalNumber: number) => {
    switch (maritalNumber) {
      case 1:
        return messages['common.marital_status_single'];
      case 2:
        return messages['common.marital_status_married'];
      case 3:
        return messages['common.marital_status_widowed'];
      case 4:
        return messages['common.marital_status_divorced'];
      default:
        return messages['common.notDefined'];
    }
  };

  const getFreedomFighterStatusTitle = (freedomFighterNumber: number) => {
    switch (freedomFighterNumber) {
      case 1:
        return messages['common.no'];
      case 2:
        return messages['common.yes'];
      case 3:
        return messages['freedom_fighter_status.child'];
      case 4:
        return messages['freedom_fighter_status.grand_child'];
      default:
        return messages['common.notDefined'];
    }
  };

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
                btnText='applicationManagement.viewCV'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                style={{marginTop: '10px'}}
              />
            </Link>
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['programme.label']}
              value={itemData?.program_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['programme.label_en']}
              value={itemData?.program_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.label']}
              value={itemData?.course_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.label_en']}
              value={itemData?.course_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['training_center.label']}
              value={itemData?.training_center_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['training_center.label_en']}
              value={itemData?.training_center_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['applicationManagement.assignedBatch']}
              value={itemData?.batch_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.paymentStatus']}
              value={getPaymentTitle(itemData?.payment_status)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.first_name_bn']}
              value={itemData?.first_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.first_name_en']}
              value={itemData?.first_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.last_name_bn']}
              value={itemData?.last_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.last_name_en']}
              value={itemData?.last_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.gender']}
              value={getGenderTitle(itemData?.gender)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.date_of_birth']}
              value={itemData?.date_of_birth}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['youth.mobile']}
              value={itemData?.mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.identity_number_type']}
              value={itemData?.identity_number_type}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.identity_number']}
              value={itemData?.identity_number}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.religion']}
              value={getReligionTitle(itemData?.religion)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.marital_status']}
              value={getMaritalStatusTitle(itemData?.marital_status)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.nationality']}
              value={nationalities[itemData?.nationality - 1]?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.freedom_fighter_status']}
              value={getFreedomFighterStatusTitle(
                itemData?.freedom_fighter_status,
              )}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.physical_disabilities_status']}
              value={
                itemData?.physical_disability_status ===
                PhysicalDisabilityStatus.YES
                  ? messages['common.yes']
                  : messages['common.no']
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>

          {/** addresses */}
          {itemData?.addresses.length > 0 && (
            <Grid item xs={6}>
              <fieldset style={{backgroundColor: '#e7e5e2'}}>
                <legend style={{fontSize: '25px', color: '#4d39bf'}}>
                  {messages['common.addresses']}
                </legend>
                {(itemData?.addresses).map((address: any) => {
                  return (
                    <div key={address.id}>
                      <h2>
                        {address.address_type === 1
                          ? messages['common.permanent_address']
                          : messages['common.present_address']}
                      </h2>
                      <ul>
                        {address?.loc_division_title && (
                          <li>Division: {address?.loc_division_title}</li>
                        )}
                        {address?.loc_district_title && (
                          <li>District: {address?.loc_district_title}</li>
                        )}
                        {address?.loc_upazila_tile && (
                          <li>Upazila: {address?.loc_upazila_tile}</li>
                        )}
                        {address?.village_or_area && (
                          <li>Village Area: {address?.village_or_area}</li>
                        )}
                        {address?.house_n_road && (
                          <li>House & Road: {address?.house_n_road}</li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </fieldset>
            </Grid>
          )}

          {/** Guardian */}
          {itemData?.guardian && (
            <Grid item xs={6}>
              <fieldset style={{backgroundColor: '#e7e5e2'}}>
                <legend style={{fontSize: '25px', color: '#4d39bf'}}>
                  {messages['guardian.title']}
                </legend>
                {itemData?.guardian?.father_name && (
                  <>
                    <h2>{messages['common.father_information']}</h2>
                    <ul>
                      <li>Name: {itemData?.guardian?.father_name}</li>
                      {itemData?.guardian?.father_mobile && (
                        <li>
                          Mobile Number: {itemData?.guardian?.father_mobile}
                        </li>
                      )}
                      {itemData?.guardian?.father_nid && (
                        <li>NID Number: {itemData?.guardian?.father_nid}</li>
                      )}
                      {itemData?.guardian?.father_date_of_birth && (
                        <li>
                          Date of Birthdate:{' '}
                          {itemData?.guardian?.father_date_of_birth}
                        </li>
                      )}
                    </ul>
                  </>
                )}
                {itemData?.guardian?.mother_name && (
                  <>
                    <h2>{messages['common.mother_information']}</h2>
                    <ul>
                      <li>Name: {itemData?.guardian?.mother_name}</li>
                      {itemData?.guardian?.mother_mobile && (
                        <li>
                          Mobile Number: {itemData?.guardian?.mother_mobile}
                        </li>
                      )}
                      {itemData?.guardian?.mother_nid && (
                        <li>NID Number: {itemData?.guardian?.mother_nid}</li>
                      )}
                      {itemData?.guardian?.mother_date_of_birth && (
                        <li>
                          Date of Birthdate:{' '}
                          {itemData?.guardian?.mother_date_of_birth}
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </fieldset>
            </Grid>
          )}

          {/** Educations */}
          {itemData?.educations?.map((education: any) => {
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
                        Year of passing: {parseInt(education?.year_of_passing)}
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
          })}

          {/** Physical Disabilities */}
          {itemData?.physical_disability_status ===
            PhysicalDisabilityStatus.YES &&
            itemData?.physical_disabilities && (
              <Grid item xs={6}>
                <fieldset style={{backgroundColor: '#e7e5e2'}}>
                  <legend style={{fontSize: '25px', color: '#4d39bf'}}>
                    {messages['common.physical_disability']}
                  </legend>
                  {(itemData?.physical_disabilities).map((disablity: any) => {
                    return <h3 key={disablity.id}>{disablity?.title}</h3>;
                  })}
                </fieldset>
              </Grid>
            )}

          {/** Miscellaneous */}
          {itemData?.miscellaneous && (
            <Grid item xs={6}>
              <fieldset style={{backgroundColor: '#e7e5e2'}}>
                <legend style={{fontSize: '25px', color: '#4d39bf'}}>
                  {messages['common.miscellaneous']}
                </legend>
                <ul>
                  <li>
                    Has own family home?{' '}
                    <h3>
                      {itemData?.miscellaneous?.has_own_family_home
                        ? 'Yes'
                        : 'No'}
                    </h3>
                  </li>
                  <li>
                    Has own family land?{' '}
                    <h3>
                      {itemData?.miscellaneous?.has_own_family_land
                        ? 'Yes'
                        : 'No'}
                    </h3>
                  </li>
                  <li>
                    Number of siblings:{' '}
                    <h3 style={{lineHeight: '0px'}}>
                      {itemData?.miscellaneous?.number_of_siblings}
                    </h3>
                  </li>
                </ul>
              </fieldset>
            </Grid>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default ApplicationDetailsPopup;
