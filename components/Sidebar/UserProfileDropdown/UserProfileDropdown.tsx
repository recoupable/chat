import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUserProvider } from "@/providers/UserProvder";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import AccountIdDisplay from "@/components/ArtistSetting/AccountIdDisplay";
import CreditsUsage from "./CreditsUsage";
import IdentityGroup from "./IdentityGroup";
import SettingsGroup from "./SettingsGroup";
import ExternalLinksGroup from "./ExternalLinksGroup";
import LogoutButton from "./LogoutButton";

const UserProfileDropdown = () => {
  const { toggleModal, userData } = useUserProvider();
  const { isSubscribed } = usePaymentProvider();

  return (
    <DropdownMenuContent className="w-56" align="start">
      <DropdownMenuLabel className="text-sm font-semibold">
        My Account
      </DropdownMenuLabel>
      {isSubscribed && (
        <div className="px-2 pb-1">
          <div className="text-[10px] font-medium rounded-md bg-muted text-foreground px-2 py-1 text-center border border-border">
            Recoupable Pro: Active
          </div>
        </div>
      )}
      {userData?.account_id && (
        <div className="px-2 py-1.5">
          <AccountIdDisplay accountId={userData.account_id} label="Account ID" />
        </div>
      )}
      <CreditsUsage />

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
