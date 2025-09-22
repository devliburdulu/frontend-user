// "use client";

// import PropTypes from "prop-types";
// import { useMemo, useEffect, useReducer, useCallback, useState } from "react";
// import axios, { endpoints, forwardEndpoints } from "src/utils/axios";
// import { MAGENTO_FORWARD_API, APISTAGINGFORWARD } from "src/config-global";
// import { registerUser, getCartMagento } from "src/fetch-global";
// import Cookies from "js-cookie";
// import { AuthContext } from "./auth-context";
// import { setSession, isValidToken } from "./utils";
// import { useRouter } from "next/navigation";

// // ----------------------------------------------------------------------

// const initialState = {
//   user: null,
//   loading: true,
// };

// const reducer = (state, action) => {
//   if (action.type === "INITIAL") {
//     return {
//       loading: false,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === "LOGIN") {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === "REGISTER") {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === "LOGOUT") {
//     return {
//       ...state,
//       user: null,
//     };
//   }
//   return state;
// };

// // ----------------------------------------------------------------------

// export const APIFORWARD = axios.create({
//   baseURL: `${MAGENTO_FORWARD_API}`,
// });

// const STORAGE_KEY = "accessToken";

// export function AuthProvider({ children }) {
//   const router = useRouter();
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [user, setUser] = useState({});
//   const [forgotEmail, setForgotEmail] = useState("");

//   const initialize = useCallback(async () => {
//     try {
//       const accessToken = Cookies.get(STORAGE_KEY);

//       if (accessToken && isValidToken(accessToken)) {
//         setSession(accessToken);
//         const config = { headers: { Authorization: `Bearer ${accessToken}` } };
//         const response = await axios.get(endpoints.auth.me, config);

//         const { data } = response;

//         dispatch({
//           type: "INITIAL",
//           payload: {
//             user: { ...data, accessToken },
//           },
//         });

//         return true; // Return true if initialization was successful
//       } else {
//         dispatch({ type: "INITIAL", payload: { user: null } });
//         return false; // Return false if no valid token
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch({ type: "INITIAL", payload: { user: null } });
//       return false; // Return false if initialization failed
//     }
//   }, []);

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   // LOGIN with username/password
//   const login = useCallback(
//     async (username, password) => {
//       try {
//         const field_data = {
//           username,
//           password,
//         };

//         const response = await axios.post(endpoints.auth.login, field_data);
//         const { data } = response;

//         Cookies.set(STORAGE_KEY, data);
//         setSession(data);

//         dispatch({
//           type: "LOGIN",
//           payload: {
//             user: { data },
//           },
//         });

//         await initialize();
//         router.back();
//       } catch (error) {
//         console.error("Login error:", error);
//         let errorMessage = error.message;
//         if (error.response && error.response.data) {
//           errorMessage = error.response.data.message || errorMessage;
//         }
//         throw new Error(errorMessage);
//       }
//     },
//     [initialize, router]
//   );

//   // LOGIN WITH GOOGLE
//   const loginWithGoogle = useCallback(async () => {
//     window.location.href = "https://devel.forward.liburdulu.id/api/auth/google/redirect";
//     return new Promise(() => {});
//   }, []);

//   // Handle Google OAuth Callback
//   const handleGoogleCallback = useCallback(async (token) => {
//     try {
//       Cookies.set(STORAGE_KEY, token);
//       setSession(token);

//       const success = await initialize();

//       if (success) {
//         const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
//         router.push(lastVisitedPage);
//       } else {
//         throw new Error("Failed to initialize session");
//       }
//     } catch (error) {
//       console.error("Google callback error:", error);
//       throw error;
//     }
//   }, [initialize, router]);

//   // REGISTER
//   const register = useCallback(async (email, password, firstName, lastName) => {
//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("firstname", firstName);
//     formData.append("lastname", lastName);

//     const config = {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     try {
//       const response = await registerUser(formData, config);
//       if (!response.data.success) {
//         throw new Error(response.data.message || "Registration failed");
//       }
//     } catch (error) {
//       throw error.response && error.response.data ? new Error(error.response.data.message) : error;
//     }
//   }, []);

//   // REGISTER MITRA
//   const registerMitra = useCallback(
//     async (
//       mobile_phone_number,
//       nik_number,
//       nik_doc,
//       business_name,
//       business_location,
//       nib_number,
//       nib_doc,
//       npwp_number,
//       npwp_doc,
//       mitra_tier,
//       is_asperwi_member,
//       instagram_account,
//       facebook_account,
//       tiktok_account,
//       youtube_account,
//       asociation_name,
//       association_id
//     ) => {
//       const customAttributes = [
//         { attribute_code: "mobile_phone_number", value: mobile_phone_number },
//         { attribute_code: "nik_number", value: nik_number },
//         { attribute_code: "nik_doc", value: nik_doc },
//         { attribute_code: "business_name", value: business_name },
//         { attribute_code: "business_location", value: business_location },
//         { attribute_code: "nib_number", value: nib_number },
//         { attribute_code: "nib_doc", value: nib_doc },
//         { attribute_code: "npwp_number", value: npwp_number },
//         { attribute_code: "npwp_doc", value: npwp_doc },
//         { attribute_code: "mitra_tier", value: mitra_tier },
//         { attribute_code: "is_asperwi_member", value: is_asperwi_member },
//         { attribute_code: "instagram_account", value: instagram_account },
//         { attribute_code: "facebook_account", value: facebook_account },
//         { attribute_code: "tiktok_account", value: tiktok_account },
//         { attribute_code: "youtube_account", value: youtube_account },
//         { attribute_code: "asociation_name", value: asociation_name },
//         { attribute_code: "association_id", value: association_id },
//       ];

