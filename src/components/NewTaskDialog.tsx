import React, { useCallback } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { CloseIcon } from './icons';
import { FormField } from './FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string(),
  });

export interface NewTaskFormData {
    name: string;
    description?: string;
}

interface NewTaskDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (formValues: NewTaskFormData) => void;
}

export const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ onClose, open, onSave }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewTaskFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<NewTaskFormData> = useCallback((data) => {
        onSave(data);
    }, [onSave]);

    const handleOnClose = useCallback(() => {
        reset();
        onClose();
    }, [reset, onClose]);

    return (
        <Dialog
            onClose={handleOnClose}
            open={open}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontWeight="bold" color="#333333">Añadir tarea</Typography>
                <IconButton onClick={handleOnClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    spacing={2}
                >
                    <FormField
                        id="name"
                        label="Nombre"
                        error={errors.name?.message}
                        register={register('name')}
                    />
                    <FormField
                        id="description"
                        label="Descripción"
                        error={errors.description?.message}
                        register={register('description')}
                        required={false}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button color="primary" onClick={handleOnClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Guardar
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
