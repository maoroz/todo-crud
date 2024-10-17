import React, { useCallback } from "react";
import { FormField, PageSection } from "../components";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Paper, Stack } from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  email: yup
    .string()
    .email('Debe ser un email válido')
    .required('El email es requerido'),
  telephone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números'),
});

interface FormInputs {
  name: string;
  email: string;
  telephone: string;
}

export const DataPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <PageSection title="Mis datos">
      <Paper sx={{ boxShadow: "0px 1px 4px 1px #0000001F" }}>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={1}
          p={2}
          sx={{
            marginInline: { xs: 0, md: '30%' },
          }}
        >
          <FormField
            id="name"
            label="Nombre"
            error={errors.name?.message}
            register={register('name')}
          />
          <FormField
            id="email"
            label="Email"
            error={errors.email?.message}
            register={register('email')}
          />
          <FormField
            id="telephone"
            label="Teléfono"
            error={errors.telephone?.message}
            register={register('telephone')}
          />

          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Stack>
      </Paper>
    </PageSection>
  );
}
