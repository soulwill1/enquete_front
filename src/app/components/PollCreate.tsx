'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PollCreate = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    } else {
      setMessage('Você só pode adicionar até 5 opções.');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 3) {
      setOptions(options.filter((_, i) => i !== index));
    } else {
      setMessage('A enquete deve ter pelo menos 3 opções.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (options.length < 3 || options.some((option) => !option.trim())) {
      setMessage('A enquete deve ter pelo menos 3 opções válidas.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/api/v1/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, startDate, endDate, options }),
      });

      if (response.ok) {
        setMessage('Enquete criada com sucesso!');
        router.push('/');
      } else {
        setMessage('Erro ao criar a enquete.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao criar a enquete.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Criar Enquete</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Data de Início</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Data de Término</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Opções (min: 3, max: 5)</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              {options.length > 3 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="ml-2 text-red-500"
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          {options.length < 5 && (
            <button type="button" onClick={addOption} className="text-blue-500">
              Adicionar Opção
            </button>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Criar Enquete
        </button>
      </form>
      {message && <p className="text-red-500 mt-4">{message}</p>}
      
    </div>
  );
};

export default PollCreate;
