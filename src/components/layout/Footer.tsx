export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-between gap-2 border-t border-concrete-100 px-4 py-4 text-[12px] text-concrete-300 dark:border-white/5 sm:flex-row sm:px-6">
      <p>© {new Date().getFullYear()} Varuvi Sitemap. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <span>v2.4.0</span>
        <span>Status: <span className="text-signal-green">All systems operational</span></span>
      </div>
    </footer>
  );
}
