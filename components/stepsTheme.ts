export const STEP_SIZE = 26;
export const DOT_SIZE = 11;
export const STEP_GAP = 9;

export const TRACK_COLOR = '#7ADAA5';
export const DOT_ACTIVE = '#fff';
export const DOT_INACTIVE = '#696969';

export const STEPS_SPRING = {
  damping: 22,
  stiffness: 180,
  mass: 1,
} as const;

/** Width of the track once it has swept `progress` steps past the first one. */
export const trackWidth = (progress: number) => {
  'worklet';
  return (progress + 1) * STEP_SIZE + progress * STEP_GAP;
};
