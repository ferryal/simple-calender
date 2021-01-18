export const DEFAULT_COLOR = 'indigo-600';

export const ALL_COLORS = Object.freeze([DEFAULT_COLOR]);

export function getBackgroundColor(color) {
  return `bg-${color}`;
}

export function getTextColor(color) {
  return `text-${color}`;
}
