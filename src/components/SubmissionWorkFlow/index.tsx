import { FormEvent, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  RiBookLine,
  RiUserLine,
  RiUser4Line,
  RiCheckLine,
} from 'react-icons/ri';

import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import { AdvisorStep } from './AdvisorStep';
import { AuthorStep } from './AuthorStep';
import { ConfirmationStep } from './ConfirmationStep';
import { WorkStep } from './WorkStep';

const steps = [
  { label: 'Obra', icon: RiBookLine, contentStep: <WorkStep /> },
  { label: 'Autores', icon: RiUserLine, contentStep: <AuthorStep /> },
  { label: 'Orientador', icon: RiUser4Line, contentStep: <AdvisorStep /> },
  {
    label: 'Confirmação',
    icon: RiCheckLine,
    contentStep: <ConfirmationStep />,
  },
];

export const SubmissionWorkFlow = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let isDataEmpty = true;

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const { title } = watch();

  if (title !== undefined) {
    const {
      abstract,
      course,
      date,
      keyWords,
      knowledge,
      locale,
      numPages,
      pdf,
      authors,
      advisor,
    } = watch();

    if (advisor !== undefined) {
      if (advisor !== '' && activeStep === 2) {
        isDataEmpty = false;
      }
    }

    if (authors !== undefined) {
      if (authors.length !== 0 && activeStep === 1) {
        isDataEmpty = false;
      }
    }

    if (
      abstract !== '' &&
      course !== '' &&
      date !== '' &&
      keyWords.length !== 0 &&
      knowledge !== '' &&
      locale !== '' &&
      numPages !== '' &&
      title !== '' &&
      pdf.length !== 0 &&
      activeStep === 0
    ) {
      isDataEmpty = false;
    }
  }

  function handlePrevStep(event: FormEvent) {
    if (activeStep === steps.length - 1) {
      onClose();
    }

    event.preventDefault();
    isDataEmpty = false;
    prevStep();
  }

  function handleNextStep(event: FormEvent) {
    if (activeStep === steps.length - 1) {
      onOpen();
    }

    event.preventDefault();
    isDataEmpty = true;
    nextStep();
  }

  return (
    <Flex flexDir="column" width="100%">
      <Steps colorScheme="green" activeStep={activeStep}>
        {steps?.map((step) => (
          <Step
            color="green.600"
            label={step.label}
            key={step.label}
            icon={step.icon}
          >
            {step?.contentStep}
          </Step>
        ))}
      </Steps>

      {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="gray.500">
                Diretrizes de Submissão
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text
                  textAlign="justify"
                  fontSize={['0.8rem', '0.9rem', '1rem']}
                >
                  Ao confirmar estará concordando que todos os dados submetidos
                  serão visíveis para o público em geral e será de total
                  responsabilidade do Instituto Federal Do Maranhão - Campus
                  Caxias, podendo o mesmo editá-lo ou excluí-lo.
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="gray"
                  mx="auto"
                  w={['80px', '100px', '120px']}
                  fontSize={['0.75rem', '0.9rem', '1rem']}
                  mr={3}
                  onClick={handlePrevStep}
                >
                  Cancelar
                </Button>
                <Button
                  mx="auto"
                  w={['80px', '100px', '120px']}
                  fontSize={['0.75rem', '0.9rem', '1rem']}
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}
                  form="form-details"
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={handlePrevStep}
            w={['80px', '100px', '120px']}
            fontSize={['0.75rem', '0.9rem', '1rem']}
            variant="ghost"
          >
            Voltar
          </Button>
          <Button
            isDisabled={activeStep === steps.length - 1 ? false : isDataEmpty}
            w={['80px', '100px', '120px']}
            fontSize={['0.75rem', '0.9rem', '1rem']}
            colorScheme="teal"
            onClick={handleNextStep}
          >
            {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
