import { Text, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  label?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  /** Overrides the variant's background. */
  backgroundColor?: string;
  /** Overrides the variant's label colour. */
  labelColor?: string;
  style?: StyleProp<ViewStyle>;
};

const Button = ({
  label,
  onPress,
  variant = 'primary',
  backgroundColor,
  labelColor,
  style,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        backgroundColor ? { backgroundColor } : null,
        style,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, styles[`${variant}Text`], labelColor ? { color: labelColor } : null]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 100,
    paddingHorizontal: 28,
  },
  pressed: {
    opacity: 0.7,
  },
  primary: {
    backgroundColor: '#4382DF',
  },
  secondary: {
    backgroundColor: '#F1F1F1',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  primaryText: {
    color: '#F7F4ED',
  },
  secondaryText: {
    color: '#1C1C1E',
  },
});

export default Button;
