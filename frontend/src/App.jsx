/*
Place this file as: src/App.jsx

Also ensure you have src/index.css with Tailwind imports:

/* src/index.css */
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
}
*/

// Usage:
// 1. Save this as src/App.jsx
// 2. Make sure src/main.jsx imports './index.css' and renders <App />
// 3. Run: npm run dev

// This single-file contains small internal components: Sidebar, Topbar, BookCard
// It is intentionally self-contained and uses Tailwind v3 classes.
// */

import { useState } from 'react'

/*
Goal: Full-width responsive dashboard layout.
- Sidebar is fixed width and full height (sticky)
- Main content takes remaining width and scrolls independently
- Ensures no blank space on the right
*/

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'} h-screen sticky top-0`}>
      <div className="h-full p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className={`text-lg font-semibold ${collapsed ? 'hidden' : 'block'}`}>E-Library</div>
          <button onClick={onToggle} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            ☰
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <a className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={`${collapsed ? 'hidden' : 'inline'}`}>Dashboard</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={`${collapsed ? 'hidden' : 'inline'}`}>Upload</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 18h16M7 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={`${collapsed ? 'hidden' : 'inline'}`}>My Books</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button className="w-full text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
        </div>
      </div>
    </aside>
  )
}

function Topbar({ darkMode, setDarkMode }) {
  return (
    <header className="flex items-center justify-between p-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-500">Welcome back — here are your books</div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-sm">Upload</span>
        </button>

        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          {darkMode ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          )}
        </button>
      </div>
    </header>
  )
}

function BookCard({ book, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm p-4 flex flex-col h-full">
      <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-gray-700 dark:to-gray-800 rounded-md mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">PDF</div>
          <div className="text-lg font-semibold">{book.title}</div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{book.program}</p>
        <p className="text-xs text-gray-400">{book.language}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Open</button>
        <button onClick={() => onDelete(book.id)} className="text-sm px-3 py-1 border rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-700/20 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6"/></svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [books, setBooks] = useState([
    { id: 1, title: 'Dasar Pemrograman', program: 'Informatika', language: 'ID' },
    { id: 2, title: 'Struktur Data', program: 'Informatika', language: 'EN' },
    { id: 3, title: 'Algoritma', program: 'Sistem Informasi', language: 'ID' },
  ])

  function handleDelete(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* Root layout fills full viewport */}
      <div className="min-h-screen flex w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar (fixed width) */}
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        {/* Main content grows and scrolls */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="p-6 overflow-auto"> {/* scroll inside this area */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">My Books</h3>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Upload PDF</button>
                <button className="px-3 py-2 border rounded-md">Refresh</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((b) => (
                <BookCard key={b.id} book={b} onDelete={handleDelete} />
              ))}
            </div>

            {/* spacer to allow comfortable scrolling */}
            <div className="h-24" />
          </main>
        </div>
      </div>
    </div>
  )
}
