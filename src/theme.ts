import type { StepsTheme, StepsThemeInput } from './types';

/** The look the indicator falls back to when a field is not overridden. */
export const defaultStepsTheme: StepsTheme = {
  stepSize: 26,
  dotSize: 11,
  stepGap: 9,
  trackColor: '#7ADAA5',
  activeDotColor: '#fff',
  inactiveDotColor: '#696969',
  spring: {
    damping: 22,
    stiffness: 180,
    mass: 1,
  },
};

/** Fills a partial theme with the defaults, leaving a fully resolved object. */
export const resolveStepsTheme = (input?: StepsThemeInput): StepsTheme => ({
  ...defaultStepsTheme,
  ...input,
});

/**
 * Width of the track once it has swept `progress` steps past the first one.
 *
 * At `progress === 0` this is exactly one slot, so the track reads as a circle
 * behind the first dot; at `progress === 1` it spans two slots plus the gap
 * between them, visually connecting the two steps.
 */
export const trackWidth = (progress: number, stepSize: number, stepGap: number) => {
  'worklet';
  return (progress + 1) * stepSize + progress * stepGap;
};
