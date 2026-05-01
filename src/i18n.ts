import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: { about: "About", school: "School", gaming: "Gaming", skills: "Skills", contact: "Contact" },
      hero: {
        greet: "Hello, I'm",
        role: "Programmer & Animator",
        tagline: "13-year-old creator from Jakarta — bringing pixels to life one frame at a time.",
        cta: "Discover My World",
        scroll: "Scroll to explore",
        nicknameLabel: "Drag the 3D tag",
      },
      about: {
        title: "About Me",
        body: "Hi! I'm Arkana, but you can call me Wizard in-game. I'm a 13-year-old student at SMP As-Saadah, Jakarta Timur. I love writing code, animating characters, and exploring virtual worlds.",
        chips: { age: "13 years old", city: "Jakarta Timur", school: "SMP As-Saadah", role: "Programmer & Animator" },
      },
      school: { title: "My School", subtitle: "SMP As-Saadah · Duren Sawit, Jakarta Timur", mapTitle: "Find us here" },
      gaming: {
        title: "Gaming Life",
        subtitle: "When I'm not coding, you'll find me in Roblox",
        favorite: "Favorite Game",
        username: "Roblox Username",
        nickname: "In-game Name",
      },
      skills: { title: "What I Do", coding: "Coding", animation: "Animation", gaming: "Gaming", design: "Design" },
      contact: { title: "Let's Connect", subtitle: "Find me online", roblox: "Roblox" },
      footer: "Crafted with passion by Arkana — © 2026",
    },
  },
  id: {
    translation: {
      nav: { about: "Tentang", school: "Sekolah", gaming: "Game", skills: "Keahlian", contact: "Kontak" },
      hero: {
        greet: "Halo, saya",
        role: "Programmer & Animator",
        tagline: "Kreator berusia 13 tahun dari Jakarta — menghidupkan piksel satu frame demi satu frame.",
        cta: "Jelajahi Duniaku",
        scroll: "Scroll untuk eksplor",
        nicknameLabel: "Geser tag 3D",
      },
      about: {
        title: "Tentang Saya",
        body: "Hai! Aku Arkana, panggil saja Wizard kalau di game. Aku siswa berusia 13 tahun di SMP As-Saadah, Jakarta Timur. Aku suka menulis kode, membuat animasi karakter, dan menjelajahi dunia virtual.",
        chips: { age: "13 tahun", city: "Jakarta Timur", school: "SMP As-Saadah", role: "Programmer & Animator" },
      },
      school: { title: "Sekolahku", subtitle: "SMP As-Saadah · Duren Sawit, Jakarta Timur", mapTitle: "Lokasi sekolah" },
      gaming: {
        title: "Dunia Gaming",
        subtitle: "Saat tidak coding, aku ada di Roblox",
        favorite: "Game Favorit",
        username: "Username Roblox",
        nickname: "Nama di Game",
      },
      skills: { title: "Yang Saya Lakukan", coding: "Coding", animation: "Animasi", gaming: "Gaming", design: "Desain" },
      contact: { title: "Mari Terhubung", subtitle: "Temukan aku online", roblox: "Roblox" },
      footer: "Dibuat dengan semangat oleh Arkana — © 2026",
    },
  },
  zh: {
    translation: {
      nav: { about: "关于", school: "学校", gaming: "游戏", skills: "技能", contact: "联系" },
      hero: {
        greet: "你好，我是",
        role: "程序员与动画师",
        tagline: "来自雅加达的13岁创作者 — 用代码与动画点亮像素世界。",
        cta: "探索我的世界",
        scroll: "向下滚动",
        nicknameLabel: "拖动3D标签",
      },
      about: {
        title: "关于我",
        body: "你好！我叫Arkana，游戏里叫Wizard。我是雅加达东部As-Saadah中学的13岁学生，热爱编程、动画与虚拟世界探险。",
        chips: { age: "13岁", city: "东雅加达", school: "As-Saadah中学", role: "程序员与动画师" },
      },
      school: { title: "我的学校", subtitle: "As-Saadah中学 · Duren Sawit, 东雅加达", mapTitle: "学校位置" },
      gaming: {
        title: "游戏人生",
        subtitle: "不写代码时，我在Roblox里",
        favorite: "最爱游戏",
        username: "Roblox用户名",
        nickname: "游戏昵称",
      },
      skills: { title: "我的专长", coding: "编程", animation: "动画", gaming: "游戏", design: "设计" },
      contact: { title: "联系我", subtitle: "在线找到我", roblox: "Roblox" },
      footer: "由 Arkana 用心打造 — © 2026",
    },
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "id",
  interpolation: { escapeValue: false },
});

export default i18n;