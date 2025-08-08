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
  });

  return (
    <button
      disabled={!client || isSendingUserOperation || isLoadingClient}
      onClick={() =>
        sendUserOperation({
          uo: { target: POST_BOARD, data, value: BigInt(0) },
        })
      }
      className="akui-btn akui-btn-secondary mt-4 disabled:akui-btn-disabled disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoadingClient
        ? 'Loading...'
        : isSendingUserOperation
        ? 'Posting…'
        : 'Post gas-free'}
    </button>
  );
}
