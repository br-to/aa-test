'use client';
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from '@account-kit/react';
import { PostButton } from './components/PostButton';

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>ローディング中...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">ログイン中</p>
          {user.email ? user.email : user.address}
          {/* cidは仮のものです。実際のアプリでは適切なCIDを使用してください。 */}
          <PostButton cid="demo:cid:hello-world" />
          <button
            className="akui-btn akui-btn-link mt-6"
            onClick={() => logout()}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          className="akui-btn akui-btn-primary"
          type="button"
          onClick={openAuthModal}
        >
          ログイン
        </button>
      )}
    </main>
  );
}
