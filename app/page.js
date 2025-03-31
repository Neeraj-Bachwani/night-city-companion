import WeatherPanel from "@/components/WeatherPanel";
import TimePanel from "@/components/TimePanel";
import EventPanel from "@/components/EventPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 p-8 text-cyan-100 font-mono">
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-1">NIGHTCITY COMPANION</h1>
        <p className="text-green-400 text-sm">// SYSTEM STATUS: ONLINE</p>
      </header>

     
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <WeatherPanel />
          <TimePanel />
        </div>

        
        <section>
          <EventPanel />
        </section>

      </div>
    </main>
  );
}