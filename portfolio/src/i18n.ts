import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
        detection: {
            order: ["navigator"],
            lookupLocalStorage: "i18nextLng",
            caches: ["localStorage"],
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    })