// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import Alert from "@mui/material/Alert";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { setSession } from "src/auth/context/jwt/utils";
// import { useAuthContext } from "src/auth/hooks";

// export default function GoogleAuthCallback() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { initialize } = useAuthContext();

//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         const success = searchParams.get("success");
//         const token = searchParams.get("token");
//         const error = searchParams.get("error");
//         const code = searchParams.get("code");

//         if (success === "1" && token) {

//           Cookies.set("accessToken", token);
//           setSession(token);

//           await initialize();

//           const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
//           router.push(lastVisitedPage);
//           return;
//         }

//         if (success === "0" && error) {
//           setErrorMsg(decodeURIComponent(error));
//           setLoading(false);
//           setTimeout(() => {
//             router.push("/login");
//           }, 3000);
//           return;
//         }

//         if (code) {
//           const response = await fetch(`https://devel.forward.liburdulu.id/api/auth/google/callback?code=${code}`);

//           if (!response.ok) {
//             throw new Error("Failed to exchange code for token");
//           }

//           const result = await response.json();

//           if (result.success) {
//             Cookies.set("accessToken", result.data.token);
//             setSession(result.data.token);

//             await initialize();

//             const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
//             router.push(lastVisitedPage);
//             return;
//           } else {
//             setErrorMsg(result.message || "Google login failed.");
//             setLoading(false);
//             setTimeout(() => {
//               router.push("/login");
//             }, 3000);
//             return;
//           }
//         }

//         setErrorMsg("Invalid callback parameters");
//         setLoading(false);
//         setTimeout(() => {
//           router.push("/login");
//         }, 3000);
//       } catch (error) {
//         console.error("Google auth callback error:", error);
//         setErrorMsg("An unexpected error occurred during authentication.");
//         setLoading(false);
//         setTimeout(() => {
//           router.push("/login");
//         }, 3000);
//       }
//     };

//     handleCallback();
//   }, [searchParams, router, initialize]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "50vh",
//         p: 3,
//       }}
//     >
//       {loading ? (
//         <>
//           <CircularProgress sx={{ mb: 3 }} />
//           <Typography variant="h6">Processing your login...</Typography>
//         </>
//       ) : (
//         <Alert severity={errorMsg ? "error" : "success"} sx={{ width: "100%", maxWidth: 500, mb: 2 }}>
//           {errorMsg || "Login successful! Redirecting..."}
//         </Alert>
//       )}
//     </Box>
//   );
// }

// ------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Alert from "@mui/material/Alert";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useAuthContext } from "src/auth/hooks";

// export default function GoogleAuthCallback() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { handleGoogleCallback } = useAuthContext();

//   useEffect(() => {
//     const processCallback = async () => {
//       try {
//         const success = searchParams.get("success");
//         const token = searchParams.get("token");
//         const error = searchParams.get("error");

//         // Handle access denied case
//         if (error === "access_denied") {
//           setErrorMsg("Login canceled by user");
//           setLoading(false);
//           // Redirect to login page after a short delay
//           setTimeout(() => {
//             router.push("/login");
//           }, 2000);
//           return;
//         }

//         if (success === "1" && token) {
//           await handleGoogleCallback(token);
//           return;
//         }

//         if (success === "0" && error) {
//           setErrorMsg(decodeURIComponent(error));
//           setLoading(false);
//           setTimeout(() => {
//             router.push("/login");
//           }, 2000);
//           return;
//         }

//         setErrorMsg("Invalid callback parameters");
//         setLoading(false);
//         setTimeout(() => {
//           router.push("/login");
//         }, 2000);
//       } catch (error) {
//         console.error("Google auth callback error:", error);
//         setErrorMsg(error.message || "An unexpected error occurred during authentication.");
//         setLoading(false);
//         setTimeout(() => {
//           router.push("/login");
//         }, 2000);
//       }
//     };

//     processCallback();
//   }, [searchParams, handleGoogleCallback, router]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "50vh",
//         p: 3,
//       }}
//     >
//       {loading ? (
//         <>
//           <CircularProgress sx={{ mb: 3 }} />
//           <Typography variant="h6">Processing your login...</Typography>
//         </>
//       ) : (
//         <Alert severity={errorMsg ? "error" : "success"} sx={{ width: "100%", maxWidth: 500, mb: 2 }}>
//           {errorMsg || "Login successful! Redirecting..."}
//         </Alert>
//       )}
//     </Box>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "src/auth/hooks";

export default function GoogleAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { handleGoogleCallback } = useAuthContext();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const error = searchParams.get("error");
        const success = searchParams.get("success");
        const token = searchParams.get("token");

        // Handle access denied or cancellation
        if (error === "access_denied") {
          if (window.opener) {
            window.opener.postMessage({ error: "access_denied" }, "*");
            window.close();
            return;
          }
          router.replace("/login");
          return;
        }

        // Handle successful login
        if (success === "1" && token) {
          if (window.opener) {
            window.opener.postMessage({ token }, "*");
            window.close();
          } else {
            await handleGoogleCallback(token);
            router.push("/"); // Redirect to home page if not in popup
          }
          return;
        }

        // Handle other errors
        const errorMessage = success === "0" ? searchParams.get("error") || "Authentication failed" : "Invalid callback parameters";

        setErrorMsg(decodeURIComponent(errorMessage));
        setLoading(false);

        if (window.opener) {
          window.opener.postMessage({ error: errorMessage }, "*");
          window.close();
        } else {
          setTimeout(() => {
            router.replace("/login");
          }, 2000);
        }
      } catch (error) {
        console.error("Google auth callback error:", error);
        const errorMessage = error.message || "An unexpected error occurred";
        setErrorMsg(errorMessage);
        setLoading(false);

        if (window.opener) {
          window.opener.postMessage({ error: errorMessage }, "*");
          window.close();
        } else {
          setTimeout(() => {
            router.replace("/login");
          }, 2000);
        }
      }
    };

    processCallback();
  }, [searchParams, handleGoogleCallback, router]);

  // Don't render anything in popup window
  if (window.opener) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        p: 3,
      }}
    >
      {loading ? (
        <>
          <CircularProgress sx={{ mb: 3 }} />
          <Typography variant="h6">Processing your login...</Typography>
        </>
      ) : (
        <Alert severity={errorMsg ? "error" : "success"} sx={{ width: "100%", maxWidth: 500, mb: 2 }}>
          {errorMsg || "Login successful! Redirecting..."}
        </Alert>
      )}
    </Box>
  );
}
