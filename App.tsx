import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
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

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const onPressContinue = () => {
    setCurrentStep(prev => {
      if (prev === steps.length - 1) {
        return 0;
      }
      return prev + 1
    });
  }

  const onPressBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StepsComponent steps={steps} currentStep={currentStep} />
			<View style={styles.footer}>
				{!isFirstStep && (
					<Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
						<Button label="Back" variant="secondary" onPress={onPressBack} />
					</Animated.View>
				)}
				<Animated.View style={styles.primaryAction} layout={LinearTransition.duration(250)}>
					<Button label={isLastStep ? 'Finish' : 'Continue'} onPress={onPressContinue} />
				</Animated.View>
			</View>
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
    paddingBottom: '10%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '85%',
  },
  primaryAction: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
});
