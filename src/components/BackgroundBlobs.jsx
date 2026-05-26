export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Viola — top-left area */}
      <div
        className="blob-1 absolute rounded-full"
        style={{
          top: "-5%",
          left: "-5%",
          width: "45vw",
          height: "45vw",
          maxWidth: "700px",
          maxHeight: "700px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Blu scuro — center-right */}
      <div
        className="blob-2 absolute rounded-full"
        style={{
          top: "30%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: "800px",
          maxHeight: "800px",
          background:
            "radial-gradient(circle, rgba(30,64,175,0.15) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Indaco — bottom-left */}
      <div
        className="blob-3 absolute rounded-full"
        style={{
          bottom: "-10%",
          left: "15%",
          width: "40vw",
          height: "40vw",
          maxWidth: "650px",
          maxHeight: "650px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />
    </div>
  );
}
