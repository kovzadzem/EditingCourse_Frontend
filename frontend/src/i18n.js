import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ka",
    interpolation: {
      escapeValue: false,
    },

    resources: {
      ka: {
        translation: {
          login: "შესვლა",
          register: "რეგისტრაცია",
          email: "ელ. ფოსტა",
          password: "პაროლი",
          forgotPassword: "პაროლი დაგავიწყდა?",
          noAccount: "არ გაქვს ანგარიში?",
          alreadyAccount: "უკვე გაქვს ანგარიში?",
        },
      },

      en: {
        translation: {
          login: "Login",
          register: "Register",
          email: "Email",
          password: "Password",
          forgotPassword: "Forgot password?",
          noAccount: "Don't have an account?",
          alreadyAccount: "Already have an account?",
        },
      },
    },
  });

export default i18n;