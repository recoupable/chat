// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import BillingMenuItem from "@/components/Sidebar/UserProfileDropdown/BillingMenuItem";

describe("BillingMenuItem", () => {
  it("links to the billing page instead of opening the Stripe portal", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <BillingMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(
      screen.getByRole("menuitem", { name: "Billing" }).getAttribute("href"),
    ).toBe("/billing");
  });

  it("renders above the mobile side modal (z-[200]) so it is reachable on phones", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <BillingMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("menu").className).toContain("z-[210]");
  });
});
