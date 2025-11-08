import type { WidgetTags } from "constants/WidgetConstants";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getWidgetCards } from "selectors/editorSelectors";
import { groupWidgetCardsByTags } from "../utils";

/**
 * Custom hook for managing UI explorer items including widgets and building blocks.
 * @returns Object containing cards, grouped cards and entity loading states.
 */
export const useUIExplorerItems = () => {
  const [entityLoading, setEntityLoading] = useState<
    Partial<Record<WidgetTags, boolean>>
  >({
    "Building Blocks": false,
  });
  const widgetCards = useSelector(getWidgetCards);

  const cards = useMemo(() => [...widgetCards], [widgetCards]);

  const groupedCards = useMemo(() => groupWidgetCardsByTags(cards), [cards]);

  return {
    groupedCards,
    cards,
    entityLoading,
  };
};
