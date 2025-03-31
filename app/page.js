import WeatherPanel from "@/components/WeatherPanel";
import TimePanel from "@/components/TimePanel";

export default function Home() {
  const current_time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}).replace(/ a.m. | p.m./, '');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="mt-4 text-lg">Welcome to my Next.js app!</p>
      <WeatherPanel/>
      <TimePanel/>
    </main>
  );
}
