import { createContext, ReactNode, useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

type HideAndShowHeaderContextData = {
  navIsOpen: boolean;
};

type HideAndShowHeaderProviderProps = {
  children: ReactNode;
};

export const HideAndShowHeaderContext = createContext(
  {} as HideAndShowHeaderContextData
);

export function HideAndShowHeaderProvider({
  children,
}: HideAndShowHeaderProviderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const {
    isOpen: navIsOpen,
    onClose: onNavClose,
    onOpen: onNavOpen,
  } = useDisclosure();

  const recordScrollPosition = () => {
    const lastPosition = scrollPosition;
    const currentPosition = window.pageYOffset;
    if (lastPosition < currentPosition && lastPosition > 100) {
      onNavClose();
    } else if (lastPosition > currentPosition) {
      onNavOpen();
    }
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', recordScrollPosition);
    return () => window.removeEventListener('scroll', recordScrollPosition);
  });

  useEffect(() => {
    onNavOpen();
  }, [onNavOpen]);

  return (
    <HideAndShowHeaderContext.Provider value={{ navIsOpen }}>
      {children}
    </HideAndShowHeaderContext.Provider>
  );
}
