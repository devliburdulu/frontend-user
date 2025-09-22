"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

export default function EduCategory({ categories }) {
  const [activeCategory, setActiveCategory] = useState("umum");
  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        backgroundColor: "#1E293B",
        backgroundImage: "url('/bg-tab-edu.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "right",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", marginBottom: "12px", padding: "8px" }}>
        Kategori
      </Typography>

      <List sx={{ padding: 0 }}>
        {categories.map((category, index) => (
          <ListItemButton
            key={index}
            onClick={() => setActiveCategory(category.id)}
            sx={{
              color: activeCategory === category.id ? "white" : "#E2E8F0",
              marginBottom: "8px",
              borderRadius: "8px",
              padding: "8px",
              py: 1,
              backgroundImage: activeCategory === category.id,
              backgroundSize: "cover",
              backgroundPosition: "center",
              // "&:hover": {
              //   backgroundImage: `url('/path-to-your-image.jpg')`,
              //   color: "white",
              // },
            }}
          >
            <ListItemText
              primary={category.label}
              primaryTypographyProps={{
                fontSize: "14px",
                fontWeight: activeCategory === category.id ? "bold" : "normal",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
