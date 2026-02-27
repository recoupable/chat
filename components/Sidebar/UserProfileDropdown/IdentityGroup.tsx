import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import OrgSelector from "./OrgSelector";

interface IdentityGroupProps {
  onProfileClick: () => void;
}

const IdentityGroup = ({ onProfileClick }: IdentityGroupProps) => (
  <DropdownMenuGroup>
    <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
      <User className="h-4 w-4" />
      Profile
    </DropdownMenuItem>
    <OrgSelector />
  </DropdownMenuGroup>
);

export default IdentityGroup;
