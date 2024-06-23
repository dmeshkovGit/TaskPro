import SideBar from '../components/SideBar/SideBar';
import { useState, useEffect } from 'react';
import Layout from '../shared/components/Layout/Layout';
import MainContent from '../components/MainContent/MainContent';
import Text from '../components/Text/Text';
import { useDispatch } from 'react-redux';
import { resetCurrentBoard } from '../redux/board/slice';

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCurrentBoard());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <Layout>
      <SideBar />
      <MainContent toggleSidebar={toggleSidebar} content={<Text />} />
    </Layout>
  );
}
