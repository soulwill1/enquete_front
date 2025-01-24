'use client';

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Sistema de Enquetes</h1>
      <div className="flex gap-3">
        <Link
          href="/polls"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ver Enquetes
        </Link>
        <Link
          href="/polls/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Criar Nova Enquete
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
