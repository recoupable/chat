// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentMethodPanel from "@/components/BillingPage/PaymentMethodPanel";

describe("PaymentMethodPanel Switch to personal billing", () => {
  it("shows Switch to personal billing in the empty state only when an org is selected", () => {
    const onSwitchToPersonal = vi.fn();
    const { rerender } = render(
      <PaymentMethodPanel
        card={null}
        onConfigure={vi.fn()}
        onRemove={vi.fn()}
        isBusy={false}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "Switch to personal billing" }),
    ).toBeNull();
    rerender(
      <PaymentMethodPanel
        card={null}
        onConfigure={vi.fn()}
        onRemove={vi.fn()}
        isBusy={false}
        onSwitchToPersonal={onSwitchToPersonal}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch to personal billing" }),
    );
    expect(onSwitchToPersonal).toHaveBeenCalled();
  });

  it("shows Switch to personal billing with a card on file too", () => {
    render(
      <PaymentMethodPanel
        card={{
          brand: "visa",
          last4: "4242",
          exp_month: 12,
          exp_year: 2027,
          funding: "credit",
        }}
        onConfigure={vi.fn()}
        onRemove={vi.fn()}
        isBusy={false}
        onSwitchToPersonal={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Switch to personal billing" }),
    ).toBeTruthy();
  });
});
