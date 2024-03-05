export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mt-8 md:mt-0 flex justify-between text-xs text-zinc-500">
        <p>&copy; 2024 DarkThrone Reborn</p>
        <p className="text-zinc-700">Version: __COMMIT_HASH__</p>
      </div>
    </footer>
  );
}
