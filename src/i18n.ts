import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: { about: "About", karya: "Works", discord: "Discord", skills: "Skills", contact: "Contact" },
      hero: {
        greet: "Hello, I'm",
        cta: "Discover My World",
        scroll: "Scroll to explore",
        nicknameLabel: "Drag the 3D tag",
      },
      contact: { title: "Let's Connect", subtitle: "Find me online" },
      footer: "Crafted with passion — © 2026",
    },
  },
  id: {
    translation: {
      nav: { about: "Tentang", karya: "Karya", discord: "Discord", skills: "Keahlian", contact: "Kontak" },
      hero: {
        greet: "Halo, saya",
        cta: "Jelajahi Duniaku",
        scroll: "Scroll untuk eksplor",
        nicknameLabel: "Geser tag 3D",
      },
      contact: { title: "Mari Terhubung", subtitle: "Temukan aku online" },
      footer: "Dibuat dengan semangat — © 2026",
    },
  },
  zh: {
    translation: {
      nav: { about: "关于", karya: "作品", discord: "Discord", skills: "技能", contact: "联系" },
      hero: {
        greet: "你好，我是",
        cta: "探索我的世界",
        scroll: "向下滚动",
        nicknameLabel: "拖动3D标签",
      },
      contact: { title: "联系我", subtitle: "在线找到我" },
      footer: "用心打造 — © 2026",
    },
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;