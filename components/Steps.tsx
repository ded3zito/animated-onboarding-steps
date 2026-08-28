import { View, StyleSheet } from 'react-native';
import Step from './Step';
import type { Steps } from '../App';

type Props = {
  currentStep: number;
  steps: Steps;
}

const StepsComponent = ({steps, currentStep}: Props) => {
  return (
    <View style={styles.container}>
      {steps.map((item) => {
        return <Step key={item.id} selected={currentStep === item.id} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
})

export default StepsComponent;
