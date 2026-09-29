import { ImageResponse } from "next/og";

export const alt = "Ad astra — Icon Library by Malik Lawal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #090b11 0%, #141a2a 54%, #080a10 100%)", color: "#f3f5ff", padding: 70 }}>
        <div style={{ position: "absolute", width: 520, height: 520, border: "2px solid #586987", borderRadius: 9999, opacity: 0.22, right: 84, top: 54 }} />
        <div style={{ position: "absolute", width: 350, height: 350, border: "18px solid #897fff", borderRadius: 9999, opacity: 0.18, right: 169, top: 138 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, letterSpacing: 4 }}>
            <span style={{ width: 15, height: 15, borderRadius: 999, background: "linear-gradient(135deg, #6384ff, #c1a3ff)", boxShadow: "0 0 22px #887dff" }} />
            AD ASTRA / ICON LIBRARY
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 78, lineHeight: 0.98, fontFamily: "serif" }}>Objects for the</span>
            <span style={{ fontSize: 78, lineHeight: 0.98, fontFamily: "serif" }}>unseen frontier.</span>
            <span style={{ marginTop: 28, color: "#b8c2dc", fontSize: 24 }}>106 sculptural SVG icons for premium digital products.</span>
          </div>
          <div style={{ display: "flex", gap: 30, color: "#aeb9d2", fontSize: 17, letterSpacing: 2 }}>
            <span>DESIGNED BY MALIK LAWAL</span><span>CHROME / GRAPHITE / SPECTRAL</span>
          </div>
        </div>
        <div style={{ position: "absolute", right: 170, top: 173, width: 350, height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 190, height: 255, border: "11px solid #e6ebf8", borderRadius: "100px 100px 34px 34px", transform: "rotate(45deg)", opacity: 0.95 }} />
          <div style={{ position: "absolute", width: 56, height: 56, border: "12px solid #9a83ff", borderRadius: 999 }} />
        </div>
      </div>
    ),
    size,
  );
}
