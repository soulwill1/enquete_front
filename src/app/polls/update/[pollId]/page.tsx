'use client';

import { useParams } from 'next/navigation';
import PollUpdateForm from '@/app/components/PollUpdateForm';

const UpdatePollPage = () => {
  const { pollId } = useParams();

  if (!pollId) {
    return <p>Enquete inválida ou não encontrada.</p>;
  }

  return (
    <div>
      <PollUpdateForm pollId={pollId as string} />
    </div>
  );
};

export default UpdatePollPage;
