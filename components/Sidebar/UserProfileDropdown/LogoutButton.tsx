import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconLogout } from "@tabler/icons-react";
import { useUserProvider } from "@/providers/UserProvder";

const LogoutButton = () => {
  const { signOut } = useUserProvider();

  return (
    <DropdownMenuItem
      className="cursor-pointer text-destructive focus:text-destructive"
      onClick={signOut}
    >
      <IconLogout />
      Log out
    </DropdownMenuItem>
  );
};

export default LogoutButton;
