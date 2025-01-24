import React, { useState } from 'react';
import { Search, Ring, Down_Arrow, Menu } from '@assets';
import { User } from '@constants';

interface Notification {
  id: number; // 每個通知的唯一 ID
  content: string; // 通知內容
  isRead: boolean; // 是否已讀
}

interface NavbarProps {
  onMenuClick: () => void; // 添加一个用于点击菜单按钮的 props
}
const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {

  const [profileOpen, setProfileOpen] = useState(false); // 右上使用者名稱點擊事件
  const [notificationsOpen, setNotificationsOpen] = useState(false); // 控制通知彈出框顯示
  const [notifications, setNotifications] = useState<Notification[]>([  // 初始通知
    { id: 1, content: '模擬通知1', isRead: false },
    { id: 2, content: '模擬通知2', isRead: false },
    { id: 3, content: '模擬通知3', isRead: false },
    { id: 4, content: '模擬通知4', isRead: false },
    { id: 5, content: '模擬通知5', isRead: false },
    { id: 6, content: '模擬通知6', isRead: false },
  ]);

  return (
    <nav className='flex items-center justify-between p-5 bg-white shadow-md h-[60px]'>
      {/* 左：siebar按鈕&搜尋框 */}
      <div className='flex items-center flex-grow max-w-lg sm:w-auto'>
        <button className='ml-auto mr-2 md:hidden' onClick={onMenuClick}>
          <img src={Menu} className='w-[30px] h-[30px]' alt='Menu' />
        </button>
        <img src={Search} className='w-[20px] h-[20px] mr-[10px]' />
        <input
          type='text'
          placeholder='Search...'
          className='flex-grow p-2 mr-[10px] bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
        />
      </div>

      {/* 右：通知&個人資料 */}
      <div className='flex items-center space-x-3 sm:space-x-10'>
        <button onClick={() => {
        if (profileOpen) {
          setProfileOpen(false);
        }
          setNotificationsOpen(!notificationsOpen)}} className="relative">
          <img src={Ring} className='w-[20px] h-[20px]' />
          {notifications.length > 0 && (
            <span className="absolute top-0 -right-1 text-xs text-white bg-red-500 rounded-full w-3 h-3 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        
        <div className='flex items-center'>
          <button
            className='flex items-center cursor-pointer'
            onClick={() => {setProfileOpen(!profileOpen);
              if (notificationsOpen) {
                setNotificationsOpen(false); // 當 profile 彈出框開啟時關閉通知框
              }
            }}
          >
            <span className='mr-[2px] text-black text-xs sm:text-base'>{User.name}</span>
            <img src={Down_Arrow} className='object-contain w-8 h-8' />
          </button>
        </div>

        {/* 顯示通知彈出框 */}
        {notificationsOpen && (
          <div className="absolute right-10 z-50 sm:right-36 top-14 bg-white bg-opacity-95 border border-gray-200 rounded-lg shadow-lg w-48 max-h-64 overflow-y-auto">
            <ul>
              {notifications.map((notification, index) => (
                <React.Fragment key={index}>
                <li
                  key={notification.id}
                  className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
                    notification.isRead ? 'text-gray-400' : 'text-black'
                  }`}

                  onClick={() => {
                    setNotifications((prevNotifications) =>
                      prevNotifications.map((n) =>
                        n.id === notification.id ? { ...n, isRead: true } : n
                      )
                    );
                  }}
                >
                <span>{notification.content}</span>
                  
                <button
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation(); // 防止點擊叉叉觸發外層的 onClick
                    setNotifications((prevNotifications) =>
                      prevNotifications.filter((n) => n.id !== notification.id)
                    );
                  }}
                >
                  ×
                </button>
                </li>
                {index < notifications.length - 1 && (
                  <div className="border-t border-gray-300 mx-2" />
                )}
                </React.Fragment>
              ))}
              {notifications.length === 0 && (
                <li className="p-3 text-center text-gray-500">沒有新的通知</li>
              )}
            </ul>
          </div>
        )}

        {/* 顯示使用者名稱彈出框 */}
        {profileOpen && (
          <div className='absolute right-4 z-50 top-14 bg-white bg-opacity-95 border border-gray-200 rounded-lg shadow-lg w-36'>
            <ul>
              <li
                className='p-3 hover:bg-gray-100 cursor-pointer'
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                個人資料
              </li>
              <div className='border-t border-gray-300 mx-2' /> {/* 分隔線 */}
              <li
                className='p-3 hover:bg-gray-100 cursor-pointer text-red-500'
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                登出
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
