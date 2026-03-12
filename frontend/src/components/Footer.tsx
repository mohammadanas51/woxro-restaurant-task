import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-20 md:py-[80px] px-6 border-t border-[var(--border-color)]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center sm:text-left">
        {/* Left */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-forum text-2xl text-off-white tracking-[4px] mb-5">
            QITCHEN
          </h3>
          <p className="font-sans text-[13px] text-[#666] leading-relaxed">
            Premium Japanese Cuisine.<br />
            Where tradition meets innovation<br />
            in every carefully crafted roll.
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center">
          <h4 className="font-sans text-[12px] text-off-white tracking-[3px] mb-5 uppercase">
            NAVIGATION
          </h4>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Menu', href: '/#menu' },
              { label: 'About', href: '/#about' },
              { label: 'Reservation', href: '/#reservation' },
              { label: 'Blog', href: '/blog' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="font-sans text-[13px] text-[#666] hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center sm:items-end lg:items-end sm:col-span-2 lg:col-span-1">
          <h4 className="font-sans text-[12px] text-off-white tracking-[3px] mb-5 uppercase">
            FIND US
          </h4>
          <p className="font-sans text-[13px] text-[#666] leading-relaxed text-center sm:text-right">
            123 Sushi Lane<br />
            Copenhagen, Denmark<br />
            +45 12 34 56 78
          </p>
          <div className="mt-5 flex gap-4 justify-center sm:justify-end">
            <a href="#" className="text-[#666] text-[13px] hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-[#666] text-[13px] hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 md:mt-[60px] pt-6 border-t border-[var(--border-color)]">
        <p className="font-sans text-[12px] text-[#444] tracking-[1px]">
          © {new Date().getFullYear()} QITCHEN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
