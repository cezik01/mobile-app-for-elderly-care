import { ReactNode } from "react";
import { FormFields } from "./FormFieldsProps";

export interface AuthFormProps {
    onSubmit: (values: FormFields) => void;
    buttonTitle: string;
    children: ReactNode;
}