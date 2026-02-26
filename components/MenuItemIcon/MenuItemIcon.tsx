import Icon, { IconsType } from "../Icon";

const MenuItemIcon = ({ name }: { name: IconsType }) => {
  return (
    <div className="w-[21px] flex justify-center items-center aspect-[1/1] [&_svg]:size-[18px]">
      <Icon name={name} />
    </div>
  );
};

export default MenuItemIcon;
