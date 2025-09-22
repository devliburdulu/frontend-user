import React from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, Paper, Avatar, Divider } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
import { fDate } from "src/utils/format-time";

export default function ReviewDialog({ open, onClose, item }) {
  const isMobile = useResponsive("down", "md");


  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} maxWidth={isMobile ? "xs" : "md"} fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">Reviews</Typography>

          <Typography variant="subtitle1" color="text.secondary">
            {item.Rating} / 5
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            textAlign: "start",
            maxHeight: "100%",
          }}
        >
          <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {item.Text}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="start">
              <Avatar alt={item.AuthorName} src={item.avatar} sx={{ width: 48, height: 48 }} />
              <Stack>
                <Typography variant="subtitle2">{item.AuthorName}</Typography>
                <Typography variant="caption" color="text.disabled">
                  {fDate(item.PostedTime)}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="end">
              <Typography variant="caption">{item.RelativeTime}</Typography>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
