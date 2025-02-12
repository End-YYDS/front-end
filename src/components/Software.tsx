import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  Square2StackIcon,
  LinkIcon,
  InboxArrowDownIcon,
  ArrowPathIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Tree } from '@assets';

const SearchInput = ({
  placeholder,
  onChange,
  className,
}: {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => (
  <input
    type='text'
    placeholder={placeholder || ''}
    className={`w-96 p-2 border ${className || ''}`}
    onChange={onChange}
  />
);

const Button = ({
  children,
  onClick,
  color,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`mt-4 px-4 py-2 rounded-md font-semibold flex items-center justify-center transition hover:opacity-90 ${className || ''} ${
      color === 'green'
        ? 'bg-green-500 text-white'
        : color === 'blue'
          ? 'bg-blue-500 text-white'
          : color === 'red'
            ? 'bg-red-500 text-white'
            : 'bg-white border'
    }`}
  >
    {children}
  </button>
);

const PackageCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className='p-4 rounded-lg'>
    <h2 className='mb-3 text-lg font-semibold'>{title}</h2>
    {children}
  </div>
);

export default function SoftwarePackage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  return (
    <div className='p-0'>
      <div className='flex items-center justify-center w-full h-16 mb-6 bg-head_gray'>
        <h1 className='text-xl font-bold'>Software Package</h1>
      </div>
      <PackageCard title='Installed Packages'>
        <div className='flex'>
          <div className='flex items-center p-2 w-44 bg-head_gray'>
            <MagnifyingGlassIcon className='w-4 h-4 mr-2' />
            <p className='text-sm font-bold'>Search For Package</p>
          </div>
          <SearchInput onChange={handleSearch} className='mr-2' />
          <button
            onClick={() => alert('View Package Tree')}
            className={`border bg-white px-4 py-2 rounded-md font-semibold flex items-center justify-center transition hover:opacity-90 ml-auto`}
          >
            <img src={Tree} className='w-4 h-4 mr-2' alt='Tree' />
            Package Tree
          </button>
        </div>
      </PackageCard>

      <PackageCard title='Install a New Package'>
        <p className='mb-4'>Select the location to install a new package</p>
        <div className='flex items-center gap-4 mb-4'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            <p className='mr-4'>From local file</p>
            <SearchInput onChange={handleSearch} />
            <button
              onClick={() => alert('View file')}
              className={`border bg-white px-4 py-2 font-semibold flex items-center justify-center transition hover:opacity-90`}
            >
              <Square2StackIcon className='w-5 h-6' />
            </button>
          </label>
        </div>
        <div className='flex items-center gap-4 mb-4'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            <p className='mr-4'>From uploaded file</p>
            <button
              onClick={() => alert('View file')}
              className={`border bg-white px-4 py-2 font-semibold flex items-center justify-center transition hover:opacity-90`}
            >
              <LinkIcon className='w-5 h-6' />
            </button>
          </label>
        </div>
        <Button onClick={() => alert('Install Package')} color='green'>
          <InboxArrowDownIcon className='w-5 h-5 mr-2' />
          Install
        </Button>
      </PackageCard>

      <PackageCard title='Update Packages'>
        <div className='flex'>
          <div className='flex items-center p-2 w-44 bg-head_gray'>
            <MagnifyingGlassIcon className='w-4 h-4 mr-2' />
            <p className='text-sm font-bold'>Search For Package</p>
          </div>
          <SearchInput onChange={handleSearch} />
          <button
            onClick={() => alert('View Package Tree')}
            className={`border bg-white px-4 py-2 rounded-md font-semibold flex items-center justify-center transition hover:opacity-90 ml-auto`}
          >
            <img src={Tree} className='w-4 h-4 mr-2' alt='Tree' />
            Package Tree
          </button>
        </div>
        <Button onClick={() => alert('Update Package')} color='blue'>
          <ArrowPathIcon className='w-5 h-5 mr-2' />
          Update Now
        </Button>
      </PackageCard>

      <PackageCard title='Delete Packages'>
        <div className='flex'>
          <div className='flex items-center p-2 w-44 bg-head_gray'>
            <MagnifyingGlassIcon className='w-4 h-4 mr-2' />
            <p className='text-sm font-bold'>Search For Package</p>
          </div>
          <SearchInput onChange={handleSearch} />
          <button
            onClick={() => alert('View Package Tree')}
            className={`border bg-white px-4 py-2 rounded-md font-semibold flex items-center justify-center transition hover:opacity-90 ml-auto`}
          >
            <img src={Tree} className='w-4 h-4 mr-2' alt='Tree' />
            Package Tree
          </button>
        </div>
        <Button onClick={() => alert('Delete Package')} color='red'>
          <TrashIcon className='w-5 h-5 mr-2' />
          Delete
        </Button>
      </PackageCard>
    </div>
  );
}
