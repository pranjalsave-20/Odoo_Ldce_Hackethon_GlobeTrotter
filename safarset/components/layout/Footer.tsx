import Link from "next/link";

export default function Footer() {
  const cols = [
    {
      title: "Bharat Parikrama",
      brand: true,
      desc: "India's AI-powered travel planning platform. Multi-modal journeys, smart itineraries, and seamless experiences across 28 states.",
    },
    {
      title: "Platform",
      links: ["Plan a Trip", "Explore India", "Community Trips", "AI Assistant"],
      hrefs: ["/plan", "/explore", "/community", "/assistant"],
    },
    {
      title: "Travel",
      links: ["Hotels", "Transport", "Local Guides", "Emergency Help"],
      hrefs: ["#", "#", "#", "#"],
    },
    {
      title: "Support",
      links: ["Contact", "Help Center", "Privacy Policy", "Terms of Service"],
      hrefs: ["#", "#", "#", "#"],
    },
  ];

  return (
    <footer className="footer">
      <div className="container" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
        {/* 4-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: "48px",
        }}
          className="footer-grid"
        >
          {cols.map((col) => (
            <div key={col.title}>
              {col.brand ? (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>भारत परिक्रमा</p>
                    <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>BHARAT PARIKRAMA</p>
                  </div>
                  <p style={{ fontSize: "14px", color: "#8BA8C8", lineHeight: 1.7, maxWidth: "280px" }}>{col.desc}</p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C8D8EC", marginBottom: "20px" }}>{col.title}</p>
                  <ul style={{ listStyle: "none" }}>
                    {col.links?.map((l, i) => (
                      <li key={l} style={{ marginBottom: "4px" }}>
                        <Link href={col.hrefs?.[i] ?? "#"} className="footer-link">{l}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: "56px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{ fontSize: "13px", color: "#5A7A9A" }}>
            © 2026 Bharat Parikrama. Made for journeys across India.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <Link key={l} href="#" style={{ fontSize: "12px", color: "#5A7A9A", textDecoration: "none", transition: "color 0.15s" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; } }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
