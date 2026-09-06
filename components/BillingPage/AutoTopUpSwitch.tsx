import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NO_CARD = "Add a card under Payment method to turn on auto top-up.";
const HINT_ID = "auto-top-up-no-card-hint";

/**
 * The Auto top-up toggle. Without a card it is disabled and a tooltip says
 * why: a disabled control gets no pointer events, so a focusable wrapper is
 * the trigger (hover, keyboard focus, and a tap for touch screens all open
 * it), and the switch itself is described by the same text for screen readers.
 */
const AutoTopUpSwitch = ({
  hasCard,
  enabled,
  onToggle,
  isSaving,
}: {
  hasCard: boolean;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  isSaving: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const toggle = (
    <Switch
      checked={hasCard && enabled}
      onCheckedChange={onToggle}
      disabled={!hasCard || isSaving}
      aria-label="Auto top-up"
      aria-describedby={hasCard ? undefined : HINT_ID}
      className={hasCard ? undefined : "pointer-events-none"}
    />
  );
  if (hasCard) return toggle;
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            data-testid="auto-top-up-no-card"
            className="inline-flex cursor-not-allowed rounded-full"
            // preventDefault keeps Radix's own click-to-close out of the chain;
            // closing is by Escape, blur, or a tap outside.
            onClick={(event) => {
              event.preventDefault();
              setOpen(true);
            }}
          >
            {toggle}
            <span id={HINT_ID} className="sr-only">
              {NO_CARD}
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-56 text-center">
          {NO_CARD}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AutoTopUpSwitch;
