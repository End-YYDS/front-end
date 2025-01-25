import { Logo, Close } from '@assets';
import { HomeIcon, CogIcon, ComputerDesktopIcon, CubeIcon, PowerIcon, UserIcon, ServerIcon, ClockIcon, ArrowDownTrayIcon, BookOpenIcon, ServerStackIcon, WrenchIcon, GlobeAltIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useState, FC } from 'react';
import { useDrag } from '@use-gesture/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentPage: (page: string) => void; // 新增 setCurrentPage props
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, setCurrentPage }) => {
  const bind = useDrag((state) => {
    const [x] = state.movement;
    const [vx] = state.velocity;
    if (state.last && vx > 0.1 && x < -10) {
      onClose();
    }
  });

  const [active, setActive] = useState('Dashboard');
  const [isServicesOpen, setServicesOpen] = useState(false); // 管理 services 子選單的展開
  const [isModulesOpen, setModulesOpen] = useState(false); // 管理 modules 子選單的展開
  const [isBootupOpen, setBootupOpen] = useState(false); // 管理 bootup & shutdown 子選單的展開
  const [isUsersOpen, setUsersOpen] = useState(false); // 管理 users & groups 子選單的展開
  const [isDiskOpen, setDiskOpen] = useState(false); // 管理 disk management 子選單的展開
  const [isCronOpen, setCronOpen] = useState(false); // 管理 cron management 子選單的展開
  const [isSoftwareOpen, setSoftwareOpen] = useState(false); // 管理 software package 子選單的展開
  const [isServersOpen, setServersOpen] = useState(false); // 管理 servers 子選單的展開
  const [isUtilsOpen, setUtilsOpen] = useState(false); // 管理 utils 子選單的展開
  const [isNetworksOpen, setNetworksOpen] = useState(false); // 管理 network 子選單的展開
  const [isHardwareOpen, setHardwareOpen] = useState(false); // 管理 hardware 子選單的展開

  const handlePageChange = (page: string) => {
    setActive(page);
    setCurrentPage(page); // 呼叫 setCurrentPage 改變主頁面內容
  };

  const style = {
    navStyle: 'flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 hover:text-white text-left',
    activeStyle: 'bg-gray-700 text-white',
    non_activeStyle: 'text-[#8F95A3]',
  };

  return (
    <div
      {...bind()}
      className={`fixed z-50 inset-y-0 left-0 p-4 text-white bg-navbar transform overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 md:static md:translate-x-0 md:w-80`}
    >
      <div className='flex items-center justify-between mx-4 mb-7'>
        <div className='flex items-center'>
          <img src={Logo} className='w-[75px] h-[75px] mr-2' alt='Logo' />
          <p className='text-6xl font-bold'>CHM</p>
        </div>
        <button className='ml-4 md:hidden' onClick={onClose}>
          <img src={Close} className='w-6 h-6' alt='Close' />
        </button>
      </div>
      <ul className='mx-9'>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Dashboard' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => handlePageChange('Dashboard')}
          >
            <HomeIcon className='w-5 h-5' />
            <span className='flex-grow'>Dashboard</span>
          </a>
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Services' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Services');
              setServicesOpen(!isServicesOpen); // 點擊 Services 時切換子選單的展開狀態
            }}
          >
            <CogIcon className='w-5 h-5' />
            <span className='flex-grow'>Services</span>
            <span>{isServicesOpen ? '▼' : '▶'}</span>
          </a>
          {isServicesOpen && (
            <div className="ml-4 mt-2 space-y-1">
              {['Backup', 'CHM Logs', 'Language', 'Configuration', 'Subsystem Authentication', 'Refresh Modules'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}

        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'CHM' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => handlePageChange('CHM')}
          >
            <ComputerDesktopIcon className='w-5 h-5' />
            <span className='flex-grow'>CHM</span>
          </a>
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Modules Configuration' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Modules Configuration');
              setModulesOpen(!isModulesOpen);
            }}
          >
            <CubeIcon className='w-5 h-5' />
            <span className='flex-grow'>Modules Configuration</span>
            <span>{isModulesOpen ? '▼' : '▶'}</span>
          </a>
          {isModulesOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['update exist modules'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Bootup & Shutdown' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Bootup & Shutdown');
              setBootupOpen(!isBootupOpen);
            }}
          >
            <PowerIcon className='w-5 h-5' />
            <span className='flex-grow'>Bootup & Shutdown</span>
            <span>{isBootupOpen ? '▼' : '▶'}</span>
          </a>
          {isBootupOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Process management'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Users & Groups' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Users & Groups');
              setUsersOpen(!isUsersOpen); // 點擊 Services 時切換子選單的展開狀態
            }}
          >
            <UserIcon className='w-5 h-5' />
            <span className='flex-grow'>Users & Groups</span>
            <span>{isUsersOpen ? '▼' : '▶'}</span>
          </a>
          {isUsersOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Users', 'Groups'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Disk Management' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Disk Management');
              setDiskOpen(!isDiskOpen);
            }}
          >
            <ServerIcon className='w-5 h-5' />
            <span className='flex-grow'>Disk Management</span>
            <span>{isDiskOpen ? '▼' : '▶'}</span>
          </a>
          {isDiskOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Mount & Unmount', 'Backup', 'Partitions', 'File Upload & Download'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Cron Management' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Cron Management');
              setCronOpen(!isCronOpen);
            }}
          >
            <ClockIcon className='w-5 h-5' />
            <span className='flex-grow'>Cron Management</span>
            <span>{isCronOpen ? '▼' : '▶'}</span>
          </a>
          {isCronOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Cron Jobs', 'Scheduled Commands'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Software Package' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Software Package');
              setSoftwareOpen(!isSoftwareOpen);
            }}
          >
            <ArrowDownTrayIcon className='w-5 h-5' />
            <span className='flex-grow'>Software Package</span>
            <span>{isSoftwareOpen ? '▼' : '▶'}</span>
          </a>
          {isSoftwareOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['APT', 'YUM & DNF', 'Pacman', 'zypper'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'System Logs' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => handlePageChange('System Logs')}
          >
            <BookOpenIcon className='w-5 h-5' />
            <span className='flex-grow'>System Logs</span>
          </a>
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Servers' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Servers');
              setServersOpen(!isServersOpen);
            }}
          >
            <ServerStackIcon className='w-5 h-5' />
            <span className='flex-grow'>Servers</span>
            <span>{isServersOpen ? '▼' : '▶'}</span>
          </a>
          {isServersOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Apache', 'BIND DNS', 'DHCP', 'SSH'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Utils' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Utils');
              setUtilsOpen(!isUtilsOpen);
            }}
          >
            <WrenchIcon className='w-5 h-5' />
            <span className='flex-grow'>Utils</span>
            <span>{isUtilsOpen ? '▼' : '▶'}</span>
          </a>
          {isUtilsOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Web Terminal', 'File Manager', 'Upload & Download', 'System & Server Status'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Networks' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Networks');
              setNetworksOpen(!isNetworksOpen);
            }}
          >
            <GlobeAltIcon className='w-5 h-5' />
            <span className='flex-grow'>Networks</span>
            <span>{isNetworksOpen ? '▼' : '▶'}</span>
          </a>
          {isNetworksOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['Firewall', 'Network Configuration'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className='mb-2'>
          <a
            href='#'
            className={`${style.navStyle} ${active === 'Hardware' ? style.activeStyle : style.non_activeStyle}`}
            onClick={() => {
              handlePageChange('Hardware');
              setHardwareOpen(!isHardwareOpen);
            }}
          >
            <CpuChipIcon className='w-5 h-5' />
            <span className='flex-grow'>Hardware</span>
            <span>{isHardwareOpen ? '▼' : '▶'}</span>
          </a>
          {isHardwareOpen && (
            <div className='ml-4 mt-2 space-y-1'>
              {['System Time'].map((subPage) => (
                <button
                  key={subPage}
                  className={`${style.navStyle} ${active === subPage ? style.activeStyle : style.non_activeStyle} w-full`}
                  onClick={() => handlePageChange(subPage)}
                >
                  {subPage}
                </button>
              ))}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
