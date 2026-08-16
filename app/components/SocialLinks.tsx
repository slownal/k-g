// Server component — social link icons top-right
// Add your real profile URLs here:
const LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "#", // TODO: add your Instagram URL
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "spotify",
    label: "Spotify",
    href: "#", // TODO: add your Spotify URL
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.076-.495 9.712 1.115.293.18.387.563.207.857zm1.223-2.722a.78.78 0 0 1-1.072.257C14.3 12.3 11.2 11.9 7.747 12.9a.78.78 0 0 1-.356-1.517c3.855-1.103 7.349-.622 10.16 1.246a.78.78 0 0 1 .258 1.073zm.105-2.835C15.2 8.9 10.8 8.75 8.35 9.46a.935.935 0 1 1-.543-1.79c2.836-.86 7.552-.694 10.528 1.076a.935.935 0 0 1-.42 1.121z" />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {LINKS.map((link) => (
        <a
          key={link.id}
          id={`social-${link.id}`}
          href={link.href}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-150"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
