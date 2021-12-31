import { Button, Icon, Input} from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import ToolTip from './ToolTip';


const ImageButton = ({ format, icon, toolTip }) => {
  const editor = useSlate();
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return ['image'].includes(element.type) || isVoid(element);
  }

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (() => resolve(reader.result));
      reader.onerror = ((err) => reject(err));
    });
  }

  const packageImage = (url, caption) => {
    if (!url) return;
    return [
      {
        type: 'image',
        url,
        caption,
        children: [{ text: '' }],
      },
      {
        type: 'paragraph',
        children: [{ text: '' }],
      }
    ];
  }

  const insertImage = (editor, url, caption) => {
    const imageNode = packageImage(url, caption);
    Transforms.insertNodes(editor, imageNode);
  }

  const handleOnChange = async (e) => {
    const [file] = e.target.files;
    if (file > 2000000) {
      console.log('File size is too big');
      return;
    } else {
      const result = await toBase64(file);
      if(result instanceof Error) {
        console.log('Error: ', result.message);
        return;
   }
      insertImage(editor, result, file.name);
      e.target.value = '';
    }
  };

  return (
    <ToolTip top="-40px" right="5px" label={toolTip}>
      <Button
        position="relative"
        m={2}
        _hover={{backgroundColor: 'none'}}
      >
        <Icon as={icon}></Icon>
        <Input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleOnChange}
          position="absolute"
          opacity={0}
          top={0}
          lef={0}
          width="100%"
          height="100%"
        />
      </Button>
    </ToolTip>
  )
}

export default ImageButton;