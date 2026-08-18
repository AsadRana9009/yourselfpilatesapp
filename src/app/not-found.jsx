import Link from "next/link";

/**
 * Global 404. Lives at the root (outside the `(main)` group) so it also covers
 * unknown hidden-token URLs, which render without the site chrome.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-2xl font-bold text-[#3b3d42]">Página não encontrada</h1>
      <p className="text-sm text-[#6b6f76]">
        O endereço que introduziu não existe ou já não está disponível.
      </p>
      <Link
        href="/home"
        className="rounded-full bg-[#398ffc] px-6 py-2 text-sm font-medium text-white"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
