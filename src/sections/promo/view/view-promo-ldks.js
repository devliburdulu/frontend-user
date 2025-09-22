"use client";

import React, { useState } from "react";
import { Container, Stack, TextField, Autocomplete, Typography, Divider, Box, IconButton, Button, CircularProgress } from "@mui/material";
import MainLayout from "src/layouts/main";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { bgGradient } from "src/theme/css";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter } from "src/routes/hooks";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import { requestTrip } from "src/fetch-global";

const options = [
  { label: "Tn", id: 1 },
  { label: "Ny", id: 2 },
];

const transportOptions = [
  { label: "Big Bus", id: 1 },
  { label: "Medium Bus", id: 2 },
  { label: "Hi-Ace / Elf", id: 3 },
  { label: "Pesawat", id: 4 },
  { label: "Kereta Api", id: 5 },
  { label: "Lainnya (Ketik Sendiri)", id: 6 },
];
const bannerImageUrl = "/LDKS-01.png";

export default function FormRequestTrip() {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      jumlah: "",
      selectedTransport: "",
      startDate: null,
      endDate: null,
      hometown: "",
      budget_per_pax: "",
      description: "",
    },
    mode: "onTouched",
  });
  const theme = useTheme();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [destinations, setDestinations] = useState([""]);

  const handleTransportChange = (event, value) => {
    setSelectedTransport(value?.label);
    setValue("selectedTransport", value?.label);
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, ""]);
  };

  const handleDeleteDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    router.push("/");
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const requestBody = {
      full_name: data.fullName,
      group_name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      jumlah: data.jumlah,
      transport: data.selectedTransport,
      tanggal_tour: `${data.startDate}-${data.endDate}`,
      asal: data.hometown,
      tujuan: destinations.join(", "),
      budget_per_pax: data.budget_per_pax,
      deskripsi_tour: data.description,
      type: "Promo LDKS",
    };

    try {
      const response = await requestTrip(requestBody);
      router.push("/");
    } catch (error) {
      console.error("Trip request failed:", error);
    }
  };

  return (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, theme.palette.mode === "light" ? 0.88 : 0.94),
          imgUrl: "/assets/background/overlay_auth.jpg",
        }),
      }}
    >
      <MainLayout>
        <Container sx={{ mt: 15, mb: 10, px: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              height: { xs: 250, md: 650 },
              width: "100%",
              borderRadius: "16px",
              mt: 5,
              mb: 5,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={bannerImageUrl}
              alt="Banner"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </Box>
          <Container>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" component="h2">
                Program LDKS Buat Kalian
              </Typography>
              <Stack spacing={1} alignItems="center">
                <Typography variant="subtitle1" component="h3" fontWeight="bold">
                  Destinasi Keren
                </Typography>
                <Typography variant="body2">Kunjungi tempat-tempat hits yang pasti bikin Instagram kalian makin kece!</Typography>
                <Typography variant="subtitle1" component="h3" fontWeight="bold">
                  Pembelajaran Asik
                </Typography>
                <Typography variant="body2">Belajar jadi lebih menyenangkan dengan metode yang unik dan seru</Typography>
                <Typography variant="subtitle1" component="h3" fontWeight="bold">
                  Team Building
                </Typography>
                <Typography variant="body2">Bangun keakraban dan persahabatan baru dengan teman-teman sekelas</Typography>
                <Typography variant="subtitle1" component="h3" fontWeight="bold">
                  Event Spesial
                </Typography>
                <Typography variant="body2">Acara-acara keren yang nggak akan kalian lupakan!</Typography>
              </Stack>
              <Box bgcolor="#FF8C00" p={6} borderRadius={4} textAlign="center" width="100%">
                <Typography variant="body2" color="white">
                  Belajar Ga Harus di Kelas Terus kan? Liburan sambil belajar bareng-bareng teman-teman pasti seru banget! Jadi, nggak perlu bingung lagi cari pengalaman seru dan berkesan.
                </Typography>
              </Box>
              <Typography variant="h6" component="h2">
                Kenapa Harus Pilih Libur Dulu untuk Study Tour?
              </Typography>
              <Stack spacing={0.5} alignItems="start">
                <Typography variant="body2">✔ Pengalaman Lebih dari 5 Tahun di Bidang Pariwisata Edukasi.</Typography>
                <Typography variant="body2">✔ Destinasi Wisata yang Edukatif dan Instagramable!</Typography>
                <Typography variant="body2">✔ Program Fleksibel Sesuai Kebutuhan Sekolah.</Typography>
              </Stack>
            </Stack>
          </Container>

          <Stack alignItems="center" spacing={2.5}>
            <Typography variant="h5" fontWeight="bold" paddingTop={4}>
              Form Request Trip Kamu
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                px: { xs: 2, md: 0 },
              }}
            >
              Apakah anda memiliki rencana perjalanan sendiri? Silahkan isi form dibawah dengan informasi sedetail mungkin.
            </Typography>
          </Stack>
          <Divider
            sx={{
              borderStyle: "dashed",
              borderColor: "black",
              my: 3,
              mb: 7,
              sx: 20,
            }}
          />
        </Container>
        <Container
          sx={{
            mt: 1,
            mb: 10,
            display: "flex",
            justifyContent: "center",
            px: { xs: 2, md: 3 },
          }}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5} sx={{ width: "100%", maxWidth: 800 }}>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    Kontak Pesanan
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            onChange={handleTransportChange}
                            renderInput={(params) => <TextField {...params} {...field} label="Tn" sx={{ width: 75 }} error={!!errors.title} helperText={errors.title?.message} />}
                          />
                        )}
                      />
                      <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: "Full Name is required" }}
                        render={({ field }) => <TextField {...field} label="Nama Lengkap" sx={{ width: { xs: "100%", sm: 500 } }} error={!!errors.fullName} helperText={errors.fullName?.message} />}
                      />
                    </Stack>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => <TextField {...field} label="Email" type="email" sx={{ width: "100%" }} error={!!errors.email} helperText={errors.email?.message} />}
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ required: "Phone Number is required" }}
                      render={({ field }) => <TextField {...field} label="No. Telepon" type="number" sx={{ width: "100%" }} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Detail Request Trip
                    </Typography>
                    <Controller
                      name="jumlah"
                      control={control}
                      rules={{ required: "Jumlah is required" }}
                      render={({ field }) => <TextField {...field} label="Jumlah" type="number" sx={{ width: "100%" }} error={!!errors.jumlah} helperText={errors.jumlah?.message} />}
                    />
                    <Controller
                      name="selectedTransport"
                      control={control}
                      rules={{ required: "Transport Type is required" }}
                      render={({ field }) => (
                        <Autocomplete
                          disablePortal
                          id="transport-type"
                          options={transportOptions}
                          onChange={(event, value) => {
                            handleTransportChange(event, value);
                            field.onChange(value?.label);
                          }}
                          renderInput={(params) => <TextField {...params} {...field} sx={{ width: "100%" }} label="Type Transport" error={!!errors.selectedTransport} helperText={errors.selectedTransport?.message} />}
                        />
                      )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <Controller
                          name="startDate"
                          control={control}
                          rules={{ required: "Start Date is required" }}
                          render={({ field }) => (
                            <DatePicker
                              label="Tanggal Mulai"
                              value={field.value}
                              onChange={(newValue) => {
                                setValue("startDate", newValue);
                              }}
                              renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} error={!!errors.startDate} helperText={errors.startDate?.message} />}
                            />
                          )}
                        />
                        <Controller
                          name="endDate"
                          control={control}
                          rules={{ required: "End Date is required" }}
                          render={({ field }) => (
                            <DatePicker
                              label="Tanggal Akhir"
                              value={field.value}
                              onChange={(newValue) => {
                                setValue("endDate", newValue);
                              }}
                              renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} error={!!errors.endDate} helperText={errors.endDate?.message} />}
                            />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <Controller
                      name="hometown"
                      control={control}
                      rules={{ required: "Hometown is required" }}
                      render={({ field }) => <TextField {...field} label="Kota Asal" sx={{ width: "100%" }} error={!!errors.hometown} helperText={errors.hometown?.message} />}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
                      Destinasi Trip
                    </Typography>
                    {destinations.map((destination, index) => (
                      <Stack direction="row" spacing={2} alignItems="center" key={index}>
                        <Controller
                          name={`destination${index}`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label={`Destinasi ${index + 1}`}
                              sx={{ width: "100%" }}
                              error={!!errors[`destination${index}`]}
                              helperText={errors[`destination${index}`]?.message}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {index === destinations.length - 1 && (
                                      <IconButton
                                        onClick={handleAddDestination}
                                        aria-label="add"
                                        sx={{ mr: 1 }} // Memberikan jarak antara ikon add dan input
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    )}
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {index > 0 && (
                                      <IconButton
                                        onClick={() => handleDeleteDestination(index)}
                                        aria-label="delete"
                                        sx={{ ml: 1 }} // Memberikan jarak antara ikon delete dan input
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Stack>
                    ))}
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
                      Budget per pax
                    </Typography>
                    <Controller
                      name="budget_per_pax"
                      control={control}
                      rules={{ required: "Budget per pax is required" }}
                      render={({ field }) => <TextField {...field} label="Masukan budget per pax" type="number" sx={{ width: "100%" }} error={!!errors.budget_per_pax} helperText={errors.budget_per_pax?.message} />}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
                      Deskripsi
                    </Typography>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => <TextField {...field} label="Deskripsi" multiline rows={4} sx={{ width: "100%" }} error={!!errors.description} helperText={errors.description?.message} />}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      sx={{
                        borderColor: "rgba(0, 0, 0, 0.23)",
                        color: "black",
                        padding: "12px 36px",
                        borderRadius: "20px",
                        "&:hover": {
                          borderColor: "black",
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      Kembali
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      type="submit"
                      disabled={loading}
                      sx={{
                        padding: "12px 36px",
                        borderRadius: "20px",
                        backgroundColor: "#FFA726",
                        "&:hover": {
                          backgroundColor: "#FB8C00",
                        },
                      }}
                    >
                      {loading ? <CircularProgress size={24} /> : "Submit"}
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </form>
          </FormProvider>
        </Container>
      </MainLayout>
    </Stack>
  );
}
