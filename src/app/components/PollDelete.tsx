'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PollDelete = ({ pollId }: { pollId: string }) => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    const confirmation = window.confirm('Tem certeza que deseja excluir esta enquete?');
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3333/api/v1/polls/${pollId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage('Enquete excluída com sucesso!');
          router.push('/');
        } else {
          setMessage('Erro ao excluir a enquete.');
        }
      } catch {
        setMessage('Erro ao excluir a enquete.');
      }
    }
  };

  return (
    <div className="p-3 max-w-4xl">
      
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Deletar
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default PollDelete;
