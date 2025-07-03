// /**
//  * The `useRecaptcha` custom hook manages the Google reCAPTCHA token state and provides functions to
//  * handle the token and refresh the reCAPTCHA component.
//  * @returns The `useRecaptcha` custom hook is being returned, which provides the following values:
//  * - `captchaToken`: A state variable to store the captcha token.
//  * - `setCaptchaToken`: A function to update the captcha token state.
//  * - `recaptchaRef`: A reference to the ReCAPTCHA component.
//  * - `handleRecaptcha`: A callback function to handle the captcha token.
//  */
// import { useState, useRef, useCallback, useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

// const useRecaptcha = () => {
//   const [captchaToken, setCaptchaToken] = useState<string | null>(null);
//   const recaptchaRef = useRef<ReCAPTCHA | null>(null);

//   const handleRecaptcha = useCallback((token: string | null) => {
//     setCaptchaToken(token || null);
//   }, []);

//   useEffect(() => {
//     const refreshCaptcha = () => {
//       if (recaptchaRef.current && captchaToken) {
//         recaptchaRef.current.reset();
//         setCaptchaToken("");
//       }
//     };

//     let tokenRefreshTimeout: NodeJS.Timeout | null = null;

//     if (captchaToken) {
//       tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000);
//     }

//     return () => {
//       if (tokenRefreshTimeout) {
//         clearTimeout(tokenRefreshTimeout);
//       }
//     };
//   }, [captchaToken]);

//   return { captchaToken, setCaptchaToken, recaptchaRef, handleRecaptcha };
// };

// export default useRecaptcha;
