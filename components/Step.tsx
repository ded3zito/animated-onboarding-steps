import { View, StyleSheet } from 'react-native';

type StepProps = {
  selected?: boolean;
}

const Step = ({ selected = false }: StepProps) => {
  if (selected) {
    return (
      <View style={styles.outSelected}>
        <View style={styles.selected} />
      </View>
    )
  }
  return (
    <View style={styles.outUnselected}>
      <View style={styles.unselected} />
    </View>
  )
}

const styles = StyleSheet.create({
  outUnselected: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  unselected: {
    borderRadius: '100%',
    width: 12,
    height: 12,
    backgroundColor: '#696969'
  },
  outSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    backgroundColor: '#7ADAA5',
    borderRadius: '100%',
  },
  selected: {
    borderRadius: '100%',
    width: 12,
    height: 12,
    backgroundColor: '#fff',
  },
})

export default Step;
