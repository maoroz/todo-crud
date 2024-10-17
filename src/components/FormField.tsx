import { InputLabel, Stack, TextField } from "@mui/material";
import React from "react";

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    register: any;
    required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ id, label, error, register, required = true }) => {
    return (
    <Stack spacing={1}>
        <InputLabel
            shrink={false}
            htmlFor={id}
            sx={{ fontSize: '0.875rem', color: (theme) => theme.palette.text.primary }}
            required={required}
        >
            {label}
        </InputLabel>
        <TextField
            id={id}
            {...register}
            error={!!error}
            helperText={error ?? ''}
            fullWidth
            required={required}
            placeholder={label}
        />
    </Stack>
    );
}
