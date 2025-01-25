import { useState } from 'react';

// 產生使用者
const generateUsers = () => {
  const statuses = ['green', 'red', 'yellow'];
  const users = [];
  
  for (let i = 1; i <= 100; i++) {
    const name = `uuuuUser${i}`;
    const status = statuses[i % 3]; // 循環分配狀態（green, red, yellow）
    users.push({ id: i, name, status });
  }

  return users;
};

export const users = generateUsers();
console.log(users);

const ITEMS_PER_PAGE = 24;

interface DashboardProps {
  onUserClick: (id: number) => void; // 點擊使用者按鈕時觸發的回調
}

const Dashboard: React.FC<DashboardProps> = ({ onUserClick }) => {
  const [sortAZ, setSortAZ] = useState(false);
  const [sortByLight, setSortByLight] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSortAZ = () => setSortAZ(!sortAZ);
  const toggleSortByLight = () => setSortByLight(!sortByLight);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortByLight) {
      const statusDiff = getStatusOrder(a.status) - getStatusOrder(b.status);
      if (statusDiff !== 0) return statusDiff;
    }
    if (sortAZ) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // 分頁邏輯
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='bg-white min-h-screen p-8 flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <div className='flex items-center space-x-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={sortAZ}
              onChange={toggleSortAZ}
              className='mr-2'
            />
            A-Z
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={sortByLight}
              onChange={toggleSortByLight}
              className='mr-2'
            />
            Light
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedUsers.map((user, index) => (
          <button
            key={index}
            onClick={() => onUserClick(user.id)} // 傳遞使用者 ID
            className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-md text-black"
            title={user.name} // todo 滑鼠移上時顯示完整名稱(還沒)
          >
            <span
              className="truncate w-[calc(100%-1.5rem)] text-left"
              style={{ maxWidth: "calc(100% - 1.5rem)" }} // 名字根據空間縮略
            >
              {user.name}
            </span>
            <span
              className={`w-3 h-3 rounded-full ${getStatusColor(user.status)}`}
            ></span>
          </button>
        ))}
      </div>
      
      <div className='mt-auto flex justify-between items-center pt-10'>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='bg-black text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          &lt; Prev page
        </button>
        <div className='mt-auto flex justify-center'>
          {/* Pagination Buttons */}
          {getPaginationButtons(currentPage, totalPages).map((page, index) => {
            if (typeof page === 'number') {
              // 顯示頁碼按鈕
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black'
                  } hover:bg-gray-400`}
                >
                  {page}
                </button>
              );
            } else if (page === '...') {
              // 顯示省略符號
              return (
                <span key={index} className='px-3 py-1 mx-1'>
                  ...
                </span>
              );
            }
          })}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='bg-black text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Next page &gt;
        </button>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'green':
      return 'bg-green-500';
    case 'yellow':
      return 'bg-yellow-500';
    case 'red':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusOrder = (status: string) => {
  switch (status) {
    case 'red':
      return 1;
    case 'yellow':
      return 2;
    case 'green':
      return 3;
    default:
      return 4;
  }
};

const getPaginationButtons = (currentPage: number, totalPages: number) => {
  const maxVisible = 3; // 固定顯示 3 個數字
  const halfVisible = Math.floor(maxVisible / 2);

  // 總頁數小於或等於 3，直接顯示所有頁數
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // 如果當前頁面靠近頭部，顯示 1, 2, 3, 4
  if (currentPage <= halfVisible + 1) {
    return [1, 2, 3, 4, '...'];
  }

  // 如果當前頁面靠近尾部，顯示 ... N-3, N-2, N-1, N
  if (currentPage >= totalPages - halfVisible) {
    return ['...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  // 如果當前頁面在中間，顯示 ... X-1, X, X+1
  return ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
};

export default Dashboard;
