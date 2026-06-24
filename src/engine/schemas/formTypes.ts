export type FormField = 
    | CheckboxGroupField 
    | SelectField
    | TextareaField;

export type CheckboxGroupField = {
    id: string;
    type: "checkboxGroup";
    label: string;
    options: string[];
    required?: boolean;
};

export type SelectField = {
    id: string;
    type: "select";
    label: string;
    options: string[];
    required?: boolean;
};

export type TextareaField = {
    id: string;
    type: "textarea";
    label: string;
    required?: boolean;
};

export type Form = {
    id: string;
    title: string;
    required: boolean;
    fields: FormField[];
};