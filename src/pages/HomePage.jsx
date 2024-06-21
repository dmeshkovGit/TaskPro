import SideBar from '../components/SideBar/SideBar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../shared/components/Layout/Layout';
import MainContent from '../components/MainContent/MainContent';
import Text from '../components/Text/Text';
import { fetchBoards } from '../redux/board/operations.js';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchBoards());
    }
  }, [dispatch, isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <Layout>
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent toggleSidebar={toggleSidebar} content={<Text />} />
    </Layout>
  );
}
