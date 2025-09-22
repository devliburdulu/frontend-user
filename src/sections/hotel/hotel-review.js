"use client";

import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Paper, Typography, Stack, Box, Avatar, Divider, IconButton, Rating } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fDate } from "src/utils/format-time";
import ReviewDialog from "./dialog-review";
import Iconify from "src/components/iconify";

export default function HotelReview({ reviews }) {
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrev = () => sliderRef.current.slickPrev();
  const handleNext = () => sliderRef.current.slickNext();

  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleClickOpen = (item) => {
    setSelectedReview(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          position: "relative",
        }}
      >
        {/* Custom Arrow Buttons */}
        <Box>
          <IconButton onClick={handlePrev}>
            <ArrowForwardIosIcon sx={{ transform: "rotate(180deg)" }} />
          </IconButton>
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      {reviews?.length === 0 && (
        <Box>
          <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            Belum ada ulasan untuk Hotel ini
          </Typography>
        </Box>
      )}

      {/* Slider */}
      <Slider ref={sliderRef} {...sliderSettings}>
        {reviews?.map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              minHeight: "100%", // Ensure the Box takes full height
            }}
            onClick={() => handleClickOpen(item)}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "start",
                height: "100%", // Make Paper take full height
                display: "flex",
                flexDirection: "column",
                minHeight: 200, // Set a minimum height for consistency
                maxHeight: 230,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  flex: 1, // Allow text to take remaining space
                }}
              >
                {item.Text}
              </Typography>

              <Box>
                <Rating icon={<Iconify icon="line-md:star-filled" sx={{ fontSize: 10 }} />} emptyIcon={<Iconify icon="line-md:star-twotone" sx={{ fontSize: 10 }} />} name="read-only" value={item.Rating} readOnly />
                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="start">
                  <Avatar alt={item.AuthorName} src={item.avatar} sx={{ width: 48, height: 48 }} />
                  <Stack>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontSize: 13,
                      }}
                    >
                      {item.AuthorName}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {fDate(item.PostedTime)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Box>
        ))}
      </Slider>

      {/* Dialog */}
      {selectedReview && <ReviewDialog item={selectedReview} open={open} onClose={handleClose} />}
    </Box>
  );
}
