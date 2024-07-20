import React, { useState } from 'react';
import { MdInfo, MdWork, MdFeedback } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'

const CreateUser: React.FC = () => {
  const [image, setImage] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <></>
    // <Box p={4}>
    //   <Flex alignItems='stretch' flexDirection='row'>
    //     <Box width='20%' height='200px'>
    //       {image ? (
    //         <Image
    //           alt={'User Image'}
    //           src={image}
    //           width='100%'
    //           height='100%'
    //           borderRadius='md'
    //           objectFit='cover'
    //         />
    //       ) : (
    //         <Box
    //           as='label'
    //           htmlFor='upload-image'
    //           cursor='pointer'
    //           border='1px solid'
    //           borderColor='gray.200'
    //           borderRadius='md'
    //           p={2}
    //           width='100%'
    //           height='100%'
    //           textAlign='center'
    //           display='flex'
    //           alignItems='center'
    //           justifyContent='center'
    //         >
    //           Upload Image
    //           <Input
    //             type='file'
    //             accept='image/*'
    //             onChange={handleImageChange}
    //             display='none'
    //             id='upload-image'
    //           />
    //         </Box>
    //       )}
    //     </Box>
    //     <Divider orientation='vertical' mx={4} />
    //     <Box pl={4} width='80%'>
    //       <Stack spacing={3}>
    //         <Input placeholder='Full Name' size='md' />
    //         <Input placeholder='Designation' size='md' />
    //         <Input type='email' placeholder='Enter Email' size='md' />
    //       </Stack>
    //     </Box>
    //   </Flex>
    //   <Divider my={4} />
    //   <Flex alignItems='center'>
    //     <Box width='20%'>
    //       <Stack spacing={1} textAlign='right'>
    //         <Stack direction='row' spacing={1}>
    //           <Text>Rating 1</Text>
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //         </Stack>
    //         <Stack direction='row' spacing={1}>
    //           <Text>Rating 2</Text>
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='gray.300' />
    //         </Stack>
    //         <Stack direction='row' spacing={1}>
    //           <Text>Rating 3</Text>
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='gray.300' />
    //           <Icon as={FaStar} color='gray.300' />
    //         </Stack>
    //         <Stack direction='row' spacing={1}>
    //           <Text>Rating 4</Text>
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='gray.300' />
    //           <Icon as={FaStar} color='gray.300' />
    //           <Icon as={FaStar} color='gray.300' />
    //         </Stack>
    //         <Stack direction='row' spacing={1}>
    //           <Text>Rating 5</Text>
    //           <Icon as={FaStar} color='yellow.400' />
    //           <Icon as={FaStar} color='gray.300' />
    //           <Icon as={FaStar} color='gray.300' />
    //           <Icon as={FaStar} color='gray.300' />
    //           <Icon as={FaStar} color='gray.300' />
    //         </Stack>
    //       </Stack>
    //     </Box>
    //     <Box width='80%'>
    //       <Tabs>
    //         <TabList>
    //           <Tab
    //             _selected={{ color: 'white', bg: 'blue.500' }}
    //             display='flex'
    //             alignItems='center'
    //             justifyContent='center'
    //             width='calc(100% / 3)'
    //           >
    //             <MdInfo size={20} style={{ marginRight: '5px' }} /> About
    //           </Tab>
    //           <Tab
    //             _selected={{ color: 'white', bg: 'blue.500' }}
    //             display='flex'
    //             alignItems='center'
    //             justifyContent='center'
    //             width='calc(100% / 3)'
    //           >
    //             <MdWork size={20} style={{ marginRight: '5px' }} /> Experience
    //           </Tab>
    //           <Tab
    //             _selected={{ color: 'white', bg: 'blue.500' }}
    //             display='flex'
    //             alignItems='center'
    //             justifyContent='center'
    //             width='calc(100% / 3)'
    //           >
    //             <MdFeedback size={20} style={{ marginRight: '5px' }} /> Feedback
    //           </Tab>
    //         </TabList>
    //         <TabPanels>
    //           <TabPanel>
    //             <p>About details goes here!!</p>
    //           </TabPanel>
    //           <TabPanel>
    //             <p>Experience details goes here!!</p>
    //           </TabPanel>
    //           <TabPanel>
    //             <p>Feedback details goes here!!</p>
    //           </TabPanel>
    //         </TabPanels>
    //       </Tabs>
    //     </Box>
    //   </Flex>
    // </Box>
  )
}

export default CreateUser;
