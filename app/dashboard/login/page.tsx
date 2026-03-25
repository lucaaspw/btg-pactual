import { LoginForm } from "./LoginForm";
import { Suspense } from "react";

export default function DashboardLoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(165deg, #f7f9fc 0%, #eef3f9 45%, #e4ecf6 100%)",
          }}
        >
          <p className="text-sm text-slate-500">Carregando…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
