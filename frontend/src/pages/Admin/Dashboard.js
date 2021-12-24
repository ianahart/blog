import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../../components/Admin/Dashboard/Header/index.jsx';
import Sidebar from '../../components/Admin/Dashboard/Sidebar/index.jsx';
import MainView from '../../components/Admin/Dashboard/MainView.jsx';

const Dashboard = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [curWindowWidth, setCurWindowWidth] = useState(window.innerWidth);
    const dashboardPos = isSidebarVisible && curWindowWidth <= 768 ? 'row-reverse' : 'row';

    const handleSidebarToggle = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
      const handleResize = (e) => {
        setCurWindowWidth(e.target.innerWidth)
        const isVisible = curWindowWidth <= 768 ? false : true;
        setIsSidebarVisible(isVisible)
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarVisible, curWindowWidth]);


  return (
    <Box
      minHeight="100vh"
      height="100%"
      backgroundColor="light.primary"
    >
      <Header isSidebarVisible={isSidebarVisible} handleSidebarToggle={handleSidebarToggle} />
      <Box
        display="flex"
        flexDirection={[dashboardPos, dashboardPos, 'row']}
        minHeight="100%"
        height="100%"
      >
        <Sidebar curWindowWidth={curWindowWidth} isSidebarVisible={isSidebarVisible} />
        <MainView />
      </Box>
    </Box>
  );
}
export default Dashboard;