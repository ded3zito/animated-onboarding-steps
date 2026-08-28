import { Text, Pressable, StyleSheet } from 'react-native';

type ButtonProps = {
  label?: string;
  onPress: () => void;
}

const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: '70%',
    borderRadius: 100,
    backgroundColor: '#4382DF'
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F7F4ED',
  }
});


export default Button;
