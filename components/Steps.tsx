import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Step from './Step';
import {
  STEP_GAP,
  STEP_SIZE,
  STEPS_SPRING,
  TRACK_COLOR,
  trackWidth,
} from './stepsTheme';
import type { Steps } from '../App';

type Props = {
  currentStep: number;
  steps: Steps;
}

const StepsComponent = ({steps, currentStep}: Props) => {
  // Leading edge of the green track, in step units. Every visual change —
  // the track's width and each dot's colour — is derived from this one value
  // so the sweep and the dots stay in sync.
  const progress = useSharedValue(currentStep);

  useEffect(() => {
    progress.value = withSpring(currentStep, STEPS_SPRING);
  }, [currentStep]);

  const trackStyle = useAnimatedStyle(() => ({
    width: trackWidth(progress.value),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.track, trackStyle]} />
      {steps.map((item, index) => {
        return <Step key={item.id} index={index} progress={progress} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: STEP_GAP,
    marginBottom: 20,
  },
  track: {
    position: 'absolute',
    left: 0,
    height: STEP_SIZE,
    borderRadius: STEP_SIZE / 2,
    backgroundColor: TRACK_COLOR,
  },
})

export default StepsComponent;
