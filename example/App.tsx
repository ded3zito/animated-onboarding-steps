import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Onboarding, type OnboardingStep } from 'react-native-onboarding-steps';

const Slide = ({ title, body }: { title: string; body: string }) => (
  <View style={styles.slide}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.body}>{body}</Text>
  </View>
);

const steps: OnboardingStep[] = [
  {
    id: 'welcome',
    content: <Slide title="Welcome" body="A fully customizable onboarding flow for React Native and Expo." />,
  },
  {
    id: 'customize',
    content: <Slide title="Customize" body="Colors, sizes, spacing and the spring are all yours to override." />,
  },
  {
    id: 'ship',
    content: <Slide title="Ship it" body="Drop it into your app and wire up onComplete." />,
    finishButtonLabel: 'Get started',
  },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Onboarding
          steps={steps}
          onComplete={() => console.log('[example] onboarding complete')}
          onStepChange={(index) => console.log('[example] step ->', index)}
          onBack={(index) => console.log('[example] back ->', index)}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#696969',
    // Reserve two lines. A one-line body then occupies the same height as a
    // two-line one, so the slide does not shift as the step changes.
    minHeight: 44,
  },
});
