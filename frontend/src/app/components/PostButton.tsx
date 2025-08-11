import {
  useSmartAccountClient,
  useSendUserOperation,
} from '@account-kit/react';
import { encodeFunctionData } from 'viem';
import PostBoardAbi from '@/abi/PostBoardAbi.json';

const POST_BOARD = process.env.NEXT_PUBLIC_POST_BOARD as `0x${string}`;

export function PostButton({ cid }: { cid: string }) {
  const data = encodeFunctionData({
    abi: PostBoardAbi,
    functionName: 'createPost',
    args: [cid],
  });

  const { client, isLoadingClient } = useSmartAccountClient({
    type: 'LightAccount',
  });

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    onSuccess: () => {
      // [optional] Do something with the hash and request
      alert(`User operation sent!`);
    },
  });

  return (
    <button
      disabled={isSendingUserOperation || isLoadingClient}
      onClick={() =>
        sendUserOperation({
          uo: { target: POST_BOARD, data, value: BigInt(0) },
        })
      }
      className="akui-btn akui-btn-primary mt-4 disabled:akui-btn-disabled disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoadingClient
        ? 'ローディング中...'
        : isSendingUserOperation
        ? '投稿中...'
        : '投稿'}
    </button>
  );
}
