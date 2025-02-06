import { Sidebar, Navbar } from './components';
import Dashboard from './components/Dashboard.tsx'; // 引入 Dashboard 組件
import UserDetails from './components/UserDetails'; // 引入 UserDetails 組件
import Software from './components/Software';
import { useState } from 'react';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // 儲存目前選中的 User ID

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex h-screen relative'>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} setCurrentPage={setCurrentPage} />
      <div className='flex flex-col flex-1 w-full'>
        <Navbar onMenuClick={toggleSidebar} />
        <div className='flex-1 p-4 bg-gray-100 overflow-y-auto'>
          {currentPage === 'Dashboard' && (
            <Dashboard 
              onUserClick={(id: number) => {
                setCurrentUserId(id); // 設置選中使用者的 ID
                setCurrentPage('UserDetails'); // 切換到 UserDetails 頁面
              }}
            />
          )}
          {currentPage === 'UserDetails' && currentUserId !== null && (
            <UserDetails 
              userId={currentUserId} 
              onBack={() => setCurrentPage('Dashboard')} // 返回 Dashboard
            />
          )}
          {currentPage === 'Services' && (
            <div>
              <h1 className='mb-4 text-2xl font-bold'>Services</h1>
              <p>This is the Services page.</p>
            </div>
          )}
          {currentPage === 'Software Package' && <Software />}
        </div>
      </div>
    </div>
  );
};

export default App;
