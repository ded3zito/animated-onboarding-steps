# Descrição

## O que é:

Projeto open source de um onboarding/flow tutorial customizado para React Native e Expo.

## O que fazer:

Mesclar o projeto de steps atual à um onboarding mais robusto.

A ideia é juntar o que já existe, com um novo componente principal chamado Onboarding. O componente de Onboarding precisa ser customizavel contendo as seguintes critérios e propriedades:

1. Componente principal chamado Onboarding.
2. O componente Onboarding irá conter os componentes de steps que ja existem.
3. Esse componente poderá receber um componente children (vamos dar o nome de StepContent). (vai ser a parte superior aos steps, renderizado no restante da tela, onde o usuário poderá inserir textos, imagens, etc).
4. O componente Onboarding também receberá as propriedades:
  - onComplete() -> Callback function que irá ser chamada no último passo.
  - onStepChange() => Callback function que irá ser chamada em cada passo.
  - onBack() => Callback function que irá ser chamada para voltar um passo.
  - steps => array de objetos que irão conter informações como: id, description, backButtonLabel, continueButtonLabel, finishButtonlabel.
  - content => Componente React com o conteúdo do onboarding.
  - backButtonColor => string com cor.
  - backButtonLabelColor => string com cor.
  - backButton => componente customizado (função retornando um componente React)
  - continueButtonColor => string com cor
  - continueLabelColor => string com cor
  - continueButton => componente customizado
