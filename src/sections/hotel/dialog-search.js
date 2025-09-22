import React from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputAdornment, IconButton, Typography, Chip } from "@mui/material";
import Iconify from "src/components/iconify/iconify";

export default function SearchDialog({
  open,
  onClose,
  location,
  onInputChange,
  filteredDestinations,
  popularDestinations,
  onSelectDestination, // Prop function from HotelView: expects (destination: object) => void
  isMobile,
}) {
  const handleLocalSelect = (destination) => {
    if (!destination || !destination.CityKey || !(destination.CityName || destination.name)) {
      console.error("SearchDialog: Invalid destination object passed to handleLocalSelect", destination);
      onClose();
      return;
    }
    onSelectDestination(destination);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} maxWidth={isMobile ? "xs" : "md"} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Cari Sesuai Destinasi
        <IconButton aria-label="close" onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
          <Iconify icon="mdi:close" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            placeholder="Masukkan nama akomodasi, destinasi, dll"
            sx={{
              "& fieldset": { border: "none" },
              border: "1px solid #e9ecee",
              borderRadius: 1,
              // Removed backgroundColor: '#fff' as it wasn't in the original style provided
            }}
            fullWidth
            value={location || ""}
            onChange={onInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="ic:round-search" />
                </InputAdornment>
              ),
              endAdornment: location ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => onInputChange({ target: { value: "" } })} edge="end">
                    <Iconify icon="mdi:clear" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            autoFocus
          />

          <Box>
            <Typography textAlign="left" variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Pilihan
            </Typography>

            {location && filteredDestinations.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Kept original style
                  alignItems: "start", // Kept original style
                }}
              >
                {filteredDestinations.map((destination, index) => (
                  <Box
                    key={destination.HotelKey || destination.CityKey || index}
                    onClick={() => handleLocalSelect(destination)} // Use local handler
                    sx={{
                      display: "flex",
                      gap: 1.5, // Adjusted gap from 1 to 1.5 for consistency
                      padding: "12px 16px", // Adjusted padding
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: "action.hover", // Use theme hover
                      },
                    }}
                  >
                    <Iconify icon={destination.type === "hotel" ? "mdi:hotel" : "mdi:city"} sx={{ color: "text.secondary", width: 24, height: 24, flexShrink: 0 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                        {destination.type === "hotel" ? destination.HotelName : destination.CityName}
                      </Typography>
                      {destination.type === "hotel" && destination.CityName && (
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {destination.CityName}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.disabled", ml: "auto", flexShrink: 0 }}>
                      {destination.type === "hotel" ? "Hotel" : "Kota"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {popularDestinations.map((destination) => (
                  <Chip
                    key={destination.id}
                    label={destination.CityName}
                    onClick={() => handleLocalSelect(destination)} // Use local handler
                    clickable
                    sx={{
                      // Original sx styles for Chip
                      color: "#000",
                      border: "1px solid #e9ecee",
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  />
                ))}
              </Box>
            )}
            {location && filteredDestinations.length === 0 && (
              <Typography sx={{ p: 2, color: "text.secondary", textAlign: "center" }}>{location.length === 0 ? "Masukkan nama akomodasi, destinasi, dll" : `Pencarian untuk keyword "${location}"`}</Typography>
            )}
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