//       const data = {
//         customer: {
//           email: state.user ? user.email : "",
//           firstname: state.user ? user.firstname : "",
//           lastname: state.user ? user.lastname : "",
//           custom_attributes: customAttributes,
//         },
//       };

//       const config = {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//         },
//       };

//       try {
//         const response = await axios.put(`${endpoints.auth.register}/${state.user.id}`, data, config);
//         return response;
//       } catch (error) {
//         console.error("Error registering mitra:", error);
//         throw error;
//       }
//     },
//     [state.user, user]
//   );

//   const forgotPassword = useCallback(async (email) => {
//     try {
//       const data = {
//         email,
//         template: "email_reset",
//       };

//       setForgotEmail(email);

//       const response = await axios.put(endpoints.auth.forgot, data);
//     } catch (error) {
//       console.error("Forgot password error:", error);
//       let errorMessage = error.message;
//       if (error.response && error.response.data) {
//         errorMessage = error.response.data.message || errorMessage;
//       }
//       throw new Error(errorMessage);
//     }
//   }, []);

//   const newPassword = useCallback(
//     async (email, token, newPassword) => {
//       try {
//         const data = {
//           email: email,
//           resetToken: token,
//           newPassword,
//         };

//         const config = {
//           body: data,
//           url: `${process.env.NEXT_PUBLIC_MAGENTO_API}/rest/default/V1/customers/resetPassword`,
//         };

//         const response = await APIFORWARD.post(`/custom-magento-post`, config);

//         setTimeout(() => {
//           router.push("/login");
//         }, 1500);

//         return response;
//       } catch (error) {
//         console.error("New password error:", error);
//         let errorMessage = "An unexpected error occurred.";
//         if (error.response && error.response.data) {
//           errorMessage = error.response.data.message || errorMessage;
//         }
//         throw new Error(errorMessage);
//       }
//     },
//     [forgotEmail, router]
//   );

//   const logout = useCallback(async () => {
//     setSession(null);
//     Cookies.remove(STORAGE_KEY);
//     dispatch({ type: "LOGOUT" });
//   }, []);

//   const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";
//   const status = state.loading ? "loading" : checkAuthenticated;

//   const memoizedValue = useMemo(
//     () => ({
//       user: state.user,
//       method: "jwt",
//       loading: status === "loading",
//       authenticated: status === "authenticated",
//       unauthenticated: status === "unauthenticated",
//       login,
//       register,
//       registerMitra,
//       logout,
//       forgotPassword,
//       newPassword,
//       forgotEmail,
//       loginWithGoogle,
//       initialize,
//       handleGoogleCallback,
//     }),
//     [
//       login,
//       logout,
//       register,
//       registerMitra,
//       forgotPassword,
//       newPassword,
//       state.user,
//       status,
//       forgotEmail,
//       loginWithGoogle,
//       initialize,
//       handleGoogleCallback,
//     ]
//   );

//   return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
// }

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };

'use client';

