'use client';

import { useState } from 'react';

interface PollFormProps {
  onSubmit: (data: {
    title: string;
    startDate: string;
    endDate: string;
    options: string[];
  }) => void;
}

const PollForm: React.FC<PollFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (options.length < 3 || options.length > 5) {
      setErrorMessage('A enquete deve ter entre 3 e 5 opções.');
      return;
    }
    onSubmit({ title, startDate, endDate, options });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Data de Início:
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </label>
      <label>
        Data de Término:
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </label>
      <label>Opções:</label>
      {options.map((option, index) => (
        <div key={index}>
          <input
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            required
          />
        </div>
      ))}
      {options.length < 5 && <button type="button" onClick={() => setOptions([...options, ''])}>Adicionar Opção</button>}
      <button type="submit">Salvar</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default PollForm;
