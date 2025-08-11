import {
  useSmartAccountClient,
  useSendUserOperation,
} from '@account-kit/react';
import { encodeFunctionData } from 'viem';
import PostBoardAbi from '@/abi/PostBoardAbi.json';

// PostBoardコントラクトのアドレス（環境変数から取得）
const POST_BOARD = process.env.NEXT_PUBLIC_POST_BOARD as `0x${string}`;

/**
 * IPFSのCIDを使ってPostBoardコントラクトに投稿を作成するボタンコンポーネント
 * Smart Account（LightAccount）またはEOAの両方で動作する
 */
export function PostButton({ cid }: { cid: string }) {
  // PostBoardコントラクトのcreatePost関数の呼び出しデータをエンコード
  const data = encodeFunctionData({
    abi: PostBoardAbi,
    functionName: 'createPost',
    args: [cid], // IPFSのCIDを引数として渡す
  });

  // LightAccountタイプのSmart Accountクライアントを取得
  const { client, isLoadingClient } = useSmartAccountClient({
    type: 'LightAccount', // シンプルなSmart Account実装（ガスレス取引対応）
  });

  // UserOperationまたは通常のトランザクションを送信するためのhook
  // アカウントタイプに応じて適切な送信方法を自動選択
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    onSuccess: () => {
      // トランザクション成功時のコールバック
      alert(`User operation sent!`);
    },
  });

  return (
    <button
      // クライアント読み込み中または送信中は無効化
      disabled={isSendingUserOperation || isLoadingClient}
      onClick={() =>
        // PostBoardコントラクトのcreatePost関数を実行
        sendUserOperation({
          uo: {
            target: POST_BOARD, // 呼び出し先コントラクトアドレス
            data, // エンコードされた関数呼び出しデータ
            value: BigInt(0), // 送金額（0 ETH）
          },
        })
      }
      className="akui-btn akui-btn-primary mt-4 disabled:akui-btn-disabled disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoadingClient
        ? 'ローディング中...'
        : isSendingUserOperation
        ? '投稿中...'
        : '投稿'}{' '}
    </button>
  );
}
