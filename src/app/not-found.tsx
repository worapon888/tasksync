export default function NotFound() {
  return (
    <>
      {/* Content */}
      <div className="relative z-10 ml-0 md:ml-24  flex flex-col items-center justify-center min-h-screen overflow-y-auto  ">
        <div className="text-center l space-y-6">
          <h1
            className="text-3xl md:text-5xl font-semibold leading-snug
        bg-gradient-to-r from-cyan-300 to-white
        dark:from-[#444444] dark:to-white
        bg-clip-text text-transparent tracking-tight"
          >
            Oops! We couldn&apos;t find the page you&apos;re looking for.
          </h1>
          <h1
            className="text-5xl md:text-8xl font-semibold leading-snug
        bg-gradient-to-br from-cyan-300 to-white
        dark:from-[#444444] dark:to-white
        bg-clip-text text-transparent tracking-tight"
          >
            404
          </h1>
        </div>
      </div>
    </>
  );
}
