// import PropTypes from "prop-types";
// import { Controller, useFormContext } from "react-hook-form";
// import { TextField } from "@mui/material";

// export default function RHFTextField({ name, helperText, type, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <TextField
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               color: "#333",
//             },
//             "& .MuiInputLabel-outlined": {
//               color: "#2e2e2e",
//             },
//           }}
//           {...field}
//           fullWidth
//           type={type}
//           value={type === "number" && field.value === 0 ? "" : field.value}
//           onChange={(event) => {
//             if (type === "number") {
//               field.onChange(Number(event.target.value));
//             } else {
//               field.onChange(event.target.value);
//             }
//           }}
//           error={!!error}
//           helperText={error ? error?.message : helperText}
//           {...other}
//         />
//       )}
//     />
//   );
// }

// RHFTextField.propTypes = {
//   helperText: PropTypes.object,
//   name: PropTypes.string,
//   type: PropTypes.string,
// };

import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export default function RHFTextField({ name, helperText, type, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // For display in the input field
        const displayValue = field.value === 0 && type === "number" ? "0" : field.value;

        return (
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#333",
              },
              "& .MuiInputLabel-outlined": {
                color: "#2e2e2e",
              },
            }}
            {...field}
            fullWidth
            // Use "text" type to allow leading zeros, but with numeric pattern
            type={type === "number" ? "text" : type}
            inputProps={{
              ...(type === "number" && {
                pattern: "[0-9]*",
                inputMode: "numeric",
              }),
              ...other.inputProps,
            }}
            value={displayValue}
            onChange={(event) => {
              const newValue = event.target.value;

              if (type === "number") {
                // If the field is empty, set to 0
                if (newValue === "") {
                  field.onChange(0);
                }
                // If it's a valid number pattern (can include leading zeros)
                else if (/^[0-9]*$/.test(newValue)) {
                  // Store as number for form processing
                  field.onChange(newValue === "0" ? 0 : newValue);
                }
              } else {
                field.onChange(newValue);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}

RHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
