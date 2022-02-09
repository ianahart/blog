import { Input, InputGroup, Icon } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({
  icon = false,
  handleOnChange,
  value,
  placeHolder,
  display,
  focus,
  border,
}) => {
  return (
    <InputGroup position="relative" display={display} width={['100%', '650px', '650px']}>
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
  );
};
export default SearchBar;
