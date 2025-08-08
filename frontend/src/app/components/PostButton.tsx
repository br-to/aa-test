import {
  useSmartAccountClient,
  useSendUserOperation,
  useUser,
} from '@account-kit/react';
import { encodeFunctionData } from 'viem';
import PostBoardAbi from '@/abi/PostBoardAbi.json';

const POST_BOARD = process.env.NEXT_PUBLIC_POST_BOARD as `0x${string}`;

export function PostButton({ cid }: { cid: string }) {
  const user = useUser();
  const data = encodeFunctionData({
    abi: PostBoardAbi,
    functionName: 'createPost',
    args: [cid],
  });

  const { client, isLoadingClient } = useSmartAccountClient({
    type: 'LightAccount',
  });

  console.log('user state:', user);
  console.log('client state:', { client, isLoadingClient });

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
  });

  // ユーザーがログインしていない場合
  if (!user) {
    return (
      <button disabled className="opacity-50 cursor-not-allowed">
        Please login first
      </button>
    );
  }

  return (
    <button
      disabled={!client || isSendingUserOperation || isLoadingClient}
      onClick={() =>
        sendUserOperation({
          uo: { target: POST_BOARD, data, value: BigInt(0) },
        })
      }
    >
      {isLoadingClient
        ? 'Loading...'
        : isSendingUserOperation
        ? 'Posting…'
        : 'Post gas-free'}
    </button>
  );
}
