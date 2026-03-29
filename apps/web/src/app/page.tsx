export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-espresso dark:text-cream mb-4">
          The Global Grind & Whisk
        </h1>
        <p className="text-xl text-espresso-light dark:text-gray-400 mb-8">
          Coffee & Matcha Encyclopedia
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/coffee"
            className="px-6 py-3 bg-espresso text-white rounded-xl font-bold hover:bg-espresso-light transition-colors shadow-lg"
          >
            Explore Coffee
          </a>
          <a
            href="/matcha"
            className="px-6 py-3 bg-matcha text-white rounded-xl font-bold hover:bg-matcha-dark transition-colors shadow-lg"
          >
            Explore Matcha
          </a>
        </div>
      </div>
    </main>
  )
}
