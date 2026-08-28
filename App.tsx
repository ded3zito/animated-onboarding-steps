import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, StepsComponent} from './components';

type Step = {
  id: number;
  name: string;
}

export type Steps = Step[];

const slides = [
  {
    id: 0,
    name: 'slide-00'
  },
  {
    id: 1,
    name: 'slide-01'
  },
  {
    id: 2,
    name: 'slide-02'
  },
]

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps] = useState<Steps>(slides);

  const onPressContinue = () => {
    setCurrentStep(prev => {
      if (prev === steps.length - 1) {
        return 0;
      }
      return prev + 1
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <StepsComponent steps={steps} currentStep={currentStep} />
			<Button label="Continue" onPress={onPressContinue} />
			<StatusBar style="auto" />
		</SafeAreaView>
		);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
});
