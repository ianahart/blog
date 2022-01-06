import { Button, Icon, Input} from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { nanoid } from 'nanoid';
import ToolTip from './ToolTip';
import { useState } from 'react';


const ImageButton = ({ format, icon, toolTip }) => {
  const editor = useSlate();
  const { isVoid } = editor;
  const [fileSize, setFileSize] = useState(0);

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

  const packageImage = (url, file, id) => {
    if (!url) return;
    return [
      {
        type: 'image',
        id,
        textAlign: 'center',
        url,
        contentType: file.type,
        caption: file.name,
        children: [{ text: '' }],
      },
      {
        type: 'paragraph',
        children: [{ text: '' }],
      }
    ];
  }

  const insertImage = (editor, url, file, id) => {
    const imageNode = packageImage(url, file, id);
    Transforms.insertNodes(editor, imageNode);
  }

  const handleOnChange = async (e) => {
    const [file] = e.target.files;
    setFileSize(file.size);
    if (file.size > 2000000) {
      return;
    } else {
      const result = await toBase64(file);
      if(result instanceof Error) {
        console.log('Error ImageButton.jsx: ', result.message);
        return;
   }
      const id = nanoid();
      insertImage(editor, result, file, id);
      e.target.value = '';
      setFileSize(0);
    }
  };

  return (
    <ToolTip top="-40px" right="5px" label={fileSize > 2000000 ? 'Image is too big' : toolTip}>
      <Button
        position="relative"
        m={2}
        _hover={{backgroundColor: 'none'}}
      >
        <Icon as={icon}></Icon>
        <Input
          type="file"
          multiple
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