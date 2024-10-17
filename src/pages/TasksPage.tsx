import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, NewTaskDialog, NewTaskFormData, PageSection } from "../components";
import { Alert, Button, IconButton, LinearProgress, List, ListItem, ListItemText, Pagination, Paper, Stack, Typography } from "@mui/material";

interface Task {
  userId: number;
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const itemsPerPage = 3;
const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris.";

export const TasksPage = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);

  const numberOfPages = useMemo(() => Math.ceil(tasks.length / itemsPerPage), [tasks]);

  const handleDelete = useCallback((taskId: number) => () => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDialog = useCallback(() => {
    setOpenNewTaskDialog((prevState) => !prevState);
  }, []);

  const handleCreateNewTask = useCallback((formData: NewTaskFormData) => {
    console.log(tasks.length);
    const newTask: Task = {
      userId: 1,
      id: tasks.length + 1,
      title: formData.name,
      description: formData.description,
      completed: false,
    };
    setTasks((prevState) => ([newTask, ...prevState]));
    handleDialog();
  }, [handleDialog, tasks.length]);

  const fetchTasks = useCallback(async () => {
    try {
      setErrorMsg(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const backTasks = await response.json();
      setTasks(backTasks.map((t: Task) => ({ description: defaultDescription, ...t })));
    } catch (err) {
      setErrorMsg('Ha ocurrido un error al intentar obtener las tareas..');
      console.error(err);
    } finally {
      setLoading(false); // Establecer estado de carga después de la llamada
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <PageSection title="Mis tareas">
      {loading ? (
        <LinearProgress />
      ) : errorMsg ? (
        <Alert severity="error">{errorMsg}</Alert>
      ) : (
        <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <List component={Stack} spacing={2} width="100%">
            {tasks
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((task) => (
                <ListItem
                  key={task.id}
                  component={Paper}
                  secondaryAction={
                    <IconButton edge="end" aria-label="Eliminar" onClick={handleDelete(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={<Typography fontWeight="bold" color="#333333">{task.title}</Typography>}
                    secondary={task.description}
                  />
                </ListItem>
              ))}
          </List>
          <Pagination
            count={numberOfPages}
            page={currentPage}
            onChange={handleChangePage}
            defaultPage={1}
            color="primary"
            size="small"
            showFirstButton
            showLastButton
          />
          <Button variant="contained" color="primary" fullWidth sx={{ maxWidth: '23.75rem' }} onClick={handleDialog}>
            Añadir tarea
          </Button>
        </Stack>
      )}
      <NewTaskDialog open={openNewTaskDialog} onClose={handleDialog} onSave={handleCreateNewTask} />
    </PageSection >
  );
}
