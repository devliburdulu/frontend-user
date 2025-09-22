"use client";

import * as Yup from "yup";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Cookies from "js-cookie";

import { useRouter, useSearchParams } from "src/routes/hooks";
import { useAuthContext } from "src/auth/hooks";
import { useSnackbar } from "src/components/snackbar";
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField, RHFCheckbox } from "src/components/hook-form";
import { Upload } from "src/components/upload";
import { uploadFile, becomePartner, createSellerMitra } from "src/fetch-global";
import { bgGradient } from "src/theme/css";
import { alpha, useTheme } from "@mui/material/styles";

export default function RegisterMitraView() {
  const BASE_URL = process.env.NEXT_PUBLIC_MAGENTO_API + process.env.NEXT_PUBLIC_AVATAR_URL;

  const { enqueueSnackbar } = useSnackbar();
  const { registerMitra, authenticated, user } = useAuthContext();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const returnTo = searchParams.get("returnTo");
  const TOKEN_USER = Cookies.get("accessToken");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [urlPreview, setUrlPreview] = useState("");

  const sellerExist = user?.custom_attributes?.some((attr) => attr.attribute_code === "nik_number");

  useEffect(() => {
    if (authenticated === false) {
      router.push(returnTo || "/login");
    } else {
      router.push(returnTo || "/register-mitra");
    }
  }, [authenticated, router, returnTo]);

  const RegisterMitraSchema = Yup.object().shape({
    phone: Yup.string()
      .required("No Telp is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .max(15, "Must be at most 15 digits"),
    NIK: Yup.string()
      .required("NIK is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .length(16, "Must be exactly 16 digits"),
    company_name: Yup.string().required("Nama Usaha is required"),
    company_address: Yup.string().required("Lokasi Usaha is required"),
    NIB: Yup.string()
      .required("NIB is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(13, "Must be at least 13 digits"),
    shop_url: sellerExist === false ? Yup.string().required("Link Toko is required") : Yup.string(),
    NPWP: Yup.string()
      .required("NPWP is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .length(15, "Must be exactly 15 digits"),
    socialMedia: Yup.object()
      .shape({
        instagram: Yup.string(),
        facebook: Yup.string(),
        tiktok: Yup.string(),
        youtube: Yup.string(),
      })
      .test("at-least-two", "Minimal isi 2 sosial media", (values) => {
        const filledSocialMediaCount = Object.values(values).filter(Boolean).length;
        return filledSocialMediaCount >= 2;
      }),
    termsAccepted: Yup.boolean().oneOf([true], "Anda harus menyetujui Syarat dan Ketentuan.").required("Anda harus menyetujui Syarat dan Ketentuan."),
  });

  const getCustomAttributeValue = (attributes, code) => {
    if (!Array.isArray(attributes)) {
      return "";
    }
    return attributes.find((attr) => attr.attribute_code === code)?.value || "";
  };

  const defaultValues = {
    phone: getCustomAttributeValue(user?.custom_attributes, "mobile_phone_number") || "",
    NIK: getCustomAttributeValue(user?.custom_attributes, "nik_number") || "",
    company_name: getCustomAttributeValue(user?.custom_attributes, "business_name") || "",
    company_address: getCustomAttributeValue(user?.custom_attributes, "business_location") || "",
    NIB: getCustomAttributeValue(user?.custom_attributes, "nib_number") || "",
    NPWP: getCustomAttributeValue(user?.custom_attributes, "npwp_number") || "",
    socialMedia: {
      instagram: getCustomAttributeValue(user?.custom_attributes, "instagram_account") || "",
      facebook: getCustomAttributeValue(user?.custom_attributes, "facebook_account") || "",
      tiktok: getCustomAttributeValue(user?.custom_attributes, "tiktok_account") || "",
      youtube: getCustomAttributeValue(user?.custom_attributes, "youtube_account") || "",
    },
    shop_url: "",
    asociation_name: getCustomAttributeValue(user?.custom_attributes, "asociation_name") || "",
    association_id: getCustomAttributeValue(user?.custom_attributes, "association_id") || "",
    mitra_tier: getCustomAttributeValue(user?.custom_attributes, "mitra_tier") || "Starter",
    termsAccepted: false,
  };

  const defaultFiles = [
    sellerExist ? BASE_URL + getCustomAttributeValue(user?.custom_attributes, "nik_doc") || null : null,
    sellerExist ? BASE_URL + getCustomAttributeValue(user?.custom_attributes, "nib_doc") || null : null,
    sellerExist ? BASE_URL + getCustomAttributeValue(user?.custom_attributes, "npwp_doc") || null : null,
  ];

  const [files, setFiles] = useState(defaultFiles.map((fileUrl) => (fileUrl ? { url: fileUrl } : null)));

  const methods = useForm({
    resolver: yupResolver(RegisterMitraSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDropSingleFile = useCallback(async (index, acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(newFile.type)) {
        setErrorMsg("Invalid file type. Only JPEG, PNG and JPG are allowed.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (newFile.size > maxSize) {
        setErrorMsg("File size exceeds the 5MB limit.");
        return;
      }

      try {
        const response = await uploadFile(newFile);
        const uploadedFileUrl = response.data;

        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles[index] = {
            ...newFile,
            preview: URL.createObjectURL(newFile),
            url: uploadedFileUrl,
          };
          return updatedFiles;
        });
        setErrorMsg("");
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMsg("Error uploading file. Please try again.");
      }
    }
  }, []);

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = null;
      return updatedFiles;
    });
  };

  useEffect(() => {
    const isAsperwiMember = getCustomAttributeValue(user?.custom_attributes, "is_asperwi_member");
    setIsRegistered(isAsperwiMember === "1");
  }, [user]);

  const handleIsRegisteredChange = (e) => {
    const value = e.target.value === "true";
    setIsRegistered(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    const { phone, NIK, company_name, company_address, NIB, NPWP, socialMedia, password, asociation_name, association_id, mitra_tier, shop_url, termsAccepted } = data;

    if (!files[0] || !files[1] || !files[2]) {
      setErrorMsg("All files must be uploaded.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!termsAccepted) {
      setErrorMsg("Anda harus menyetujui Syarat dan Ketentuan.");
      enqueueSnackbar("Anda harus menyetujui Syarat dan Ketentuan.", { variant: "error" });
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }

    setErrorMsg("");

    try {
      const normalizePath = (url) => {
        const relativePath = url?.replace(BASE_URL, "");
        return relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
      };

      const nikDocFile = files[0]?.url ? normalizePath(files[0].url) : null;
      const nibDocFile = files[1]?.url ? normalizePath(files[1].url) : null;
      const npwpDocFile = files[2]?.url ? normalizePath(files[2].url) : null;

      await registerMitra(
        phone,
        NIK,
        nikDocFile,
        company_name,
        company_address,
        NIB,
        nibDocFile,
        NPWP,
        npwpDocFile,
        mitra_tier,
        isRegistered,
        socialMedia.instagram,
        socialMedia.facebook,
        socialMedia.tiktok,
        socialMedia.youtube,
        asociation_name,
        association_id || 0,
        password
      );

      const createSellerBody = {
        customer: {
          email: user?.email,
          firstname: user?.firstname,
          lastname: user?.lastname,
          storeId: "1",
          websiteId: "1",
        },
        is_seller: "1",
        profileurl: shop_url,
        registered: "1",
        password: "",
      };

      if (sellerExist === false) {
        await createSellerMitra(createSellerBody);
        enqueueSnackbar("Seller account created successfully!", {
          variant: "success",
        });
        router.push(returnTo || "/greetings/register");
      } else {
        enqueueSnackbar("Berhasil update data Mitra", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
      reset();
      const errorMessage = error.message || "An unexpected error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
      setErrorMsg(typeof error === "string" ? error : error.message);
    }
  });

  const renderHead = (
    <div className="text-center">
      <p className="font-semibold text-[20px] mt-10 my-3">Selamat datang di Mitra Liburdulu.id</p>
      <p className="font-[13px] mb-16">Lengkapi profil dan data perusahaanmu</p>
    </div>
  );

  const renderForm = (
    <Container>
      <Stack spacing={2.5}>
        <RHFTextField name="phone" type="number" pattern="[0-9]*" label="No Telp" />
        <RHFTextField name="NIK" type="number" label="NIK" />
        <Card>
          <CardHeader title="Upload KTP" />
          <CardContent>
            <Upload file={files[0]?.preview || files[0]?.url || null} onDrop={(acceptedFiles) => handleDropSingleFile(0, acceptedFiles)} onDelete={() => handleDeleteFile(0)} />
          </CardContent>
        </Card>

        <RHFTextField name="company_name" type="text" label="Nama Usaha" />

        {sellerExist === false ? (
          <>
            <RHFTextField
              name="shop_url"
              type="text"
              label="Link Toko"
              onChange={(e) => {
                const inputValue = e.target.value;
                const slugifiedValue = inputValue
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
                  .slice(0, 15);

                methods.setValue("shop_url", slugifiedValue);
                setUrlPreview(slugifiedValue);
                if (slugifiedValue.length > 15) {
                  methods.setError("shop_url", {
                    type: "manual",
                    message: "Must be at most 15 characters",
                  });
                } else {
                  methods.clearErrors("shop_url");
                }
              }}
            />
            <p className="text-[12px] mt-[-15px] text-orange-400">
              Contoh link toko: https://liburdulu.id/
              <span className="font-medium">{urlPreview || "nama-toko-anda"}</span>
            </p>
          </>
        ) : null}

        <RHFTextField name="company_address" type="text" label="Lokasi Usaha" />
        <RHFTextField name="NIB" type="number" label="NIB" />
        <Card>
          <CardHeader title="Upload NIB" />
          <CardContent>
            <Upload file={files[1]?.preview || files[1]?.url || null} onDrop={(acceptedFiles) => handleDropSingleFile(1, acceptedFiles)} onDelete={() => handleDeleteFile(1)} />
          </CardContent>
        </Card>

        <RHFTextField name="NPWP" type="number" label="NPWP" />
        <Card>
          <CardHeader title="Upload NPWP" />
          <CardContent>
            <Upload file={files[2]?.preview || files[2]?.url || null} onDrop={(acceptedFiles) => handleDropSingleFile(2, acceptedFiles)} onDelete={() => handleDeleteFile(2)} />
          </CardContent>
        </Card>

        <FormControl component="fieldset">
          <p className="font-semibold text-[16px] mb-3">Apakah anda sudah terdaftar di asosiasi pariwisata?</p>
          <RadioGroup row value={isRegistered.toString()} onChange={handleIsRegisteredChange}>
            <FormControlLabel value="true" control={<Radio size="medium" />} label="Sudah" />
            <FormControlLabel value="false" control={<Radio size="medium" />} label="Belum" />
          </RadioGroup>
          {isRegistered && (
            <>
              <Stack spacing={2.5}>
                <RHFTextField name="asociation_name" type="text" label="Nama Asosiasi" />
                <RHFTextField name="association_id" type="number" label="No ID Asosiasi" />
              </Stack>
            </>
          )}
        </FormControl>

        <Stack spacing={2.5}>
          <p className="font-semibold text-[16px]">Sosial Media</p>
          <p className="text-[12px] mt-[-15px] text-orange-400">*Minimal isi 2 sosial media</p>

          <RHFTextField
            fullWidth
            name="socialMedia.instagram"
            type="text"
            label="Instagram"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="mdi:instagram" width={24} />
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            fullWidth
            name="socialMedia.facebook"
            type="facebook"
            label="Facebook"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="mdi:facebook" width={24} />
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            fullWidth
            name="socialMedia.tiktok"
            type="text"
            label="Tiktok"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="ic:baseline-tiktok" width={24} />
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            fullWidth
            name="socialMedia.youtube"
            type="text"
            label="Youtube"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="mdi:youtube" width={24} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Box sx={{ mt: 2.5, mb: 2.5 }}>
        <RHFCheckbox
          name="termsAccepted"
          label={
            <Typography variant="body2" sx={{ display: "inline" }}>
              Saya telah membaca dan menyetujui{" "}
              <Link href="/syarat-dan-ketentuan" passHref legacyBehavior>
                <MuiLink component="a" target="_blank" rel="noopener noreferrer" underline="always">
                  Syarat dan Ketentuan
                </MuiLink>
              </Link>{" "}
              yang berlaku.
            </Typography>
          }
        />
      </Box>

      <LoadingButton fullWidth color="inherit" sx={{ my: 5 }} size="large" type="submit" variant="contained" loading={isSubmitting}>
        {sellerExist === false ? "Daftar Mitra" : "Update Mitra"}
      </LoadingButton>
    </Container>
  );

  return (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, theme.palette.mode === "light" ? 0.88 : 0.95),
          imgUrl: "/assets/background/overlay_auth.jpg",
        }),
      }}
    >
      <Container>
        {renderHead}

        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}

        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderForm}
        </FormProvider>
      </Container>
    </Stack>
  );
}
