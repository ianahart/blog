 import { Link, Text, Heading, OrderedList, ListItem, UnorderedList } from '@chakra-ui/react';
 import ImageElement from './ImageElement';

 const Element = ({ attributes, children, element }) => {

    switch (element.type) {
      case 'link':
        return <Link as="a" onClick={() => { window.open(element.href, '_blank') }} color="blue" textDecoration="underline" href={element.href}  {...attributes}>{children}</Link>
      case 'paragraph':
        return <Text as="p"  {...attributes}>{children}</Text>
      case 'heading-one':
       return <Heading as="h1" size="3xl" {...attributes}>{children}</Heading>
      case 'heading-two':
        return <Heading as="h2" size="2xl" {...attributes}>{children}</Heading>
      case 'heading-three':
        return <Heading as="h3" size="xl" {...attributes}>{children}</Heading>
      case 'heading-four':
        return <Heading as="h4" size="lg" {...attributes}>{children}</Heading>
      case 'heading-five':
        return <Heading as="h5" size="md" {...attributes}>{children}</Heading>
      case 'heading-six':
        return <Heading as="h6" size="sm" {...attributes}>{children}</Heading>
      case 'list-item':
        return <ListItem {...attributes}>{children}</ListItem>
      case 'numbered-list':
        return <OrderedList {...attributes}>{children}</OrderedList>
      case 'bulleted-list':
        return <UnorderedList {...attributes}>{children}</UnorderedList>
      case 'image':
        return <ImageElement
                attributes={attributes}
                children={children}
                element={element}>
          </ImageElement>
      default:
        return <Text as="p" {...attributes}>{children}</Text>
    }
  }

  export default Element;