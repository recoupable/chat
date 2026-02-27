import { Moon, Sun, Monitor } from "lucide-react";

const getThemeIcon = (theme: string | undefined) => {
  if (theme === "dark") return <Moon className="h-4 w-4" />;
  if (theme === "light") return <Sun className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
};

export default getThemeIcon;
