"use client";

export default function Error({ error }: { error: string }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold">Ha ocurrido un error</h1>
        <p className="mt-2">{error}</p>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
