// First-visit intro loader. Pure HTML/CSS so it paints with the first byte of
// HTML (no JS needed to appear). Visibility is driven by <html data-intro>:
//   - set by `introScript` in <head> before first paint
//   - "skip": already shown this browser session (or storage blocked)
//   - "show" → "done": fades out once the page has loaded (min/max timers)
// With no JS at all, a CSS fail-safe animation fades it out on its own.
// Styles live in globals.css (#intro-loader).

export const INTRO_MIN_MS = 700; // long enough for the animation to register
export const INTRO_MAX_MS = 2500; // never hold the page longer than this

export const introScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("eh-intro")){d.dataset.intro="skip";return}sessionStorage.setItem("eh-intro","1")}catch(e){d.dataset.intro="skip";return}d.dataset.intro="show";var t=Date.now(),x=0;function h(){if(x)return;x=1;d.dataset.intro="done"}function r(){setTimeout(h,Math.max(0,${INTRO_MIN_MS}-(Date.now()-t)))}if(document.readyState==="complete")r();else addEventListener("load",r);setTimeout(h,${INTRO_MAX_MS})})();`;

export function IntroLoader() {
  return (
    <div id="intro-loader" aria-hidden="true">
      <div className="intro-glow" />
      <div className="intro-stage">
        <div className="intro-ring" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/mark-192.webp" alt="" width={96} height={96} className="intro-mark" fetchPriority="high" decoding="sync" />
      </div>
      <p className="intro-word">
        Ersenhad<span>Trading</span>
      </p>
      <div className="intro-bar">
        <span />
      </div>
    </div>
  );
}
