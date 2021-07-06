import React from 'react';
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';

export default function SideItem({ name, icon, title, navSize }) {
  const pathname = useLocation().pathname.split('/')[1];
  const active = pathname === name;
  const history = useHistory();

  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
      onClick={() => history.push(`/${name}`)}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && 'brand.400'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'brand.300' }}
          w={navSize === 'large' && '100%'}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? 'gray.50' : 'gray.300'}
              />
              <Text
                color="whiteAlpha.900"
                ml={5}
                display={navSize === 'small' ? 'none' : 'flex'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
