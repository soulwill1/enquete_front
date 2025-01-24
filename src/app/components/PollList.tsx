'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Definição de tipos para as enquetes
interface Poll {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

const PollList = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/api/v1/polls')
      .then((res) => res.json())
      .then(setPolls)
      .catch(console.error);
  }, []);

  const getStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'Não iniciada';
    if (now > end) return 'Encerrada';
    return 'Em andamento';
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enquetes Disponíveis</h1>
      <ul className="space-y-4">
        {polls.map((poll) => (
          <li
            key={poll.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <Link
              href={`/polls/${poll.id}`}
              className="text-lg font-semibold text-blue-500 hover:underline"
            >
              {poll.title}
            </Link>
            <p className="text-gray-600 mt-1">
              Início: {new Date(poll.startDate).toLocaleDateString()} - Término:{' '}
              {new Date(poll.endDate).toLocaleDateString()}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-medium ${
                getStatus(poll.startDate, poll.endDate) === 'Encerrada'
                  ? 'bg-red-100 text-red-700'
                  : getStatus(poll.startDate, poll.endDate) === 'Em andamento'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {getStatus(poll.startDate, poll.endDate)}
            </span>
            <Link href={`/polls/update/${poll.id}`} className="text-blue-500 hover:underline">
                Editar Enquete
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollList;
