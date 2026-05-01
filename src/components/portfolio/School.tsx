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
  html: `<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#ec4899);box-shadow:0 0 20px #a855f7;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;border:2px solid white;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
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
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-3 text-xs">
            <SchoolIcon className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">EDUCATION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-2">
            <span className="text-gradient">{t("school.title")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t("school.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-3 sm:p-5 mb-6"
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
                  <img src={src} alt={`SMP As-Saadah ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm sm:text-base">{t("school.mapTitle")}</h3>
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