import { View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type { StepsTheme } from './types';

type StepProps = {
  index: number;
  /** Animated position of the track's leading edge, in step units. */
  progress: SharedValue<number>;
  theme: StepsTheme;
};

const Step = ({ index, progress, theme }: StepProps) => {
  const { stepSize, dotSize, activeDotColor, inactiveDotColor } = theme;

  // The dot flips colour across the short window where the track's edge is
  // sweeping over it, so the two always look like one movement.
  const dotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [index - 0.65, index - 0.25],
      [inactiveDotColor, activeDotColor],
    ),
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: stepSize, height: stepSize }}>
      <Animated.View
        style={[{ width: dotSize, height: dotSize, borderRadius: dotSize / 2 }, dotStyle]}
      />
    </View>
  );
};

export default Step;
