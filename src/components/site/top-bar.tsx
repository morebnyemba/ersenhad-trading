import { TbClock, TbMail, TbMapPin, TbPhone } from "react-icons/tb";
import { site, telHref } from "@/lib/site";

// Slim utility bar above the main nav (desktop only). Scrolls away; the nav stays sticky.
export function TopBar() {
  return (
    <div className="hidden bg-ink text-xs text-white/70 md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <p className="flex items-center gap-2">
          <TbMapPin className="size-3.5 text-highlight" /> Free, no-obligation quotations in {site.address.city} and surrounds
        </p>
        <div className="flex items-center gap-6">
          <span className="hidden items-center gap-2 lg:flex"><TbClock className="size-3.5 text-highlight" /> {site.hours}</span>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-white"><TbMail className="size-3.5 text-highlight" /> {site.email}</a>
          <a href={telHref} className="flex items-center gap-2 font-medium text-white transition-colors hover:text-highlight"><TbPhone className="size-3.5 text-highlight" /> {site.phone}</a>
        </div>
      </div>
    </div>
  );
}
