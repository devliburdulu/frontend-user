import { Stack, Typography, Grid, Box } from "@mui/material";
import Iconify from "src/components/iconify";

export default function HotelFacilities({ facilities }) {
  return (
    <Stack spacing={2}>
      {/* <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Fasilitas Populer
      </Typography> */}
      <Grid container spacing={2}>
        {facilities?.length === 0 && (
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Tidak ada fasilitas
              </Typography>
            </Box>
          </Grid>
        )}

        {facilities?.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* <Iconify icon={item.icon} width={24} /> */}
              <Typography variant="body2">{item.Description}</Typography>
              {/* <Typography variant="body2" fontWeight={"bold"}>
                {item.Code}
              </Typography> */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
