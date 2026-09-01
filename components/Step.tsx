import { View, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import {
  DOT_ACTIVE,
  DOT_INACTIVE,
  DOT_SIZE,
  STEP_SIZE,
} from './stepsTheme';

type StepProps = {
  index: number;
  /** Animated position of the track's leading edge, in step units. */
  progress: SharedValue<number>;
}

const Step = ({ index, progress }: StepProps) => {
  const dotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [index - 0.65, index - 0.25],
      [DOT_INACTIVE, DOT_ACTIVE],
    ),
  }));

  return (
    <View style={styles.slot}>
      <Animated.View style={[styles.dot, dotStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  slot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: STEP_SIZE,
    height: STEP_SIZE,
  },
  dot: {
    borderRadius: DOT_SIZE / 2,
    width: DOT_SIZE,
    height: DOT_SIZE,
  },
})

export default Step;
