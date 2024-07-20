import React from 'react'
import Image1 from './../Images/image1.png'
import grouth from './../Images/grouth.png'
import speed from './../Images/speed.png'
import req from './../Images/req.png'
import './Home.css'
const Home: React.FC = () => {
  return (
    <>

      <div className="hero-container" id="hero-sec">
        <div className="container-fluid ">
          <div className="row d-flex">
            <div className="col align-middle">
              <div className="px-2 py-2">
                <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" className="img-fluid" alt="..." />
              </div>
            </div>
            <div className="col">
              <div className="px-5 py-5 mt-5">
                <div className="px-2 py-2 align-middle">
                  <h4>            Welcome to Quantlytix
                  </h4>
                  <p>  We're thrilled to have you here. Our team of experts is committed to understanding your
                    unique needs and delivering tailored solutions that exceed your expectations.
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col item">
              <img src={req} className="card-img-top" style={{ width: "100px" }} alt="..." />

              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <div className="card-body">
                  <h5 className="card-title">Recruitment</h5>
                  <p className="card-text">  Empowering businesses with top-tier talent, one hire at a time. Discover your
                    next star employee with our expert recruitment services.</p>
                </div>
              </div>
            </div>
            <div className="col item ">
              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <img src={speed} className="card-img-top" style={{ width: "100px" }} alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Speed</h5>
                  <p className="card-text">  Accelerating your recruitment process with precision and efficiency. Streamline
                    hiring and secure top talent faster than ever before. </p>
                </div>
              </div>
            </div>
            <div className="col item">
              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <div>
                  <img src={grouth} className="card-img-top" style={{ width: "100px" }} alt="..." />
                  <h5 className="card-title">Growth</h5>
                </div>
                <div className="card-body">
                  <p className="card-text"> Fuel your organization's rapid expansion with our agile recruitment strategies.
                    Harnessing speed and precision to propel your team towards unparalleled success.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={8}
        align='center'
        justify='center'
        p={8}
      >
        <Flex
          flex='1'
          flexDirection='column'
          alignItems={{ base: 'center', md: 'flex-start' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text as='b' fontSize={{ base: '3xl', md: '5xl' }} mb={4}>
            Welcome to Quantlytix
          </Text>
          <Text
            mt={20}
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight='medium'
            lineHeight='taller'
          >
            We're thrilled to have you here. Our team of experts is committed to understanding your
            unique needs and delivering tailored solutions that exceed your expectations.
          </Text>
        </Flex>
        <Flex flex='1' justifyContent='center'>
          <Image
            boxSize={{ base: '400px', md: '400px' }}
            objectFit='cover'
            src={Image1}
            alt='Quantlytix'
          />
        </Flex>
      </Stack>
      <Flex
        flex='1'
        flexDirection='row'
        alignItems={{ base: 'center', md: 'flex-start' }}
        textAlign={{ base: 'center', md: 'left' }}
        pl={{ base: '20px', md: '0' }}
        pr={{ base: '20px', md: '0' }}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} p={{ base: '20px', md: '0' }}>
          <Stack>
            <Heading size='lg' pl={{ base: '0px', md: '30px' }}>
              Recruitment
            </Heading>
            <Card
              bg='#FCD19C'
              borderRadius='xl'
              height='100%'
              p={6}
              ml={{ base: 0, md: 6 }}
              mr={{ base: 4, md: 0 }}
            >
              <CardBody>
                <Stack mt='6' spacing='3'>
                  <Text fontSize='lg'>
                    Empowering businesses with top-tier talent, one hire at a time. Discover your
                    next star employee with our expert recruitment services.
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
          <Stack>
            <Heading size='lg'>Speed</Heading>
            <Card bg='#FCD19C' borderRadius='xl' height='100%' p={6}>
              <CardBody>
                <Stack mt='6' spacing='3'>
                  <Text fontSize='lg'>
                    Accelerating your recruitment process with precision and efficiency. Streamline
                    hiring and secure top talent faster than ever before.
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
          <Stack>
            <Heading size='lg'>Growth</Heading>
            <Card
              bg='#FCD19C'
              borderRadius='xl'
              height='100%'
              p={6}
              ml={{ base: 6, md: 0 }}
              mr={{ base: 0, md: 4 }}
            >
              <CardBody>
                <Stack mt='6' spacing='3'>
                  <Text fontSize='lg'>
                    Fuel your organization's rapid expansion with our agile recruitment strategies.
                    Harnessing speed and precision to propel your team towards unparalleled success.
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </SimpleGrid>
      </Flex> */}
    </>
  )
}

export default Home
