import Hero from "../../components/Hero";
import MockIelts from "../../components/MockIelts";

export default function Home() {
  console.log("page working");
  
  return (
    <div className="min-h-screen bg-background">
      <main className="p-0">
        <Hero />
        <MockIelts />
      </main>
    </div>
  );
}
