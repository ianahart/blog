import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"


const PrimaryField = ({ name, type, value, text, helperText, handleOnChange }) => {
  return (
      <FormControl>
        <FormLabel htmlFor={name}>{ text }</FormLabel>
        <Input autoComplete="off" onChange={(e) => handleOnChange(name, e)} name={name} type={type} value={value} />
        <FormHelperText>{ helperText }</FormHelperText>
      </FormControl>
  )
}

export default PrimaryField;