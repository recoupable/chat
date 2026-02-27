import {
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUserProvider } from "@/providers/UserProvder";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreditsUsage from "./CreditsUsage";
import IdentityGroup from "./IdentityGroup";
import SettingsGroup from "./SettingsGroup";
import ExternalLinksGroup from "./ExternalLinksGroup";
import LogoutButton from "./LogoutButton";

const UserProfileDropdown = () => {
  const { toggleModal, userData, email } = useUserProvider();
  const { isSubscribed } = usePaymentProvider();

  const userName = userData?.name || email || userData?.wallet || "";
  const userImage = userData?.image ?? undefined;
  const avatarInitials =
    userName
      .split(" ")
      .map((part: string) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

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

      <IdentityGroup onProfileClick={toggleModal} />

      <DropdownMenuSeparator />

      <SettingsGroup />

      <DropdownMenuSeparator />

      <ExternalLinksGroup />

      <DropdownMenuSeparator />

      <LogoutButton />
    </DropdownMenuContent>
  );
};

export default UserProfileDropdown;
