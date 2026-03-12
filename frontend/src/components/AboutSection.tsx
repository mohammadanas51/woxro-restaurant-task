import Image from "next/image";
import aboutLeftImg from "@/assets/About Left Image.png";
import sushiArtImg from "@/assets/Sushi Artistry Redefined Image.png";
import ourStoryImg from "@/assets/Our Story image.png";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-6">
        
        {/* Left Column: Main Image */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[900px] rounded-[32px] md:rounded-[40px] overflow-hidden group">
          <Image
            src={aboutLeftImg}
            alt="Sushi preparation"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <h2 className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-off-white font-forum text-6xl sm:text-8xl md:text-[120px] leading-none uppercase pointer-events-none tracking-[-2px]">
            ABOUT
          </h2>
        </div>

        {/* Right Column: Grid Layout */}
        <div className="flex flex-col gap-6">
          
          {/* Top Row: Artisty Box and Image */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#111211] p-8 sm:p-10 md:p-14 rounded-[32px] md:rounded-[40px] flex flex-col justify-center border border-white/5">
              <h3 className="text-off-white font-forum text-3xl sm:text-4xl md:text-5xl leading-tight uppercase mb-6 md:mb-8 tracking-wide">
                SUSHI ARTISTRY<br />REDEFINED
              </h3>
              <p className="text-[#a0a0a0] font-sans text-[13px] md:text-base leading-relaxed max-w-[600px]">
                Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.
              </p>
            </div>
            <div className="relative aspect-video rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/5">
              <Image
                src={sushiArtImg}
                alt="Sushi counter"
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
          </div>

          {/* Middle Row: Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "TRIP ADVISOR", rating: 5, sub: "BEST FOOD REVIEW PRAGUE" },
              { title: "MICHELIN GUIDE", rating: 5, sub: "CERTIFIED CULINARY EXCELLENCE" },
              { title: "STAR DINING", rating: 5, sub: "PREMIUM DINING EXPERIENCE" }
            ].map((review, i) => (
              <div key={i} className="bg-[#111211] p-8 rounded-[30px] text-center border border-white/5 flex flex-col items-center justify-center group hover:border-white/20 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-[#d4af37] text-xs">★</span>
                  ))}
                </div>
                <h4 className="text-off-white font-forum text-lg tracking-[2px] mb-2 uppercase">{review.title}</h4>
                <p className="text-[#666] font-sans text-[10px] tracking-[1px] uppercase leading-none">{review.sub}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row: Our Story */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-video rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/5">
              <Image
                src={ourStoryImg}
                alt="Chefs in kitchen"
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="bg-[#111211] p-8 sm:p-10 md:p-14 rounded-[32px] md:rounded-[40px] flex flex-col justify-center border border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="h-[1px] flex-grow bg-white/10" />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
                <h3 className="text-off-white font-forum text-xl md:text-2xl tracking-[3px] md:tracking-[4px] uppercase whitespace-nowrap">
                  OUR STORY
                </h3>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
                <div className="h-[1px] flex-grow bg-white/10" />
              </div>
              <p className="text-[#a0a0a0] font-sans text-[13px] md:text-base leading-relaxed md:leading-loose max-w-[480px]">
                Founded with a passion for culinary excellence, Qitchen's journey began in the heart of Prague. Over years, it evolved into a haven for sushi enthusiasts, celebrated for its artful mastery and devotion to redefining gastronomy.
              </p>
            </div>
          </div>

          {/* Footer Copyright/Links */}
          <div className="mt-2 flex justify-center gap-6 text-[10px] tracking-[1.5px] text-white/20 uppercase font-sans">
            <span className="cursor-pointer hover:text-white/40 transition-colors">By Pawel Gola</span>
            <span className="text-white/10">◊</span>
            <span className="cursor-pointer hover:text-white/40 transition-colors">Licensing</span>
            <span className="text-white/10">◊</span>
            <span className="cursor-pointer hover:text-white/40 transition-colors">Styleguide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
