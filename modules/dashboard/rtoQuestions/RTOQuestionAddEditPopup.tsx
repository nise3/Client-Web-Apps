import { Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { FC, useEffect, useMemo, useState } from "react";
import HookFormMuiModal from "../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";
import SubmitButton from "../../../@softbd/elements/button/SubmitButton/SubmitButton";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import IconFAQ from "../../../@softbd/icons/IconFAQ";
import yup from "../../../@softbd/libs/yup";
import CustomFilterableFormSelect from "../../../@softbd/elements/input/CustomFilterableFormSelect";
import CustomTextInput from "../../../@softbd/elements/input/CustomTextInput/CustomTextInput";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import { useFetchRPLSector, useFetchSubjects } from "../../../services/CertificateAuthorityManagement/hooks";
import { LEVEL } from "../courses/CourseEnums";
import { AnswerType, OPTIONS, QuestionType } from "./QuestionEnums";
import CustomFormSelect from "../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect";
import FormRadioButtons from "../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons";

interface RPLSectorsAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: "",
  title_en: "",
  row_status: "1",
  question_type_id: "1",
  answer_yn_id: "1"
};

const RTOQuestionAddEditPopup: FC<RPLSectorsAddEditPopupProps> = ({
                                                                    itemId,
                                                                    refreshDataTable,
                                                                    ...props
                                                                  }) => {
  const { messages } = useIntl();
  /*const { errorStack } = useNotiStack();
  const { createSuccessMessage, updateSuccessMessage } = useSuccessMessage();*/

  const [subjectFilters] = useState({});

  const isEdit = itemId != null;
  const {
    // data: itemData,
    isLoading,
    //mutate: mutateRPLSector
  } = useFetchRPLSector(itemId);

  const { data: countries, isLoading: isFetchingCountries } =
    useFetchSubjects(subjectFilters);

  const levels = useMemo(
    () => [
      {
        id: LEVEL.BEGINNER,
        label: messages["level.easy"]
      },
      {
        id: LEVEL.INTERMEDIATE,
        label: messages["level.intermediate"]
      },
      {
        id: LEVEL.EXPERT,
        label: messages["level.hard"]
      }
    ],
    [messages]
  );

  const option = useMemo(
    () => [
      {
        id: OPTIONS.OPTION_1,
        label: messages["option.option1"]
      },
      {
        id: OPTIONS.OPTION_2,
        label: messages["option.option2"]
      },
      {
        id: OPTIONS.OPTION_3,
        label: messages["option.option3"]
      },
      {
        id: OPTIONS.OPTION_4,
        label: messages["option.option4"]
      }
    ],
    [messages]
  );

  const questionTypes = useMemo(
    () => [
      {
        key: QuestionType.MCQ,
        label: messages["question.type.mcq"]
      },
      {
        key: QuestionType.YES_NO,
        label: messages["question.type.y_n"]
      }
    ],
    [messages]
  );

  const answerTypes = useMemo(
    () => [
      {
        key: AnswerType.YES,
        label: messages["answer.type.yes"]
      },
      {
        key: AnswerType.NO,
        label: messages["answer.type.no"]
      }
    ],
    [messages]
  );

  const [countryList, setCountryList] = useState<any>([]);

  const [isMCQ, setIsMCQ] = useState<boolean>(true);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .trim()
        .required()
        .label(messages["question.label"] as string),
      country: yup.array().of(
        yup.object().shape({
          title: yup
            .string()
            .trim()
            .required()
            .label(messages["question.label"] as string)
        })
      )
    });
  }, [messages]);

  const {
    register,
    control,
    // reset,
    //setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<any>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    setCountryList(countries);
  }, [countries]);


  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if(!isMCQ){
      data.option_1= '';
      data.option_1_en= '';
      data.option_2= '';
      data.option_2_en= '';
      data.option_3= '';
      data.option_3_en= '';
      data.option_4= '';
      data.option_4_en= '';
    }
    console.log(data);
   /* return;
    try {
      if (itemId) {
        await updateRPLSector(itemId, data);
        updateSuccessMessage("question.label");
        mutateRPLSector();
      } else {
        await createRPLSector(data);
        createSuccessMessage("question.label");
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({ error, setError, validationSchema, errorStack });
    }*/
  };

  const changeType = (e: any) => {
    if (e == '1') {
      setIsMCQ(true);
      /*reset({
        answer_yn_id: ''
      })*/
    } else {
      setIsMCQ(false);
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      maxWidth={isBreakPointUp("xl") ? "lg" : "md"}
      title={
        <>
          <IconFAQ />
          {isEdit ? (
            <IntlMessages
              id="common.edit"
              values={{ subject: <IntlMessages id="question.label" /> }}
            />
          ) : (
            <IntlMessages
              id="common.add_new"
              values={{ subject: <IntlMessages id="question.label" /> }}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            id={"title"}
            label={messages["common.title"]}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id={"title_en"}
            label={messages["common.title_en"]}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            id={"subject_id"}
            label={messages["subject.label"]}
            isLoading={isFetchingCountries}
            control={control}
            options={countryList}
            optionValueProp={"country_id"}
            optionTitleProp={["title"]}
            errorInstance={errors}
            // onChange={onCountryListChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id="difficulty_level"
            label={messages["question.difficulty_level"]}
            isLoading={false}
            control={control}
            options={levels}
            optionValueProp="id"
            optionTitleProp={["label"]}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <FormRadioButtons
            id="type"
            label={"question.type"}
            radios={questionTypes}
            control={control}
            defaultValue={initialValues.question_type_id}
            isLoading={isLoading}
            onChange={changeType}
          />
        </Grid>



        {isMCQ && (<>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_1"}
              label={messages["option.option1"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_1_en"}
              label={messages["option.option1_en"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_2"}
              label={messages["option.option2"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_2_en"}
              label={messages["option.option2_en"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_3"}
              label={messages["option.option3"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_3_en"}
              label={messages["option.option3_en"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_4"}
              label={messages["option.option4"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={"option_4_en"}
              label={messages["option.option4_en"]}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid></>)}


        {isMCQ ? <Grid item xs={6}>
            <CustomFormSelect
              id="answer"
              label={messages["question.answer"]}
              isLoading={false}
              control={control}
              options={option}
              optionValueProp="id"
              optionTitleProp={["label"]}
              errorInstance={errors}
            />
          </Grid>
          :
          <Grid item xs={6}>
            <FormRadioButtons
              id="answer"
              label={"question.answer"}
              radios={answerTypes}
              control={control}
              defaultValue={initialValues.answer_yn_id}
              isLoading={isLoading}
            />
          </Grid>
        }

      </Grid>
    </HookFormMuiModal>
  );
};
export default RTOQuestionAddEditPopup;
