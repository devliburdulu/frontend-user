"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { paths } from "src/routes/paths";
import { useRouter } from "next/navigation";
import { CMS_SELLER_URL } from "src/config-global";
import { fDateTime } from "src/utils/format-time";

export default function EduContent({ articles }) {
  const router = useRouter();

  

  // Handle detail navigation
  const handleDetail = (article) => {
    const detailPath = paths.edukasi.details(article.id); // Assuming `article.id` is the identifier
    router.push(detailPath);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {articles.length === 0 ? (
        <Typography sx={{ mt: 4, color: "text.secondary" }}>No articles available for this category.</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: "900px",
            justifyContent: "flex-start",
          }}
        >
          {articles.map((article, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={6}
              key={index}
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column-reverse", md: "row" },
                  // gap: 2,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                  maxWidth: { xs: 235, md: 420 },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        ":hover": {
                          cursor: "pointer",
                          textDecoration: "underline",
                        },

                        fontSize: { xs: 12, md: 16 },
                      }}
                      onClick={() => handleDetail(article)}
                    >
                      {article?.title?.length > 45 ? `${article?.title.slice(0, 45)} ...` : article?.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, fontSize: { xs: 10, md: 12 } }}>
                    {article?.author.name} • {fDateTime(article?.updatedAt)}
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: 140 },
                    maxWidth: { xs: "100%", md: 140 },
                    // height: { xs: 300, md: 160 },
                    objectFit: article.cover_thumbnail && article.cover_thumbnail[0]?.url ? "cover" : "contain",
                    border: article.cover_thumbnail && article.cover_thumbnail[0]?.url ? "none" : "none",
                    backgroundColor: !article.cover_thumbnail || !article.cover_thumbnail[0]?.url ? "#f0f0f0" : "transparent",
                  }}
                  image={article.cover_thumbnail && article.cover_thumbnail[0]?.url ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${article.cover_thumbnail[0].url}` : "/default image 1.png"}
                  alt={article?.title}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
