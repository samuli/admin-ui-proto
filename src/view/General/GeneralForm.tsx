import React from "react";
import { useState, Fragment } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormSubmit from "../../components/formSubmit";
import {
  InputType, Input, PromptUnsaved, SelectOption, RadioGroup, CheckboxGroup, Select
} from "../../components/formElement";

import {
  ViewId, ViewVisibility, ViewStatus, ViewGeneral, Language, EmailAddress
} from "../../types";

export type GeneralFormValues = ViewGeneral;

interface Props {
  onSubmit: (values: GeneralFormValues) => void;
  onCancel: () => void;
  view: {
    id: ViewId,
    title: string;
    email: EmailAddress;
    visibility: ViewVisibility;
    languages: Language[];
    defaultLanguage: Language;
    description?: string;
    status: ViewStatus;
    commentsEnabled: boolean;
    parentView?: number;
  };
  allLanguages: Language[];
  availableParentViews: Array<{ id: number; name: string }>;
}

const visibilityOptions: Array<SelectOption> = [
  { value: ViewVisibility.Visible, label: ViewVisibility.Visible },
  { value: ViewVisibility.Hidden, label: ViewVisibility.Hidden }
];

const schema = yup.object().shape({
  title: yup.string().required(),
  email: yup.string().email().required(),
  description: yup.string(),
  visibility: yup.string().oneOf(Object.values(ViewVisibility)).required(),
  languages: yup.mixed()
    .test("languages", "required", function (values: Array<string>) {
      const allLanguages: Array<string> = Object.values(Language);
      const ok = values.filter(lang => lang && allLanguages.includes(lang));
      return values.length > 0 && ok.length === values.length;
    }), 
  commentsEnabled: yup.boolean().required(),
  parentView: yup.number().nullable().transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
});

export const GeneralForm: React.FC<Props> = (
  { onSubmit, onCancel,
    view: {
      id, title, email, description, visibility, status, languages, defaultLanguage, commentsEnabled, parentView
    },
    allLanguages,
    availableParentViews
  } ) => {
  const [showPrompt, setShowPrompt] = useState(false);
 
  const { register, handleSubmit, formState, errors, watch } = useForm({
    defaultValues: {
      id: id,
      title: title,
      email: email,
      description: description,
      visibility,
      languages: Object.values(languages),
      defaultLanguage,
      status,
      commentsEnabled,
      parentView: parentView || ""
    },
    mode: "onChange",
    resolver: yupResolver(schema)
  } );

  const submitForm = (data: Omit<GeneralFormValues, "parentView">) => {
    console.log("data: ", data);
    onSubmit({...data});
  };

  const { isDirty, isValid } = formState;

  const cancelForm = () => {
    if (isDirty) {
      setShowPrompt(true);
    } else {
      onCancel();
    }
  };

  const selectedLanguages = watch("languages");
  const mapToLanguageOptions = (languages: Array<Language>) => languages.map(lang => {
    return { value: lang, label: lang };
  });
  const parentViewOptions = [{value: "", label: "nope"}].concat(availableParentViews.map(({ id, name }) => {
    return { value: String(id), label: name };
  }));
  

  return (
    <Fragment>
      <form onSubmit={handleSubmit(submitForm)}>
        <Input name="title" label="Title" type={InputType.TEXT} errors={errors} register={register} />
        <Input name="description" label="Description" type={InputType.TEXT} errors={errors} register={register} />
        <Input name="email" label="Email" type={InputType.EMAIL} errors={errors} register={register} />
        <RadioGroup name="visibility" label="Visibility" options={visibilityOptions} errors={errors} register={register} />
        <CheckboxGroup name="languages" label="Languages" options={mapToLanguageOptions(allLanguages)} errors={errors} register={register} />
        <CheckboxGroup name="commentsEnabled" label="Comments" options={[{value: "1", label: "Show comments"}]} errors={errors} register={register} />
        { parentViewOptions &&
          <Select name="parentView" label="Parent view" options={parentViewOptions} placeholder="No parent view" errors={errors} register={register} />
        }
        <Select name="defaultLanguage" label="Default language" options={mapToLanguageOptions(selectedLanguages)} errors={errors} register={register} />
        <FormSubmit disabled={!isDirty || !isValid} onCancel={() => cancelForm()} />
     </form>
    <PromptUnsaved
      open={showPrompt}
      onCancel={() => setShowPrompt(false)}
      onConfirm={onCancel}
    />
   </Fragment>
  );
};

export default GeneralForm;
