import { Input, InputGroup, Icon } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
const SearchBar = ({
  icon = false,
  handleOnChange,
  value,
  role = 'reg',
  placeHolder,
  display,
  focus,
  border,
}) => {
  console.log(role);
  return (
    <>
      <InputGroup
        position="relative"
        display={display}
        width={role === 'reg' ? ['100%', '100%', '650px'] : '100%'}
      >
        {icon && (
          <Icon
            backgroundColor="rgba(4, 139, 168, 0.65)"
            color="light.primary"
            p={1.5}
            height="38px"
            width="37px"
            borderRadius={8}
            layerStyle="iconSm"
            right="0"
            top="1px"
            position="absolute"
            as={BsSearch}
          />
        )}
        <Input
          onChange={handleOnChange}
          value={value}
          _focus={focus}
          width="100%"
          variant="regular"
          autoComplete="off"
          outline="none"
          border={border}
          placeholder={placeHolder}
        />
      </InputGroup>
    </>
  );
};
export default SearchBar;
