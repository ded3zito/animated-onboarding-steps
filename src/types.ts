import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { WithSpringConfig } from 'react-native-reanimated';

/**
 * A single step of the onboarding flow.
 *
 * Everything except `id` is optional so a flow can be as thin as
 * `[{ id: 0 }, { id: 1 }]` and still render.
 */
export type OnboardingStep = {
  /** Stable identity for this step. Used as the React key. */
  id: string | number;
  /** What fills the area above the step indicator while this step is active. */
  content?: ReactNode;
  /** Overrides the default "Back" label while this step is active. */
  backButtonLabel?: string;
  /** Overrides the default "Continue" label while this step is active. */
  continueButtonLabel?: string;
  /** Overrides the default "Finish" label. Only used on the last step. */
  finishButtonLabel?: string;
};

/**
 * Fully resolved look of the animated step indicator. Every field is required
 * here; consumers supply a `StepsThemeInput` and the gaps are filled from
 * `defaultStepsTheme`.
 */
export type StepsTheme = {
  /** Diameter of a step's slot — also the height of the track. */
  stepSize: number;
  /** Diameter of the dot drawn inside each slot. */
  dotSize: number;
  /** Horizontal space between two step slots. */
  stepGap: number;
  /** Colour of the pill that connects completed steps. */
  trackColor: string;
  /** Dot colour once the track has swept over it. */
  activeDotColor: string;
  /** Dot colour before the track reaches it. */
  inactiveDotColor: string;
  /** Spring driving the track's sweep and the dot colour crossfade. */
  spring: WithSpringConfig;
};

/** Partial theme accepted from consumers; merged over `defaultStepsTheme`. */
export type StepsThemeInput = Partial<StepsTheme>;

/** Everything a custom button renderer needs to draw itself and act. */
export type OnboardingButtonProps = {
  /** Label resolved from the step, falling back to the built-in default. */
  label: string;
  /** Advances or rewinds the flow. Call this from your own component. */
  onPress: () => void;
  /** Zero-based index of the active step. */
  currentStep: number;
  /** Total number of steps in the flow. */
  totalSteps: number;
};

/** A function returning the React element to use in place of a stock button. */
export type OnboardingButtonRenderer = (props: OnboardingButtonProps) => ReactNode;

export type OnboardingProps = {
  /** The flow. Rendering is skipped entirely when this is empty. */
  steps: OnboardingStep[];
  /** Step to open on. Clamped into range. Defaults to 0. */
  initialStep?: number;

  /** Called when the primary button is pressed on the last step. The flow
   *  stays on that step — navigating away is the consumer's call. */
  onComplete?: () => void;
  /** Called on every step change, forwards and backwards. */
  onStepChange?: (index: number, step: OnboardingStep) => void;
  /** Called when the back button moves the flow to a previous step.
   *  `onStepChange` fires as well. */
  onBack?: (index: number, step: OnboardingStep) => void;

  /** Partial override of the step indicator's look. */
  stepsTheme?: StepsThemeInput;

  /** Background of the stock back button. */
  backButtonColor?: string;
  /** Label colour of the stock back button. */
  backButtonLabelColor?: string;
  /** Replaces the stock back button. Still fades in/out with the flow. */
  backButton?: OnboardingButtonRenderer;
  /** Background of the stock continue/finish button. */
  continueButtonColor?: string;
  /** Label colour of the stock continue/finish button. */
  continueButtonLabelColor?: string;
  /** Replaces the stock continue/finish button. */
  continueButton?: OnboardingButtonRenderer;

  /** Style for the outermost container. */
  style?: StyleProp<ViewStyle>;
  /** Style for the region that hosts the active step's `content`. */
  contentStyle?: StyleProp<ViewStyle>;
};
