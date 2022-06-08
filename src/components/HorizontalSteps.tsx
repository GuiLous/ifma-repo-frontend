import { RiBookLine } from 'react-icons/ri';

import { Button, Flex, Heading } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

const steps = [
  { label: 'Obra', icon: RiBookLine },
  { label: 'Verification', icon: RiBookLine },
  { label: 'Pay', icon: RiBookLine },
];

export const HorizontalSteps = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Flex flexDir="column" width="100%">
      <Steps bgColor="White" activeStep={activeStep}>
        {steps?.map((step) => (
          <Step
            bgColor="White"
            label={step.label}
            key={step.label}
            icon={step.icon}
          >
            {/* <Heading>Olá</Heading> */}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
