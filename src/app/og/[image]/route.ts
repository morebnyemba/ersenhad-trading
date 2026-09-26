import sharp from "sharp";
import { renderOg } from "@/app/_og/render";
import { ogCards } from "@/lib/og";

// Static export writes each card to out/og/<key>.jpg — a real .jpg file, so it is
// served as image/jpeg with no trailing-slash redirect.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogCards.map((c) => ({ image: `${c.key}.jpg` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const card = ogCards.find((c) => `${c.key}.jpg` === image);
  if (!card) return new Response("Not found", { status: 404 });
  const png = Buffer.from(await (await renderOg(card)).arrayBuffer());
  const jpg = await sharp(png).flatten({ background: "#0f1d45" }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();
  return new Response(new Uint8Array(jpg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=604800, immutable" },
  });
}
