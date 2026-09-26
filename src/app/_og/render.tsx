import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Shared Open Graph card (1200×630) used by every opengraph-image route.
// Rendered at build time (static export) — assets are read from disk, no network.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const dir = path.join(process.cwd(), "src/app/_og");
const file = (p: string) => readFile(path.join(dir, p));
const dataUrl = async (p: string, mime: string) => `data:${mime};base64,${(await file(p)).toString("base64")}`;
const font = (p: string) => readFile(path.join(process.cwd(), "node_modules/@fontsource", p));

const NAVY = "#0f1d45";
const CYAN = "#22d3ee";

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  photo,
  chips = ["Car Shades", "Rubber Tiles", "Seamless Gutters"],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  photo: string;
  chips?: string[];
}) {
  const [logo, img, heading, body] = await Promise.all([
    dataUrl("logo-light.png", "image/png"),
    dataUrl(`photos/${photo}.jpg`, "image/jpeg"),
    font("plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff"),
    font("geist-sans/files/geist-sans-latin-400-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: NAVY, position: "relative", fontFamily: "Geist" }}>
        {/* photo panel (right), fading into navy on its left edge */}
        <div style={{ display: "flex", position: "absolute", left: 600, top: 0, width: 600, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} width={600} height={630} style={{ width: 600, height: 630, objectFit: "cover" }} alt="" />
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 0,
              top: 0,
              width: 600,
              height: 630,
              backgroundImage: "linear-gradient(90deg, #0f1d45 0%, rgba(15,29,69,0.55) 35%, rgba(15,29,69,0) 70%)",
            }}
          />
        </div>

        {/* brand gradient rule — same hues as the logo mark */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, display: "flex", background: "linear-gradient(90deg, #00c2ff, #1f5fe0, #6d28d9, #ec0c7c)" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px 56px", width: 700, height: "100%", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} height={76} width={242} alt="" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: CYAN, fontSize: 22, letterSpacing: 4, textTransform: "uppercase", fontFamily: "Jakarta" }}>{eyebrow}</div>
            <div style={{ display: "flex", color: "white", fontSize: 58, lineHeight: 1.08, marginTop: 16, fontFamily: "Jakarta", letterSpacing: -1.5, maxWidth: 580 }}>{title}</div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.72)", fontSize: 25, lineHeight: 1.4, marginTop: 20, maxWidth: 540 }}>{subtitle}</div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", maxWidth: 600 }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{ display: "flex", padding: "10px 20px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: 19 }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: heading, weight: 800, style: "normal" },
        { name: "Geist", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
