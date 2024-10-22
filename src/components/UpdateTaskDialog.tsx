import React, { useCallback } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogContent, IconButton, Stack, Typography } from '@mui/material';
import { CloseIcon } from './icons';
import { FormField } from './FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Task } from '../pages';

const schema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string(),
  });

export interface UpdateTaskFormData {
    name: string;
    description?: string;
}

interface UpdateTaskDialogProps {
    task: Task;
    open: boolean;
    onClose: () => void;
    onUpdate: (id: number, formValues: UpdateTaskFormData) => void;
}

export const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({ task, onClose, open, onUpdate }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateTaskFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: task.title,
            description: task.description,
        }
    });

    const onSubmit: SubmitHandler<UpdateTaskFormData> = useCallback((data) => {
        onUpdate(task.id, data);
        reset();
    }, [onUpdate, reset, task.id]);

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
                <Typography fontWeight="bold" color="#333333">Actualizar tarea</Typography>
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
