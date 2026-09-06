// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import UserProfileDropdown from "@/components/Sidebar/UserProfileDropdown/UserProfileDropdown";

vi.mock("@/providers/UserProvder", () => ({
  useUserProvider: () => ({
    toggleModal: vi.fn(),
    userData: null,
    email: "a@b.c",
  }),
}));
vi.mock("@/providers/PaymentProvider", () => ({
  usePaymentProvider: () => ({ isSubscribed: false }),
}));
vi.mock("@/components/Sidebar/UserProfileDropdown/CreditsUsage", () => ({
  default: () => <div>credits</div>,
}));
vi.mock("@/components/Sidebar/UserProfileDropdown/IdentityGroup", () => ({
  default: () => <div>identity</div>,
}));
vi.mock("@/components/Sidebar/UserProfileDropdown/SettingsGroup", () => ({
  default: () => <div>settings</div>,
}));
vi.mock("@/components/Sidebar/UserProfileDropdown/ExternalLinksGroup", () => ({
  default: () => <div>links</div>,
}));
vi.mock("@/components/Sidebar/UserProfileDropdown/LogoutButton", () => ({
  default: () => <div>logout</div>,
}));

describe("UserProfileDropdown layering", () => {
  // The mobile SideModal sits at z-[200]; the profile menu is the only route to
  // Billing on phones, so its content must render above that layer. The lift is
  // scoped to this menu: the shared primitive keeps its default z-50.
  it("scopes z-[210] to the profile menu, not the shared DropdownMenuContent", () => {
    const { unmount } = render(
      <DropdownMenu open>
        <UserProfileDropdown />
      </DropdownMenu>,
    );
    expect(screen.getByRole("menu").className).toContain("z-[210]");
    unmount();

    render(
      <DropdownMenu open>
        <DropdownMenuContent>plain</DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("menu").className).toContain("z-50");
    expect(screen.getByRole("menu").className).not.toContain("z-[210]");
  });
});
