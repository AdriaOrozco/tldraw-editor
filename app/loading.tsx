import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col gap-5 border-r border-gray-200 bg-white p-4">
        <Skeleton className="h-6 w-32" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-auto">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </aside>

      {/* Canvas */}
      <main className="relative flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded" />
            ))}
          </div>
        </header>

        <section className="flex-1 bg-gray-50" />

        {/* Toolbar */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 rounded-xl border bg-white p-2 shadow">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded" />
          ))}
        </div>

        {/* Zoom map */}
        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-20 w-28 rounded shadow" />
        </div>
      </main>
    </div>
  );
}
