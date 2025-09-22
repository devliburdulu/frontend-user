"use client";

import PropTypes from "prop-types";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useLocales } from "./use-locales";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ----------------------------------------------------------------------
const queryClient = new QueryClient();
export default function LocalizationProvider({ children }) {
  const { currentLang } = useLocales();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MuiLocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLang.adapterLocale}>
        {children}
      </MuiLocalizationProvider>
    </QueryClientProvider>
  );
}

LocalizationProvider.propTypes = {
  children: PropTypes.node,
};
