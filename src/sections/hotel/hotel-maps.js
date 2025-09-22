import { Stack, Typography, Box } from "@mui/material";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useResponsive } from "src/hooks/use-responsive";

export default function HotelMaps({ address, long, lat }) {
  const isDekstop = useResponsive("up", "md");

  return (
    <Stack sx={{ my: 2 }}>
      {/* <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Lokasi
      </Typography> */}
      {/* <GoogleMapsEmbed
        apiKey={process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAPS}
        loading="lazy"
        allowfullscreen
        style="border-radius: 15px;"
        zoom=""
          center={{
            lat: 10.7626,
            lng: 106.6765,
          }}
        markers={[
          {
            lat: 10.7626,
            lng: 106.6765,
            label: "Hotel",
          },
        ]}
        q="Libur dulu"
        width="100%"
        height="260px"
      /> */}
      <iframe
        width="100%"
        height="260px"
        className="rounded-[15px]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAPS}
    &q=${address}${lat},${long}&zoom=15`}
      ></iframe>
      <Typography variant="body2" fontSize={12} sx={{ my: 1, color: "text.secondary", width: isDekstop ? "50%" : "100%" }}>
        {!address ? "No address" : address}
      </Typography>
    </Stack>
  );
}
