import { cn } from "@/lib/utils";
import LogoIcon from "./LogoIcon";

const Logo = ({ isExpanded = false }: { isExpanded?: boolean }) => {
  return (
    <div className={cn(
      "flex items-center",
      isExpanded ? "gap-2" : "gap-0"
    )}>
      {/* Icon container — matches w-[21px] used by nav item icons */}
      <div className="w-[21px] flex justify-center items-center shrink-0">
        <LogoIcon className="w-[18px] h-auto text-foreground" />
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
