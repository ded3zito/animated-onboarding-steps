import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Step from './Step';
import { trackWidth } from './theme';
import type { OnboardingStep, StepsTheme } from './types';

type StepsProps = {
  steps: OnboardingStep[];
  currentStep: number;
  theme: StepsTheme;
};

const Steps = ({ steps, currentStep, theme }: StepsProps) => {
  const { stepSize, stepGap, trackColor, spring } = theme;

  // Leading edge of the track, in step units. Every visual change — the
  // track's width and each dot's colour — is derived from this one value so
  // the sweep and the dots stay in sync, including on the way back.
  const progress = useSharedValue(currentStep);

  // Held in a ref so an inline `stepsTheme={{ ... }}` — which hands us a new
  // spring object on every render — cannot restart an in-flight animation.
  // The step change is the only thing that should kick the spring off, and the
  // ref is always current by the time it does.
  const springRef = useRef(spring);
  springRef.current = spring;

  useEffect(() => {
    progress.value = withSpring(currentStep, springRef.current);
  }, [currentStep]);

  const trackStyle = useAnimatedStyle(() => ({
    width: trackWidth(progress.value, stepSize, stepGap),
  }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: stepGap }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            height: stepSize,
            borderRadius: stepSize / 2,
            backgroundColor: trackColor,
          },
          trackStyle,
        ]}
      />
      {steps.map((item, index) => (
        <Step key={item.id} index={index} progress={progress} theme={theme} />
      ))}
    </View>
  );
};

export default Steps;
