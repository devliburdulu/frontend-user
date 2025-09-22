"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import EduHero from "../edu-hero";
import EduContent from "../edu-content";
import { getAllArticleCategories, getArticleByCategory } from "src/fetch-global";

export default function EduView() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const handleFetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await getAllArticleCategories();
      const fetchedCategories = res.data.map((category) => ({
        id: category.id,
        label: category.name,
      }));
      setCategories(fetchedCategories);
      setActiveCategory(fetchedCategories[0]?.id || null);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleFetchArticles = async (categoryId) => {
    try {
      setLoadingArticles(true);
      const res = await getArticleByCategory(categoryId);
      setArticles(res.data || []);
    } catch (error) {
      console.error(`Error fetching articles for category ${categoryId}:`, error);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      handleFetchArticles(activeCategory);
    }
  }, [activeCategory]);

  return (
    <>
      <EduHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 3, md: 3 },
          position: "relative",
        }}
      >
        <Box
          gap={5}
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "1fr 3fr",
          }}
        >
          {/* Left Section: Kategori */}
          <Box
            component={loadingCategories ? Skeleton : "div"}
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
              ...(loadingCategories && { bgcolor: "#1E293B", borderRadius: "12px", minHeight: "300px" }),
            }}
          >
            {loadingCategories ? null : (
              <>
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
              </>
            )}
          </Box>

          {/* Right Section: Articles */}
          <Box>{loadingArticles ? <Typography sx={{ textAlign: "center" }}>Loading Articles...</Typography> : <EduContent articles={articles} activeCategory={activeCategory} />}</Box>
        </Box>
      </Container>
    </>
  );
}
