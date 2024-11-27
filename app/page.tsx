import VideoClient from "./page.client";

export default function Home() {
  return (
    <div className="container max-w-2xl mx-auto lg:max-w-7xl font-sans py-36 px-6 lg:px-8">
      <h1 className='mb-8 text-2xl font-extrabold tracking-tight leading-none md:text-5xl'>RoverCast</h1>
      <VideoClient />
    </div>
  );
}