import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback, useState } from 'react';
import axios, { endpoints, forwardEndpoints } from 'src/utils/axios';
import { MAGENTO_FORWARD_API, APISTAGINGFORWARD } from 'src/config-global';
import { registerUser, getCartMagento } from 'src/fetch-global';
import Cookies from 'js-cookie';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { useRouter } from 'next/navigation';
import moment from 'moment';

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const APIFORWARD = axios.create({
  baseURL: `${MAGENTO_FORWARD_API}`,
});

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState({});
  const [forgotEmail, setForgotEmail] = useState('');

  const initialize = useCallback(async () => {
    try {
      const accessToken = Cookies.get(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get(endpoints.auth.me, config);

        const { data } = response;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: { ...data, accessToken },
          },
        });

        return true; // Return true if initialization was successful
      } else {
        dispatch({ type: 'INITIAL', payload: { user: null } });
        return false; // Return false if no valid token
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'INITIAL', payload: { user: null } });
      return false; // Return false if initialization failed
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN with username/password
  const login = useCallback(
    async (username, password) => {
      try {
        const field_data = {
          username,
          password,
        };

        const response = await axios.post(endpoints.auth.login, field_data);
        const { data } = response;

        Cookies.set(STORAGE_KEY, data);
        setSession(data);

        dispatch({
          type: 'LOGIN',
          payload: {
            user: { data },
          },
        });

        await initialize();
        router.back();
      } catch (error) {
        console.error('Login error:', error);
        let errorMessage = error.message;
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        throw new Error(errorMessage);
      }
    },
    [initialize, router]
  );

  // LOGIN WITH GOOGLE
  const loginWithGoogle = useCallback(async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_MAGENTO_FORWARD_API}api/auth/google/redirect`;
    return new Promise(() => {});
  }, []);

  // Handle Google OAuth Callback
  const handleGoogleCallback = useCallback(
    async (token) => {
      try {
        Cookies.set(STORAGE_KEY, token);
        setSession(token);

        const success = await initialize();

        if (success) {
          const lastVisitedPage =
            localStorage.getItem('lastVisitedPage') || '/';
          router.push(lastVisitedPage);
        } else {
          throw new Error('Failed to initialize session');
        }
      } catch (error) {
        console.error('Google callback error:', error);
        throw error;
      }
    },
    [initialize, router]
  );

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await registerUser(formData, config);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      throw error.response && error.response.data
        ? new Error(error.response.data.message)
        : error;
    }
  }, []);

  // REGISTER MITRA
  const registerMitra = useCallback(
    async (
      mobile_phone_number,
      nik_number,
      nik_doc,
      business_name,
      business_location,
      nib_number,
      nib_doc,
      npwp_number,
      npwp_doc,
      mitra_tier,
      is_asperwi_member,
      instagram_account,
      facebook_account,
      tiktok_account,
      youtube_account,
      asociation_name,
      association_id,
      dob
      // affiliate_tier
    ) => {
      const formattedDob = moment(dob).format('YYYY-MM-DD');
      const customAttributes = [
        { attribute_code: 'mobile_phone_number', value: mobile_phone_number },
        { attribute_code: 'nik_number', value: nik_number },
        { attribute_code: 'nik_doc', value: nik_doc },
        { attribute_code: 'business_name', value: business_name },
        { attribute_code: 'business_location', value: business_location },
        { attribute_code: 'nib_number', value: nib_number },
        { attribute_code: 'nib_doc', value: nib_doc },
        { attribute_code: 'npwp_number', value: npwp_number },
        { attribute_code: 'npwp_doc', value: npwp_doc },
        { attribute_code: 'mitra_tier', value: mitra_tier },
        { attribute_code: 'is_asperwi_member', value: is_asperwi_member },
        { attribute_code: 'instagram_account', value: instagram_account },
        { attribute_code: 'facebook_account', value: facebook_account },
        { attribute_code: 'tiktok_account', value: tiktok_account },
        { attribute_code: 'youtube_account', value: youtube_account },
        { attribute_code: 'asociation_name', value: asociation_name },
        { attribute_code: 'association_id', value: association_id },
        // { attribute_code: "affiliate_tier", value: affiliate_tier },
      ];

      const data = {
        customer: {
          email: state.user ? user.email : '',
          firstname: state.user ? user.firstname : '',
          lastname: state.user ? user.lastname : '',
          dob: formattedDob || state.user ? user.dob : '',
          custom_attributes: customAttributes,
        },
      };

      const config = {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      };

      try {
        const response = await axios.put(
          `${endpoints.auth.register}/${state.user.id}`,
          data,
          config
        );
        return response;
      } catch (error) {
        console.error('Error registering mitra:', error);
        throw error;
      }
    },
    [state.user, user]
  );

  const forgotPassword = useCallback(async (email) => {
    try {
      const data = {
        email,
        template: 'email_reset',
      };

      setForgotEmail(email);

      const response = await axios.put(endpoints.auth.forgot, data);
    } catch (error) {
      console.error('Forgot password error:', error);
      let errorMessage = error.message;
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
  }, []);

  const newPassword = useCallback(
    async (email, token, newPassword) => {
      try {
        const data = {
          email: email,
          resetToken: token,
          newPassword,
        };

        const config = {
          body: data,
          url: `${process.env.NEXT_PUBLIC_MAGENTO_API}/rest/default/V1/customers/resetPassword`,
        };

        const response = await APIFORWARD.post(`/custom-magento-post`, config);

        setTimeout(() => {
          router.push('/login');
        }, 1500);

        return response;
      } catch (error) {
        console.error('New password error:', error);
        let errorMessage = 'An unexpected error occurred.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        throw new Error(errorMessage);
      }
    },
    [forgotEmail, router]
  );

  const logout = useCallback(async () => {
    setSession(null);
    Cookies.remove(STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      register,
      registerMitra,
      logout,
      forgotPassword,
      newPassword,
      forgotEmail,
      loginWithGoogle,
      initialize,
      handleGoogleCallback,
    }),
    [
      login,
      logout,
      register,
      registerMitra,
      forgotPassword,
      newPassword,
      state.user,
      status,
      forgotEmail,
      loginWithGoogle,
      initialize,
      handleGoogleCallback,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
