import { Moon, Sun, Monitor, House, HelpCircle, ExternalLink } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useUserProvider } from "@/providers/UserProvder";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import CreditsUsage from "./CreditsUsage";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import ConnectorsMenuItem from "./ConnectorsMenuItem";
import OrgSelector from "./OrgSelector";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/** Maps theme value to a readable label */
const themeLabel = (theme: string | undefined) => {
  if (theme === "dark") return "Dark";
  if (theme === "light") return "Light";
  return "System";
};

const UserProfileDropdown = () => {
  const { toggleModal, signOut, userData, email } = useUserProvider();
  const { isSubscribed } = usePaymentProvider();
  const { theme, setTheme } = useTheme();

  const userName = userData?.name || email || userData?.wallet || "";
  const userImage = userData?.image;
  const avatarInitials = userName
    .split(" ")
    .map((part: string) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  const getThemeIcon = () => {
    if (theme === "dark") return <Moon className="h-4 w-4" />;
    if (theme === "light") return <Sun className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  return (
    <DropdownMenuContent className="w-64" align="start">
      {/* User identity block — avatar + name + badge + email + credits */}
      <div className="flex gap-3 px-3 pt-3 pb-2">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback className="text-xs">{avatarInitials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold truncate">{userName}</p>
            {isSubscribed && (
              <span className="shrink-0 text-[10px] font-medium bg-foreground text-background px-1.5 py-0.5 rounded-full leading-none">
                Pro
              </span>
            )}
          </div>
          {email && email !== userName && (
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          )}
          <CreditsUsage />
        </div>
      </div>

      <DropdownMenuSeparator />

      {/* Identity group — who you are */}
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={toggleModal} className="cursor-pointer">
          <IconUser />
          Profile
        </DropdownMenuItem>
        <OrgSelector />
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      {/* Settings group — app configuration */}
      <DropdownMenuGroup>
        <ManageSubscriptionButton />
        <ConnectorsMenuItem />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            {getThemeIcon()}
            <span className="flex-1">Theme</span>
            <span className="text-xs text-muted-foreground">{themeLabel(theme)}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
              {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
              {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            >
              <Monitor className="h-4 w-4" />
              <span>System</span>
              {theme === "system" && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      {/* External links group */}
      <DropdownMenuGroup>
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="https://recoupable.com" target="_blank" rel="noopener noreferrer">
            <House className="h-4 w-4" />
            recoupable.com
            <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="https://developers.recoupable.com" target="_blank" rel="noopener noreferrer">
            <HelpCircle className="h-4 w-4" />
            Help & Docs
            <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
          </a>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      {/* Log out — styled as destructive action */}
      <DropdownMenuItem
        className="cursor-pointer text-destructive focus:text-destructive"
        onClick={signOut}
      >
        <IconLogout />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UserProfileDropdown;
