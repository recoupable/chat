import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useUserProvider } from "@/providers/UserProvder";

const LogoutButton = () => {
  const { signOut } = useUserProvider();

  return (
    <DropdownMenuItem
      className="cursor-pointer text-destructive focus:text-destructive"
      onClick={signOut}
    >
      <LogOut className="h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
};

export default LogoutButton;
