import React from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, IconButton } from "@mui/material";
import { useSearchParams } from "src/routes/hooks";
export default function GuestDialog({ open, onClose, rooms, setRooms, adults, setAdults, children, setChildren, onIncrement, onDecrement, filterData, setFilterData, isMobile }) {
  const searchParams = useSearchParams();

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} maxWidth={isMobile ? "xs" : "md"} fullWidth>
      <DialogTitle>Kamar & Tamu</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{
            margin: "auto",
            display: "flex",
            width: "100%",
            marginTop: 3,
            gap: 2.5,
            flexDirection: "column",
          }}
        >
          {/* {[
            { label: "Kamar", value: rooms, setter: setRooms },
            { label: "Dewasa", value: adults, setter: setAdults },
            { label: "Anak (di bawah 17 tahun)", value: children, setter: setChildren },
          ].map((item) => (
            <Stack key={item.label} direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{item.label}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={onDecrement(item.setter)}
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #e9ecee",
                    borderColor: "divider",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  -
                </IconButton>
                <Typography width="48px" component="span" align="center" sx={{ display: "inline-block", textAlign: "center" }}>
                  {item.value}
                </Typography>
                <IconButton
                  onClick={onIncrement(item.setter)}
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #e9ecee",
                    borderColor: "divider",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </IconButton>
              </Box>
            </Stack>
          ))} */}

          {[
            { label: "Kamar", value: rooms, setter: setRooms, key: "rooms" },
            { label: "Dewasa", value: adults, setter: setAdults, key: "adults" },
            { label: "Anak (di bawah 17 tahun)", value: children, setter: setChildren, key: "children" },
          ].map((item) => (
            <Stack key={item.label} direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{item.label}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={onDecrement(item.setter, item.key)}
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #e9ecee",
                    borderColor: "divider",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  -
                </IconButton>
                <Typography width="48px" component="span" align="center" sx={{ display: "inline-block", textAlign: "center" }}>
                  {item.value}
                </Typography>
                <IconButton
                  onClick={onIncrement(item.setter, item.key)}
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #e9ecee",
                    borderColor: "divider",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </IconButton>
              </Box>
            </Stack>
          ))}
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
