import { Button } from "@chakra-ui/react";
const SubmitButton = ({ handleSubmit }) => {


  return (
    <Button
      onClick={handleSubmit}
       _hover={{color: 'dark.secondary'}}
       backgroundColor="green.primary"
       color="#FFF"
       m={1}>
       Create
    </Button>
  )
}

export default SubmitButton;
