import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NO_CARD = "Add a card under Payment method to turn on auto top-up.";

/**
 * The Auto top-up toggle. Without a card it is disabled and a tooltip says
 * why: a disabled control gets no pointer events, so a focusable wrapper is
 * the trigger, and a tap toggles it for touch screens where hover never comes.
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
            aria-label={NO_CARD}
            className="inline-flex cursor-not-allowed rounded-full"
            onClick={() => setOpen((value) => !value)}
          >
            {toggle}
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
