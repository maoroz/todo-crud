import React, { useCallback, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const TypographyStyled = styled(Typography)({
    fontWeight: "bold",
    textTransform: "none",
});

const tabs = [
    { label: 'Mis datos', path: '/mis-datos', value: 0 },
    { label: 'Mis tareas', path: '/mis-tareas', value: 1 },
    { label: 'Mis devoluciones', path: '/mis-devoluciones', value: 2 },
    { label: 'Mis comunicaciones', path: '/mis-comunicaciones', value: 3 },
    { label: 'Mis mejores amigos', path: '/mis-mejores-amigos', value: 4 },
];

export const ScrollableTabsMenu: React.FC = () => {
    const [tabValue, setValue] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const handleTabsChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(tabs[newValue].path);
    }, [navigate]);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentTab = tabs.find(tab => tab.path === currentPath);

        if (currentTab) {
            setValue(currentTab.value);
        }
      }, [tabValue, location.pathname]);

    return (
        <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
            <Tabs
                value={tabValue}
                onChange={handleTabsChange}
                variant="scrollable"
                allowScrollButtonsMobile
            >
                {tabs.map(({ label, value }) => (
                    <Tab
                        key={value}
                        label={<TypographyStyled>{label}</TypographyStyled>}
                        sx={{ flexGrow: 1 }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
