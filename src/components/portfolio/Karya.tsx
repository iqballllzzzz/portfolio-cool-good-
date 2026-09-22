import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Box, Image as ImageIcon, Video } from "lucide-react";
import { usePortfolio, STOCK_PHOTOS } from "@/hooks/use-portfolio";

/**
 * Karya 3D — dua panel:
 *   1. Foto (swiper) — stock dulu, isi lewat admin
 *   2. Video (swiper) — kosong dulu, isi lewat admin
 * Lokasi sekolah & map DIHAPUS (sesuai permintaan).
 */
export default function Karya() {
  const { profile, photos, videos } = usePortfolio();

  const fotoItems = photos.length > 0 ? photos : STOCK_PHOTOS.map((u, i) => ({ id: `stock-${i}`, url: u }));
  const videoItems = videos;

  return (
    <section id="karya" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3 inline-flex items-center gap-2">
            <Box className="w-3 h-3" strokeWidth={1.5} /> 02 / 3D Works
          </p>
          <h2 className="font-display text-5xl sm:text-6xl mb-3">{profile.karyaTitle}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">{profile.karyaSubtitle}</p>
        </motion.div>

        {/* PANEL FOTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-3 sm:p-5 mb-6 border border-border bg-card/40"
        >
          <div className="flex items-center gap-2 px-2 py-2 mb-2">
            <ImageIcon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="font-mono uppercase tracking-widest text-xs text-muted-foreground">Photos</h3>
          </div>
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop={fotoItems.length > 2}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
            pagination={{ clickable: true }}
            className="!pb-10"
          >
            {fotoItems.map((item, i) => (
              <SwiperSlide key={item.id ?? i} className="!w-[80%] sm:!w-[60%] md:!w-[55%]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <img
                    src={item.url}
                    alt={`Work ${i + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* PANEL VIDEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-3 sm:p-5 mb-6 border border-border bg-card/40"
        >
          <div className="flex items-center gap-2 px-2 py-2 mb-2">
            <Video className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="font-mono uppercase tracking-widest text-xs text-muted-foreground">Videos</h3>
          </div>
          {videoItems.length > 0 ? (
            <Swiper
              modules={[Autoplay, EffectCoverflow, Pagination]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              loop={videoItems.length > 2}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
              pagination={{ clickable: true }}
              className="!pb-10"
            >
              {videoItems.map((item, i) => (
                <SwiperSlide key={item._id} className="!w-[80%] sm:!w-[60%] md:!w-[55%]">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-black">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="none"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center border border-dashed border-border rounded-2xl">
              <Video className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">No videos yet — add them from the admin panel</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}