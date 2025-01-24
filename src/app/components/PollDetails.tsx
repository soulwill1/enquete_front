'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const PollDetails = ({ pollId }: { pollId: string }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:3333");
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3333/api/v1/polls/${pollId}`)
      .then((res) => res.json())
      .then(setPoll)
      .catch(console.error);
  }, [pollId]);

  useEffect(() => {
    if (socket) {
      socket.on("votesUpdated", ({ optionId, votes }) => {
        setPoll((prevPoll) =>
          prevPoll
            ? {
                ...prevPoll,
                options: prevPoll.options.map((option) =>
                  option.id === optionId ? { ...option, votes } : option
                ),
              }
            : null
        );
      });
    }
  }, [socket]);

  const handleVote = async (optionId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/v1/polls/${pollId}/options/${optionId}/vote`,
        { method: 'POST' }
      );
      if (!response.ok) {
        throw new Error("Erro ao registrar o voto.");
      }
    } catch (error) {
      console.error("Erro ao votar:", error);
    }
  };

  if (!poll) return <p className="text-gray-500">Carregando...</p>;

  const getStatus = () => {
    const now = new Date();
    const start = new Date(poll.startDate);
    const end = new Date(poll.endDate);

    if (now < start) return "Não Iniciada";
    if (now > end) return "Encerrada";
    return "Em Andamento";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{poll.title}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Status:</strong> {getStatus()}
      </p>
      <p className="text-gray-600">
        <strong>Início:</strong> {new Date(poll.startDate).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Término:</strong> {new Date(poll.endDate).toLocaleString()}
      </p>

      <ul className="space-y-4">
        {poll.options.map((option) => (
          <li
            key={option.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{option.text}</p>
              <p className="text-sm text-gray-500">
                Votos: <span className="font-bold">{option.votes}</span>
              </p>
            </div>
            <button
              onClick={() => handleVote(option.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              disabled={getStatus() !== "Em Andamento"}
            >
              Votar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetails;

type Poll = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  options: { id: number; text: string; votes: number }[];
};
