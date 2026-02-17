export default function Mission() {
  return (
    <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-right skew-y-12 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950/50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-gradient-primary">
          Our Mission
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Empowering the Next Generation of Cybersecurity Leaders
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          We are a club at UTRGV dedicated to providing ambitious students with the resources to grow and curious students with the opportunity to explore a potential career in infosec/cybersecurity.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          At the end of the day, our goal is to inspire students to take initiative in their academic and professional lives, whether that be attending or presenting at conferences, conducting research, starting projects, or making meaningful connections.
        </p>
      </div>
    </section>
  );
}
