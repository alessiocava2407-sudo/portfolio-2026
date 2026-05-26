export default function BackgroundBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Violet blob — top left */}
      <div
        className="blob-1 absolute rounded-full"
        style={{
          top: "10%",
          left: "15%",
          width: "min(600px, 50vw)",
          height: "min(600px, 50vw)",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Dark blue blob — center right */}
      <div
        className="blob-2 absolute rounded-full"
        style={{
          top: "40%",
          right: "10%",
          width: "min(500px, 45vw)",
          height: "min(500px, 45vw)",
          background:
            "radial-gradient(circle, rgba(30, 58, 95, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Indigo blob — bottom left */}
      <div
        className="blob-3 absolute rounded-full"
        style={{
          bottom: "5%",
          left: "30%",
          width: "min(550px, 48vw)",
          height: "min(550px, 48vw)",
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
