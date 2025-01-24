'use client';

import { useParams } from 'next/navigation';
import PollDetails from '@/app/components/PollDetails';
import Link from 'next/link';

const PollDetailsPage = () => {
  const params = useParams();
  const pollId = params?.id as string;

  if (!pollId) {
    return <p className="text-red-500">Enquete inválida ou não encontrada.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Enquete</h1>
      <PollDetails pollId={pollId} />
      <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded">Voltar</Link>
    </div>
  );
};

export default PollDetailsPage;
