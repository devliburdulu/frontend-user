// components/TripCard.js
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const TripCard = ({ image, title, location, price }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%", // Membuat kartu mengisi tinggi penuh
      }}
    >
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent
        sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h8"
          component="div"
          sx={{
            fontSize: "1rem",
            color: "#00A9B5",
            marginBottom: 1,
            fontWeight: "bold",
          }}
        >
          Open Trip
        </Typography>
        <Typography
          variant="h8"
          component="div"
          sx={{
            fontSize: "1rem",
            color: "#FF8C00",
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Box mt={2} sx={{ mt: "auto" }}>
          <Typography
            variant="h8"
            component="div"
            sx={{
              fontSize: "1rem",
              color: "#00A9B5",
              fontWeight: "bold",
            }}
          >
            Mulai dari
          </Typography>
          <Typography variant="h6" color="primary">
            {price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
