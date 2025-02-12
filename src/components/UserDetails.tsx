import React, { useState, useEffect } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { users } from './Dashboard';


interface UserDetailsProps {
    userId: number; // 使用者 ID
    onBack: () => void; // 回調函數，返回上一頁
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, onBack }) => {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const fetchData = () => {
            const user = users.find((u) => u.id === userId); // 查找對應 userId 的用戶
            if (user) {
                setUsername(user.name);
            } else {
                setUsername("Unknown User");
            }
        };

        fetchData();
    }, [userId]); // 當 userId 改變時重新加載名稱

  const systemInfo = {
    cpu: 60,
    realMemory: 35,
    virtualMemory: 52,
    diskSpace: 72,
    details: {
      hostname: 'user_server (127.0.1.1)',
      webminVersion: '2.111',
      timeOnSystem: 'Sunday, May 19, 2024 2:00PM',
      uptime: '4 minutes',
      cpuLoad: '0.63(1 min) 0.49(5 mins) 0.23(15 mins)',
      virtualMemory: 'Virtual memory',
      packageUpdates: 'Package updates',
      os: 'Ubuntu Linux 22.04.2',
      themeVersion: '21.10',
      kernel: 'Linux 5.15.0-105-generic on aarch64',
      runningProcesses: 247,
      realMemoryUsage: '1.24 GiB used / 1.71 GiB cached / 3.81 GiB total',
      diskSpaceUsage: '28.81 GiB used / 21.54 GiB free / 50.35 GiB total',
    },
    recentLogins: [
      { ip: '127.0.0.1', lastActive: '05/16/2024 02:20 PM', state: 'This login' },
      { ip: '127.0.0.1', lastActive: '05/12/2024 02:30 PM', state: 'Logged out' },
    ],
    diskUsage: [
      { mountedAs: "/", type: "ext4", free: "42%(18.97GiB)\n83%(2608850 inodes)", used: "25.99 GiB\n569646 inodes", total: "80GB", deviceId: "/dev/disk/by-id/dm-uuid-LV-n..." },
      { mountedAs: "/boot", type: "ext4", free: "85%(1.53GiB)\n100%(130812 inodes)", used: "260.39 MiB\n260 inodes", total: "1.9 GiB\n131072 inodes", deviceId: "/dev/disk/by-uuid/16fe292e-6..." },
      { mountedAs: "/boot/efi", type: "vfat", free: "99%(1.04GiB)", used: "6.3 MiB", total: "1.04 GiB", deviceId: "/dev/disk/by-uuid/6674-0689" },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
            onClick={onBack}
            className="p-2 bg-gray-200 rounded hover:bg-gray-400 transition flex items-center justify-center"
        >
            <ArrowUturnLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold ml-4">
            ID-{userId} {username ? `(${username})` : "Loading..."}
        </h1>
      </div>

      {/* System Information */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="font-bold text-lg border-b pb-2 mb-4">System Information</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
            { label: 'CPU', value: systemInfo.cpu },
            { label: 'REAL MEMORY', value: systemInfo.realMemory },
            { label: 'VIRTUAL MEMORY', value: systemInfo.virtualMemory },
            { label: 'LOCAL DISK SPACE', value: systemInfo.diskSpace },
            ].map((item, index) => (
            <div
                key={index}
                className="flex flex-col items-center justify-center border p-4 rounded shadow"
            >
                {/* 外層圓形 */}
                <div
                className="relative w-20 h-20 flex items-center justify-center rounded-full"
                style={{
                    background: `conic-gradient(black ${item.value}%, #e5e7eb ${item.value}%)`, // 黑色與灰色漸層
                }}
                >
                    
                {/* 內層文字 */}
                <div className="absolute w-16 h-16 flex items-center justify-center bg-white rounded-full">
                    <span className="text-xl font-bold">{item.value}%</span>
                </div>
                </div>
                <span className="mt-2 text-sm font-medium">{item.label}</span>
            </div>
        ))}

        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div>
            <p>System hostname: {systemInfo.details.hostname || "N/A"}</p>
            <p>Webmin version: {systemInfo.details.webminVersion || "N/A"}</p>
            <p>Time on system: {systemInfo.details.timeOnSystem || "N/A"}</p>
            <p>System uptime: {systemInfo.details.uptime || "N/A"}</p>
            <p>CPU load averages: {systemInfo.details.cpuLoad || "N/A"}</p>
          </div>
          <div>
            <p>Operating system: {systemInfo.details.os || "N/A"}</p>
            <p>Authentic theme version: {systemInfo.details.themeVersion || "N/A"}</p>
            <p>Kernel and CPU: {systemInfo.details.kernel || "N/A"}</p>
            <p>Running processes: {systemInfo.details.runningProcesses || "N/A"}</p>
            <p>Real memory: {systemInfo.details.realMemoryUsage || "N/A"}</p>
            <p>Local disk space: {systemInfo.details.diskSpaceUsage || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Stats History */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="font-bold text-lg border-b pb-2 mb-4">Stats History</h2>
        <p className="text-gray-500">Loading...</p>
      </div>

      {/* Recent Logins */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="font-bold text-lg border-b pb-2 mb-4">Recent Logins</h2>
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">IP address</th>
              <th className="border px-4 py-2 text-left">Last active at</th>
              <th className="border px-4 py-2 text-left">State</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {systemInfo.recentLogins.map((login, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{login.ip || "N/A"}</td>
                <td className="border px-4 py-2">{login.lastActive || "N/A"}</td>
                <td className="border px-4 py-2">{login.state || "N/A"}</td>
                <td className="border px-4 py-2">
                  <button className="p-1 bg-gray-200 rounded text-xs hover:bg-gray-400 transition">
                    View logs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 p-2 bg-gray-200 rounded text-sm hover:bg-gray-400 transition">
          All sessions
        </button>
      </div>

      {/* Disk Usage */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="font-bold text-lg border-b pb-2 mb-4">Disk Usage</h2>
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Mounted As</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">Free</th>
              <th className="border px-4 py-2 text-left">Used</th>
              <th className="border px-4 py-2 text-left">Total</th>
              <th className="border px-4 py-2 text-left">Device ID</th>
            </tr>
          </thead>
          <tbody>
            {systemInfo.diskUsage.map((disk, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{disk.mountedAs || "N/A"}</td>
                <td className="border px-4 py-2">{disk.type || "N/A"}</td>
                <td className="border px-4 py-2">{disk.free
                    ? disk.free.split("\n").map((line: string, i: number) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : "N/A"}</td>
                <td className="border px-4 py-2">{disk.used
                  ? disk.used.split("\n").map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))
                : "N/A"}</td>
                <td className="border px-4 py-2">{disk.total
                  ? disk.total.split("\n").map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))
                : "N/A"}</td>
                <td className="border px-4 py-2">{disk.deviceId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
