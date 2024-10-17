import { Stack, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface PaperSectionProps extends PropsWithChildren {
    title: string;
}

export const PageSection: React.FC<PaperSectionProps> = ({ title, children }) => {
  return (
    <Stack
        height="100%"
        marginInline={3}
        marginBlock={4}
        spacing={2}
        alignContent="center"
        justifyContent="center"
    >
        <Typography
            variant="h6"
            component="h1"
            fontWeight="bold"
            color="textPrimary"
        >
            {title}
        </Typography>
        {children}
    </Stack>
  );
}
