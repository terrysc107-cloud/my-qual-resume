export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          My Qual Resume
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
          Welcome to your professional resume showcase
        </p>
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: "var(--muted)",
            border: "1px solid var(--border)",
          }}
        >
          <p style={{ color: "var(--foreground)" }}>
            This is your starting point. Add your qualifications, experience, and skills here.
          </p>
        </div>
      </div>
    </main>
  );
}
