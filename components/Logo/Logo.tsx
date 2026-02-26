import { cn } from "@/lib/utils";

/**
 * Recoup logo icon rendered as inline SVG with currentColor.
 * Automatically adapts to light/dark mode via the text color.
 */
const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    width="21"
    height="23"
    viewBox="0 0 21 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5923 0C10.7225 0 10.0173 0.695147 10.0173 1.55266V7.72997C10.0173 8.64466 9.73038 9.53697 9.19585 10.2846C8.3532 11.4631 6.9819 12.1642 5.51927 12.1642H1.575C0.705151 12.1642 0 12.8593 0 13.7169V21.4473C0 22.3048 0.705151 23 1.575 23H9.40768C10.2775 23 10.9827 22.3048 10.9827 21.4473V16.1656C10.9827 15.098 11.3176 14.0565 11.9415 13.1839L12.0518 13.0296C13.0353 11.654 14.6358 10.8358 16.343 10.8358H19.425C20.2949 10.8358 21 10.1406 21 9.28314V1.55266C21 0.695147 20.2949 0 19.425 0H11.5923Z"
      fill="currentColor"
    />
  </svg>
);

const Logo = ({ isExpanded = false }: { isExpanded?: boolean }) => {
  return (
    <div className={cn(
      "flex items-center",
      isExpanded ? "gap-2" : "gap-0"
    )}>
      {/* Icon container — matches w-[21px] used by nav item icons */}
      <div className="w-[21px] flex justify-center items-center shrink-0">
        <LogoIcon className="w-[18px] h-[18px] text-foreground" />
      </div>
      {/* Brand name — fades in/out alongside sidebar */}
      <span className={cn(
        "font-semibold text-lg text-foreground whitespace-nowrap overflow-hidden transition-all duration-200 font-heading",
        isExpanded ? "opacity-100 max-w-[150px]" : "opacity-0 max-w-0"
      )}>
        Recoupable
      </span>
    </div>
  );
};

export default Logo;
