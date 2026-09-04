import { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import Button from './Button';
import Steps from './Steps';
import { resolveStepsTheme } from './theme';
import type { OnboardingButtonProps, OnboardingProps } from './types';

const DEFAULT_BACK_LABEL = 'Back';
const DEFAULT_CONTINUE_LABEL = 'Continue';
const DEFAULT_FINISH_LABEL = 'Finish';

const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);

const Onboarding = ({
  steps,
  initialStep = 0,
  onComplete,
  onStepChange,
  onBack,
  stepsTheme,
  backButtonColor,
  backButtonLabelColor,
  backButton,
  continueButtonColor,
  continueButtonLabelColor,
  continueButton,
  style,
  contentStyle,
}: OnboardingProps) => {
  const lastIndex = Math.max(steps.length - 1, 0);
  const [currentStep, setCurrentStep] = useState(() => clamp(initialStep, lastIndex));

  const theme = useMemo(() => resolveStepsTheme(stepsTheme), [stepsTheme]);

  // Guard after the hooks so the hook order stays stable for every render.
  if (steps.length === 0) {
    return null;
  }

  const index = clamp(currentStep, lastIndex);
  const step = steps[index];
  const isFirstStep = index === 0;
  const isLastStep = index === lastIndex;

  const goToStep = (next: number) => {
    setCurrentStep(next);
    onStepChange?.(next, steps[next]);
  };

  const onPressContinue = () => {
    // The flow deliberately stays on the last step; where to go next is the
    // consumer's decision, made inside onComplete.
    if (isLastStep) {
      onComplete?.();
      return;
    }
    goToStep(index + 1);
  };

  const onPressBack = () => {
    if (isFirstStep) return;
    const previous = index - 1;
    onBack?.(previous, steps[previous]);
    goToStep(previous);
  };

  const continueLabel = isLastStep
    ? step.finishButtonLabel ?? DEFAULT_FINISH_LABEL
    : step.continueButtonLabel ?? DEFAULT_CONTINUE_LABEL;

  const sharedButtonProps = { currentStep: index, totalSteps: steps.length };

  const backProps: OnboardingButtonProps = {
    ...sharedButtonProps,
    label: step.backButtonLabel ?? DEFAULT_BACK_LABEL,
    onPress: onPressBack,
  };

  const continueProps: OnboardingButtonProps = {
    ...sharedButtonProps,
    label: continueLabel,
    onPress: onPressContinue,
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.content, contentStyle]}>{step.content}</View>

      <Steps steps={steps} currentStep={index} theme={theme} />

      <View style={styles.footer}>
        {!isFirstStep && (
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
            {backButton ? (
              backButton(backProps)
            ) : (
              <Button
                label={backProps.label}
                onPress={backProps.onPress}
                variant="secondary"
                backgroundColor={backButtonColor}
                labelColor={backButtonLabelColor}
              />
            )}
          </Animated.View>
        )}

        <Animated.View style={styles.primaryAction} layout={LinearTransition.duration(250)}>
          {continueButton ? (
            continueButton(continueProps)
          ) : (
            <Button
              label={continueProps.label}
              onPress={continueProps.onPress}
              backgroundColor={continueButtonColor}
              labelColor={continueButtonLabelColor}
            />
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '85%',
    marginTop: 20,
  },
  primaryAction: {
    flex: 1,
  },
});

export default Onboarding;
