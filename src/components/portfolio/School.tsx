import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, School as SchoolIcon } from "lucide-react";
import s1 from "@/assets/school-1.jpg";
import s2 from "@/assets/school-2.jpg";
import s3 from "@/assets/school-3.jpg";

// Pondok Kelapa, Duren Sawit, Jakarta Timur
const POS: [number, number] = [-6.2461, 106.9356];

const icon = L.divIcon({
  className: "",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#000;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function School() {
  const { t } = useTranslation();
  const images = [s1, s2, s3];

  return (
    <section id="school" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3 inline-flex items-center gap-2">
            <SchoolIcon className="w-3 h-3" strokeWidth={1.5} /> 02 / Education
          </p>
          <h2 className="font-display text-5xl sm:text-6xl mb-3">{t("school.title")}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t("school.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-3 sm:p-5 mb-6 border border-border bg-card/40"
        >
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
            pagination={{ clickable: true }}
            className="!pb-10"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i} className="!w-[80%] sm:!w-[60%] md:!w-[55%]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <img src={src} alt={`SMP As-Saadah ${i + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-4 sm:p-5 border border-border bg-card/40"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <h3 className="font-mono uppercase tracking-widest text-xs">{t("school.mapTitle")}</h3>
          </div>
          <div className="rounded-2xl overflow-hidden h-[240px] sm:h-[280px]">
            <MapContainer center={POS} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={POS} icon={icon}>
                <Popup>
                  <strong>SMP As-Saadah</strong>
                  <br />
                  Jl. Swakarsa 1B No.40, Pd. Klp.,
                  <br />
                  Duren Sawit, Jakarta Timur 13450
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Jl. Swakarsa 1B No.40, RT.4/RW.3, Pd. Klp., Duren Sawit, Jakarta Timur 13450
          </p>
        </motion.div>
      </div>
    </section>
  );
}