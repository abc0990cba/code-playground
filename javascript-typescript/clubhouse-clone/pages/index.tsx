import React from 'react';
import {
  ChooseAvatarStep,
  EnterCodeStep,
  EnterNameStep,
  EnterPhoneStep,
  TwitterStep,
  WelcomeStep,
} from '../components/steps';

const stepsComponent = {
  0: WelcomeStep,
  1: EnterNameStep,
  2: TwitterStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

type MainContextProps = {
  onNextStep: () => void;
  step: number;
};

export const MainContext = React.createContext<MainContextProps>(
  {} as MainContextProps
);

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const Step = stepsComponent[step];
  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <MainContext.Provider value={{ step, onNextStep }}>
      <Step />
    </MainContext.Provider>
  );
}
