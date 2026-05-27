export default function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  index,
  category,
}) {
  const isReversed = index % 2 !== 0;

  const categoryStyles = {
    bridge: {
      label: "Il Ponte",
      color: "from-violet-500/20 to-indigo-500/20",
      border: "border-violet-500/10",
      accent: "text-violet-400",
      dot: "bg-violet-400",
    },
    dev: {
      label: "Sviluppo",
      color: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/10",
      accent: "text-cyan-400",
      dot: "bg-cyan-400",
    },
    audio: {
      label: "Audio & Code",
      color: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/10",
      accent: "text-purple-400",
      dot: "bg-purple-400",
    },
    management: {
      label: "Gestionale",
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/10",
      accent: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    "problem-solving": {
      label: "Problem Solving",
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/10",
      accent: "text-amber-400",
      dot: "bg-amber-400",
    },
  };

  const style = categoryStyles[category] || categoryStyles.dev;

  return (
    <div
      className={`project-card flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
      style={{ opacity: 0 }}
    >
      {/* Decorative visual area */}
      <div className="flex-1">
        <div
          className={`glass-card relative aspect-[16/10] overflow-hidden rounded-2xl ${style.border}`}
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-60`}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner accent */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            <span className={`text-xs font-medium tracking-wider ${style.accent}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Center icon hint */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${style.border} bg-white/[0.054] backdrop-blur-sm`}
            >
              <span className={`text-2xl font-light ${style.accent}`}>
                {category === "bridge" && "⟡"}
                {category === "dev" && "◆"}
                {category === "audio" && "♪"}
                {category === "management" && "▦"}
                {category === "problem-solving" && "⚡"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center">
        {/* Category badge */}
        <div className="mb-4 flex items-center gap-3">
          <div className={`h-1 w-1 rounded-full ${style.dot}`} />
          <span
            className={`text-xs font-medium uppercase tracking-[0.15em] ${style.accent}`}
          >
            {style.label}
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h3>

        <p className="mb-3 text-sm font-medium text-neutral-400">{subtitle}</p>

        <p className="mb-6 text-base leading-[1.8] text-neutral-300">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
