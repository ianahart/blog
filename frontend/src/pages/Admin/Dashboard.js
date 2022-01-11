import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../../components/Admin/Dashboard/Header/index.jsx';
import Sidebar from '../../components/Admin/Dashboard/Sidebar/index.jsx';
import MainView from '../../components/Admin/Dashboard/MainView.jsx';
import BlogEditor from '../../components/Admin/Dashboard/Editor/index.jsx';
import YourPosts from '../../components/Admin/Dashboard/Posts/index.jsx';
import Settings from '../../components/Admin/Dashboard/Settings/index.jsx';
import Spinner from '../../components/Mixed/Spinner.jsx';

const Dashboard = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [curWindowWidth, setCurWindowWidth] = useState(window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);
    const [activeComp, setActiveComp] = useState('MainView');
    const dashboardPos = isSidebarVisible && curWindowWidth <= 768 ? 'row-reverse' : 'row';

    const handleActiveComp = (comp) => {(setActiveComp(comp))};
    const handleSidebarToggle = () => {(setIsSidebarVisible(!isSidebarVisible))};
    const handleSidebarClose = () => {(setIsSidebarVisible(false))};
    const handleIsLoading = (loading) => {(setIsLoading(loading))};

    useEffect(() => {
      const handleResize = (e) => {
        setCurWindowWidth(e.target.innerWidth)
        const isVisible = curWindowWidth <= 985 ? false : true;
        setIsSidebarVisible(isVisible)
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarVisible, curWindowWidth]);

    const dashboardViews = () => {
       switch(activeComp) {
         case 'MainView':
           return <MainView />
         case 'YourPosts':
           return <YourPosts />
         case 'BlogEditor':
           return  <BlogEditor handleIsLoading={handleIsLoading} handleActiveComp={handleActiveComp} />
         case 'Settings':
           return <Settings />
         default:
           return <MainView />
       }
    }



  return (
    <Box
      minHeight="100vh"
      height="100%"
      backgroundColor="light.primary"

    >
      <Header
        isSidebarVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />
      {
        isLoading ? (
          <Spinner size={100} loading={isLoading} />) : (
            <Box
              display="flex"
              flexDirection={[dashboardPos, dashboardPos, 'row']}
              minHeight="100%"
              width="100%"
              height="100%"
            >
              <Sidebar
                activeComp={activeComp}
                handleActiveComp={handleActiveComp}
                handleSidebarClose={handleSidebarClose}
                curWindowWidth={curWindowWidth}
                isSidebarVisible={isSidebarVisible}
              />
              { dashboardViews() }
            </Box>
        )
      }
    </Box>
  );
}
export default Dashboard;
