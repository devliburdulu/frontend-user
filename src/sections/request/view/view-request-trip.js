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
import moment from "moment";

const options = [
  { label: "Mr", id: 1 },
  { label: "Mrs", id: 2 },
];

const transportOptions = [
  { label: "Big Bus", id: 1 },
  { label: "Medium Bus", id: 2 },
  { label: "Hi-Ace / Elf", id: 3 },
  { label: "Pesawat", id: 4 },
  { label: "Kereta Api", id: 5 },
  { label: "Lainnya (Ketik Sendiri)", id: 6 },
];

const groupOptions = [
  { label: "Corporate", id: 1 },
  { label: "Family", id: 2 },
  { label: "VIP", id: 3 },
  { label: "Study Tour", id: 4 },
  { label: "Lainnya (Ketik Sendiri)", id: 5 },
];

const bannerImageUrl = "/banner-request-trip.jpg";

export default function FormRequestTrip() {
  const methods = useForm({
    defaultValues: {
      pic_title: "",
      pic_name: "",
      pic_email: "",
      pic_mobile_phone: "",
      trip_group: "",
      trip_transport_type: "",
      trip_start_date: null,
      trip_end_date: null,
      trip_origin: "",
      trip_destination: [""],
      trip_pax: "",
      trip_budget: "",
      trip_description: "",
    },
    mode: "onTouched",
  });
  const theme = useTheme();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = methods;

  const startDate = watch("trip_start_date");

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [destinations, setDestinations] = useState([""]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const disablePastDates = (date) => {
    return date < today;
  };

  const disableInvalidEndDates = (date) => {
    if (disablePastDates(date)) return true;
    if (!startDate) return false;
    return date < startDate;
  };

  const handleTransportChange = (event, value) => {
    setSelectedTransport(value?.label);

    if (value?.label === "Lainnya (Ketik Sendiri)") {
      setValue("trip_transport_type", "");
    } else {
      setValue("trip_transport_type", value?.label);
    }
    // setValue("trip_transport_type", value?.label);
  };

  // const handleGroupChange = (event, value) => {
  //   setSelectedGroup(value?.label);
  //   setValue("trip_group", value?.label);
  // };

  const handleGroupChange = (event, value) => {
    setSelectedGroup(value?.label);
    if (value?.label === "Lainnya (Ketik Sendiri)") {
      setValue("trip_group", "");
    } else {
      setValue("trip_group", value?.label);
    }
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, ""]);
    setValue(`trip_destination[${destinations.length}]`, "");
  };

  const handleDeleteDestination = (index) => {
    const newDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(newDestinations);

    const currentValues = getValues();
    const updatedTripDestinations = currentValues.trip_destination.filter((_, i) => i !== index);
    setValue("trip_destination", updatedTripDestinations);
  };
  const handleBack = () => {
    router.push("/");
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("pic_title", data.pic_title || "");
      formData.append("pic_name", data.pic_name || "");
      formData.append("pic_email", data.pic_email || "");
      formData.append("pic_mobile_phone", data.pic_mobile_phone || "");
      formData.append("trip_group", data.trip_group || "");
      formData.append("trip_transport_type", data.trip_transport_type || "");
      formData.append("trip_origin", data.trip_origin || "");
      formData.append("trip_pax", data.trip_pax || "");
      formData.append("trip_budget", data.trip_budget || "");
      formData.append("trip_description", data.trip_description || "");

      if (data.trip_start_date) {
        formData.append("trip_start_date", moment(data.trip_start_date).format("YYYY-MM-DD"));
      }

      if (data.trip_end_date) {
        formData.append("trip_end_date", moment(data.trip_end_date).format("YYYY-MM-DD"));
      }

      if (Array.isArray(data.trip_destination)) {
        data.trip_destination.forEach((destination, index) => {
          formData.append(`trip_destination[${index}]`, destination || "");
        });
      }

      for (let pair of formData.entries()) {
      }

      const response = await requestTrip(formData);

      router.push("/greetings/trip");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Stack
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, theme.palette.mode === "light" ? 0.88 : 0.94),
            imgUrl: "/assets/background/overlay_auth.jpg",
          }),
        }}
      >
        <Container
          sx={{
            py: { xs: 3, md: 5 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: "16px",
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
              borderColor: "gray.200",
              my: 3,
              // mb: 7,
              mx: 20,
            }}
          />
        </Container>
        <Container
          sx={{
            mt: 1,
            mb: 10,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white">
              <Stack spacing={2.5} sx={{ width: "100%" }}>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    Kontak Pesanan
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Controller
                        name="pic_title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            onChange={(event, value) => {
                              field.onChange(value?.label);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                {...field}
                                label="Title"
                                sx={{
                                  width: {
                                    xs: 85,
                                    sm: 100,
                                  },
                                }}
                                error={!!errors.pic_title}
                                helperText={errors.pic_title?.message}
                              />
                            )}
                          />
                        )}
                      />
                      <Controller
                        name="pic_name"
                        control={control}
                        rules={{ required: "Full Name is required" }}
                        render={({ field }) => <TextField {...field} label="Nama Lengkap" sx={{ width: { xs: "100%", sm: "100%" } }} error={!!errors.pic_name} helperText={errors.pic_name?.message} />}
                      />
                    </Stack>
                    <Controller
                      name="pic_email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => <TextField {...field} label="Email" type="email" sx={{ width: "100%" }} error={!!errors.pic_email} helperText={errors.pic_email?.message} />}
                    />
                    <Controller
                      name="pic_mobile_phone"
                      control={control}
                      rules={{ required: "Phone Number is required" }}
                      render={({ field }) => <TextField {...field} label="No. Telepon" type="number" sx={{ width: "100%" }} error={!!errors.pic_mobile_phone} helperText={errors.pic_mobile_phone?.message} />}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Detail Request Trip
                    </Typography>

                    <Controller
                      name="trip_pax"
                      control={control}
                      rules={{ required: "Trip pax is required" }}
                      render={({ field }) => <TextField {...field} label="Masukan jumlah peserta" type="number" sx={{ width: "100%" }} error={!!errors.trip_pax} helperText={errors.trip_pax?.message} />}
                    />

                    <Controller
                      name="trip_group"
                      control={control}
                      rules={{ required: "Trip Group is required" }}
                      render={({ field }) => (
                        <>
                          <Autocomplete
                            disablePortal
                            id="type-group"
                            options={groupOptions}
                            onChange={(event, value) => {
                              handleGroupChange(event, value);
                            }}
                            renderInput={(params) => <TextField {...params} {...field} sx={{ width: "100%" }} label="Tipe Grup" error={!!errors.trip_group} helperText={errors.trip_group?.message} />}
                          />
                          {selectedGroup === "Lainnya (Ketik Sendiri)" && (
                            <TextField
                              {...field}
                              label="Ketik tipe grup lainnya"
                              sx={{ width: "100%", mt: 2 }}
                              error={!!errors.trip_group}
                              helperText={errors.trip_group?.message}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                              }}
                            />
                          )}
                        </>
                      )}
                    />

                    <Controller
                      name="trip_transport_type"
                      control={control}
                      rules={{ required: "Transport Type is required" }}
                      render={({ field }) => (
                        <>
                          <Autocomplete
                            disablePortal
                            id="transport-type"
                            options={transportOptions}
                            onChange={(event, value) => {
                              handleTransportChange(event, value);
                              // field.onChange(value?.label);
                            }}
                            renderInput={(params) => <TextField {...params} {...field} sx={{ width: "100%" }} label="Pilihan Transportasi" error={!!errors.trip_transport_type} helperText={errors.trip_transport_type?.message} />}
                          />

                          {selectedTransport === "Lainnya (Ketik Sendiri)" && (
                            <TextField
                              {...field}
                              label="Ketik pilihan transport lainnya"
                              sx={{ width: "100%", mt: 2 }}
                              error={!!errors.trip_transport_type}
                              helperText={errors.trip_transport_type?.message}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                              }}
                            />
                          )}
                        </>
                      )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <Controller
                          name="trip_start_date"
                          control={control}
                          rules={{
                            required: "Start Date is required",
                            validate: {
                              futureDate: (value) => {
                                return value >= today || "Start date cannot be in the past";
                              },
                            },
                          }}
                          render={({ field }) => (
                            <DatePicker
                              label="Estimasi Tanggal Berangkat Trip"
                              value={field.value}
                              onChange={(newValue) => {
                                setValue("trip_start_date", newValue);

                                const currentEndDate = getValues("trip_end_date");
                                if (currentEndDate && newValue && currentEndDate < newValue) {
                                  setValue("trip_end_date", null);
                                }
                              }}
                              shouldDisableDate={disablePastDates}
                              slotProps={{
                                textField: {
                                  error: !!errors.trip_start_date,
                                  helperText: errors.trip_start_date?.message,
                                },
                              }}
                            />
                          )}
                        />
                        <Controller
                          name="trip_end_date"
                          control={control}
                          rules={{
                            required: "End Date is required",
                            validate: {
                              futureDate: (value) => {
                                return value >= today || "End date cannot be in the past";
                              },
                              afterStartDate: (value) => {
                                return !startDate || value >= startDate || "End date must be after start date";
                              },
                            },
                          }}
                          render={({ field }) => (
                            <DatePicker
                              label="Estimasi Tanggal Selesai Trip"
                              value={field.value}
                              onChange={(newValue) => {
                                setValue("trip_end_date", newValue);
                              }}
                              shouldDisableDate={disableInvalidEndDates}
                              slotProps={{
                                textField: {
                                  error: !!errors.trip_end_date,
                                  helperText: errors.trip_end_date?.message,
                                },
                              }}
                            />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <Controller
                      name="trip_origin"
                      control={control}
                      rules={{ required: "Hometown is required" }}
                      render={({ field }) => <TextField {...field} label="Kota Asal" sx={{ width: "100%" }} error={!!errors.trip_origin} helperText={errors.trip_origin?.message} />}
                    />

                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
                      Destinasi Trip
                    </Typography>

                    {destinations.map((destination, index) => (
                      <Stack direction="row" spacing={2} alignItems="center" key={index}>
                        <Controller
                          name={`trip_destination[${index}]`}
                          control={control}
                          rules={{ required: "Destination is required" }}
                          defaultValue={destination}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label={`Destinasi ${index + 1}`}
                              sx={{ width: "100%" }}
                              error={!!errors.trip_destination?.[index]}
                              helperText={errors.trip_destination?.[index]?.message}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {index === destinations.length - 1 && (
                                      <IconButton onClick={handleAddDestination} aria-label="add" sx={{ mr: 1 }}>
                                        <AddIcon />
                                      </IconButton>
                                    )}
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {index > 0 && (
                                      <IconButton onClick={() => handleDeleteDestination(index)} aria-label="delete" sx={{ ml: 1 }}>
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
                      Anggaran per peserta
                    </Typography>
                    <Controller
                      name="trip_budget"
                      control={control}
                      rules={{ required: "Budget per pax is required" }}
                      render={({ field }) => <TextField {...field} label="Masukan estimasi anggaran per peserta" type="number" sx={{ width: "100%" }} error={!!errors.trip_budget} helperText={errors.trip_budget?.message} />}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
                      Deskripsi
                    </Typography>
                    <Controller
                      name="trip_description"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Masukan detil trip lainnya yang Kamu inginkan jika ada" multiline rows={4} sx={{ width: "100%" }} error={!!errors.trip_description} helperText={errors.trip_description?.message} />
                      )}
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
                        borderRadius: "12px",
                        "&:hover": {
                          borderColor: "gray",
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      Kembali
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={loading}
                      sx={{
                        padding: "12px 36px",
                        borderRadius: "12px",
                        color: "white",
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
      </Stack>
    </MainLayout>
  );
}
