import React from "react";
import { Confirm } from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage";

export enum InputType {
  TEXT = "text",
  EMAIL = "email"
}

interface InputProps {
  name: string;
  label: string;
  type: InputType;
  errors: any;
  register: any;
}

export const Input: React.FC<InputProps> = ({ name, label, type, errors, register }) => {
  return (
    <div>
      <Label text={label} element={name} />
      <div className="ui fluid input">
      <input name={name} type={type} ref={register()} />
      </div>
      {errors[name] && <ErrorMessage message={errors[name].type} />}
    </div>
  );
};

export interface SelectOption {
  value: string;
  label: string;
}

export interface CheckboxOption {
  option: SelectOption;
  checked: boolean;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: Array<SelectOption>;
  errors: any;
  register: any;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, options, errors, register }) => {
  return (
    <div>
      <Label text={label} element={name} />
      <div>
      { options.map(opt =>
        <div key={opt.value} className="ui radio checkbox">
          <input className="ui input" name={name} id={opt.value} value={opt.value} ref={register()} type="radio" />
          <label htmlFor={opt.value}>{opt.label}</label>
        </div>
      )}
    </div>
      {errors[name] && <ErrorMessage message={errors[name].type} />}
    </div>
  );
};

interface SelectProps {
  name: string;
  label: string;
  options: Array<SelectOption>;
  errors: any;
  register: any;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ name, label, options, placeholder, errors, register }) => {
  return (
    <div>
      <Label text={label} element={name} />
      <div>
        <select name={name} ref={register()}>

          { options.map(opt => {
            return (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            );
          }) }
        </select>
      </div>
      {errors[name] && <ErrorMessage message={errors[name].type} />}
    </div>
  );
};

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: Array<SelectOption>; //string>,
  errors: any;
  register: any;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, label, options, errors, register }) => {
  return (
    <div>
      <Label text={label} element={name} />
      <div>
      { options.map(({value,label}) =>
          <div key={value} className="ui checkbox">
            <input className="hidden" name={name} id={value} value={value} ref={register()} type="checkbox" />
            <label htmlFor={value}>{label}</label>
          </div>
        )}
    </div>
      {errors[name] && <ErrorMessage message={errors[name].type} />}
    </div>
  );
};


const Label: React.FC<{ text: string; element: string }> = ({ text, element }) => {
  return <label htmlFor={element}>{text}</label>;
};

export const PromptUnsaved: React.FC<{ open: boolean; onCancel: () => void; onConfirm: any }> = ( { open, onCancel, onConfirm }) => {
  return (
    <Confirm
    open={open}
    header="Exit without saving"
    onCancel={onCancel}
    onConfirm={onConfirm}
      />
  );
};
