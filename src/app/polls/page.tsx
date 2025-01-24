'use client';

import PollList from '@/app/components/PollList';
import Link from 'next/link';

const PollsListPage = () => {
  return (
    <div>
      <PollList />
      <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded">Voltar</Link>
    </div>
  );
};

export default PollsListPage;
