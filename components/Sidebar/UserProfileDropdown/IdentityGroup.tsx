import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconUser } from "@tabler/icons-react";
import OrgSelector from "./OrgSelector";

interface IdentityGroupProps {
  onProfileClick: () => void;
}

const IdentityGroup = ({ onProfileClick }: IdentityGroupProps) => (
  <DropdownMenuGroup>
    <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
      <IconUser />
      Profile
    </DropdownMenuItem>
    <OrgSelector />
  </DropdownMenuGroup>
);

export default IdentityGroup;
