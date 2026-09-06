// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AutoTopUpSwitch from "@/components/BillingPage/AutoTopUpSwitch";

const NO_CARD = /Add a card under Payment method to turn on auto top-up/;

describe("AutoTopUpSwitch", () => {
  it("is disabled without a card and explains why on focus", async () => {
    render(
      <AutoTopUpSwitch
        hasCard={false}
        enabled={false}
        onToggle={vi.fn()}
        isSaving={false}
      />,
    );
    const toggle = screen.getByRole("switch");
    expect(toggle.getAttribute("disabled")).not.toBeNull();
    // Screen readers get the reason from the switch itself, tooltip or not.
    const hint = document.getElementById(
      toggle.getAttribute("aria-describedby") as string,
    );
    expect(hint?.textContent).toMatch(NO_CARD);
    expect(screen.queryAllByText(NO_CARD)).toHaveLength(1);
    fireEvent.focus(screen.getByTestId("auto-top-up-no-card"));
    expect((await screen.findAllByText(NO_CARD)).length).toBeGreaterThan(1);
  });

  it("opens the explanation on tap and a second tap keeps it open", async () => {
    render(
      <AutoTopUpSwitch
        hasCard={false}
        enabled={false}
        onToggle={vi.fn()}
        isSaving={false}
      />,
    );
    const trigger = screen.getByTestId("auto-top-up-no-card");
    fireEvent.click(trigger);
    expect((await screen.findAllByText(NO_CARD)).length).toBeGreaterThan(1);
    // Radix closes on pointerdown while open, then its click handler would
    // close again; preventDefault keeps the tap an open, not a toggle.
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    expect((await screen.findAllByText(NO_CARD)).length).toBeGreaterThan(1);
  });

  it("is a plain switch once a card is on file", () => {
    const onToggle = vi.fn();
    render(
      <AutoTopUpSwitch
        hasCard={true}
        enabled={false}
        onToggle={onToggle}
        isSaving={false}
      />,
    );
    expect(screen.queryByTestId("auto-top-up-no-card")).toBeNull();
    expect(
      screen.getByRole("switch").getAttribute("aria-describedby"),
    ).toBeNull();
    fireEvent.click(screen.getByRole("switch"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
