'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Option {
  id: number;
  text: string;
}

interface Poll {
  title: string;
  startDate: string;
  endDate: string;
  options: Option[];
}

const PollUpdateForm = ({ pollId }: { pollId: string }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3333/api/v1/polls/${pollId}`)
      .then((res) => res.json())
      .then((poll: Poll) => {
        setTitle(poll.title);
        setStartDate(new Date(poll.startDate).toISOString().slice(0, 16));
        setEndDate(new Date(poll.endDate).toISOString().slice(0, 16));
        setOptions(poll.options.map((option) => option.text));
      })
      .catch(() => setMessage('Erro ao carregar os dados da enquete.'));
  }, [pollId]);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (options.length < 3 || options.length > 5) {
      setMessage('A enquete deve ter entre 3 e 5 opções.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/api/v1/polls/${pollId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          startDate,
          endDate,
          options: options.map((text) => text ),
        }),
      });

      if (response.ok) {
        setMessage('Enquete atualizada com sucesso!');
      } else {
        const errorData = await response.json();
        setMessage(`Erro: ${errorData.error || 'Erro ao atualizar a enquete.'}`);
      }
    } catch {
      setMessage('Erro ao atualizar a enquete.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Atualizar Enquete</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Data de Início</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Data de Término</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Opções (min 3, max 5)</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Atualizar Enquete
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      <div className='flex mt-3'>
        <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded">Voltar</Link>
      </div>
    </div>
  );
};

export default PollUpdateForm;
