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
    expect(screen.queryAllByText(NO_CARD)).toHaveLength(0);
    fireEvent.focus(screen.getByTestId("auto-top-up-no-card"));
    expect((await screen.findAllByText(NO_CARD)).length).toBeGreaterThan(0);
  });

  it("opens the explanation on tap, for touch screens", async () => {
    render(
      <AutoTopUpSwitch
        hasCard={false}
        enabled={false}
        onToggle={vi.fn()}
        isSaving={false}
      />,
    );
    fireEvent.click(screen.getByTestId("auto-top-up-no-card"));
    expect((await screen.findAllByText(NO_CARD)).length).toBeGreaterThan(0);
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
    fireEvent.click(screen.getByRole("switch"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
