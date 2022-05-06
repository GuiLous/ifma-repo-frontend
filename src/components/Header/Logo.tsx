import { Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export function Logo() {
  return (
    <NextLink href="/" passHref>
      <Link>
        <Image
          w={['120px', '170px', '240px']}
          src="/images/logo.png"
          alt="Logo com nome IFMA"
        />
      </Link>
    </NextLink>
  );
}
