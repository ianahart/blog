  import { Box, Image, Icon, Input } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useSlate, ReactEditor, useReadOnly } from 'slate-react';
  import { Editor, Transforms } from 'slate';
  import { BiTrash } from 'react-icons/bi';
  import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai'
  import ImageAlignmentButton from './ImageAlignmentButton';

const ImageElement = ({ attributes, children, element }) => {
  const editor = useSlate();
  const [isEditingCaption, setEditingCaption] = useState(false);
  const [isTrashShowing, setIsTrashShowing] = useState(false);
  const isReadOnly = useReadOnly();
  const [caption, setCaption] = useState(element.caption);
  const [imageAlignment, setImageAlignment] = useState(element.textAlign || 'center');
  const path = ReactEditor.findPath(editor, element);

  const handleOnBlur = (e) => {
    setEditingCaption(false);
    update('caption', caption);
  }

  const handleOnKeyDown = (e) => {
    const exitKeys = [27, 13];
    if (exitKeys.includes(e.keyCode)) {
      if (e.keyCode === 13) {
        update('caption', caption);
      }
      setEditingCaption(false);
    }
  }

  const removeImage = (editor, element) => {
    Transforms.removeNodes(editor, {
      at: path
    });
    setCaption(element.caption);
  }

  const handleClickRemove = (e) => {
    e.stopPropagation();
    removeImage(editor, element);
    setIsTrashShowing(false);
  }

  const update = (prop, value) => {
     const imageNode = Editor.above(editor, {
          at: editor.selection,
          match: (n) => !Editor.isEditor(n) && n.type === 'image'
        });

    if (!imageNode) return;
    Transforms.setNodes(editor,
      { [prop] : value },
      { at: imageNode[1] }
    );
  }
  const handleClickEdit = (e) => {
    if (isReadOnly) return;
    e.stopPropagation();
    setEditingCaption(true);
  }

  const handleClickTrashToggle = (e) => {
    if (isReadOnly) return;
    e.stopPropagation();
    const isShowing = !isTrashShowing;
    setIsTrashShowing(isShowing);

  }

  const handleOnChange = (e) => {
    setCaption(e.target.value);
  }

  const handleClickAlignment = (type) => {
    setImageAlignment(type);
    update('textAlign', type);
  }

  const alignmentValues= {
    left: '0 0 0 0',
    right: '0 0 0 auto',
    center: '0 auto 0 auto',
  };

   return (
          <Box margin={alignmentValues[imageAlignment]} width={['70%', '70%', '400px', '60%']} maxWidth={'600px'}>
            <Box
              position="relative"
              as="div"
              {...attributes}
              contentEditable={false}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                margin="0 auto" position="relative">
                <Image
                  src={String(element.url)}
                  alt={element.caption}
                  width="100%"
                  borderRadius={4}
                />
                 <Box
                    onClick={handleClickTrashToggle}
                    zIndex={1}
                    position="absolute"
                    width="100%"
                    borderRadius={4}
                    height="100%"
                    top="0"
                    left="0"
                    backgroundColor={ isTrashShowing ? 'rgba(0, 0,0,0.4)': 'transparent'}>
                    {isTrashShowing &&
                      <Box justifyContent="flex-end" display="flex">
                        <ImageAlignmentButton
                          handleClickAlignment={handleClickAlignment}
                          label="Align Left"
                          type="left" i
                          icon={AiOutlineAlignLeft} />
                        <ImageAlignmentButton
                          handleClickAlignment={handleClickAlignment}
                          label="Align Center"
                          type="center"
                          icon={AiOutlineAlignCenter} />
                        <ImageAlignmentButton
                          handleClickAlignment={handleClickAlignment}
                          label="Align Right"
                          type="right"
                          icon={AiOutlineAlignRight} />
                      </Box>
                    }
                </Box>
                {isTrashShowing &&
                  <Icon
                    onClick={handleClickRemove}
                    position="absolute"
                    top="5px"
                    zIndex={3}
                    left="10px"
                    height="30px"
                    width="30px"
                    cursor="pointer"
                    p={0.5}
                    borderRadius={3}
                    backgroundColor="light.primary"
                    color="dark.primary"
                    as={BiTrash}>
                </Icon>
                }
              </Box>
                {!isEditingCaption &&
                  <Box
                    onClick={handleClickEdit}
                    textAlign="center"
                    fontWeight="bold"
                    color="dark.secondary"
                    fontSize="10">{caption}
                  </Box>
                }
                { isEditingCaption &&
                  <Input
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onBlur={handleOnBlur}
                    display="flex"
                    justifyContent="center"
                    margin="0 auto"
                    width={['80%', '50%', '50%']}
                    value={caption}/>
                }
            {children}
            </Box>
          </Box>
      )
}

export default ImageElement;