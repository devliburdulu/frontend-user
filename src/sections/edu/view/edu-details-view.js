"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Divider, IconButton, Stack, Container, Link, Breadcrumbs, Skeleton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { getSingleArticle } from "src/fetch-global";
import { fDateTime } from "src/utils/format-time";

export default function EduDetailsView() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);

  const handleDetailArticle = async () => {
    try {
      const res = await getSingleArticle(id);
      setArticle(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDetailArticle();
  }, []);

  if (article?.length === 0) {
    return router.push("/404");
  }

  return (
    <Container
      sx={{
        pb: 10,
        pt: { xs: 4, md: 6 },
        position: "relative",
      }}
    >
      <Box>
        {loading ? (
          // Skeleton placeholder
          <>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Skeleton variant="text" width={120} height={30} />
            </Breadcrumbs>
            <Card>
              <Skeleton variant="rectangular" height={350} />
              <CardContent>
                <Skeleton variant="text" width="60%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={15} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </>
        ) : (
          article?.map((article, index) => (
            <div key={index}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link color="inherit" href="/edu">
                  Kategori
                </Link>
                <Typography sx={{ color: "text.primary" }}>{article?.title}</Typography>
              </Breadcrumbs>
              <Card>
                {/* <CardMedia
                  component='img'
                  sx={{
                    width: '100%',
                    height: { xs: 'auto', md: 480 },
                    objectFit: 'inherit',
                  }}
                  image={
                    article?.banner_article?.url
                      ? `${process.env.NEXT_PUBLIC_IMAGE_EDU}${article.banner_article?.url}`
                      : '/Banner-Default-Mitra.png'
                  }
                  alt={`image ${article?.title || 'default'}`}
                /> */}

                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    {article?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                  >
                    {article?.sub_title}
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} sx={{ marginTop: 1 }} spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {fDateTime(article?.updatedAt)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" color="primary">
                        <i className="icon-share" />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <i className="icon-save" />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <i className="icon-more" />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography
                    variant="body2"
                    color="text.primary"
                    paragraph
                    sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                    dangerouslySetInnerHTML={{
                      __html: article?.description,
                    }}
                  >
                    {/* {article?.description} */}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </Box>
    </Container>
  );
}
