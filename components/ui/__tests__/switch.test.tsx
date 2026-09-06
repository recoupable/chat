// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Switch } from "@/components/ui/switch";

// An off switch in dark mode used to be a black thumb on a card-colored
// track inside a card: invisible. The track and thumb must keep the
// upstream shadcn contrast rule in both states.
describe("Switch", () => {
  const thumbOf = (root: HTMLElement) => root.firstElementChild as HTMLElement;

  it("never paints the unchecked track with the card color or the thumb black", () => {
    render(<Switch aria-label="Auto top-up" />);
    const root = screen.getByRole("switch");
    expect(root.className).not.toContain("bg-card");
    expect(thumbOf(root).className).not.toContain("bg-black");
  });

  it("gives the dark unchecked thumb the foreground color and the track the input color", () => {
    render(<Switch aria-label="Auto top-up" />);
    const root = screen.getByRole("switch");
    expect(root.className).toContain("data-[state=unchecked]:bg-input");
    expect(thumbOf(root).className).toContain(
      "dark:data-[state=unchecked]:bg-foreground",
    );
  });

  it("keeps the dark checked thumb dark on the light primary track", () => {
    render(<Switch aria-label="Auto top-up" checked />);
    const root = screen.getByRole("switch");
    expect(root.className).toContain("data-[state=checked]:bg-primary");
    expect(thumbOf(root).className).toContain(
      "dark:data-[state=checked]:bg-primary-foreground",
    );
  });
});
