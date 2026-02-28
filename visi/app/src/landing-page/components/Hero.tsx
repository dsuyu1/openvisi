import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { Button } from "../../client/components/ui/button";

export default function Hero() {
  return (
    <div className="relative w-full pt-14">
      <TopGradient />
      <BottomGradient />
      <div className="md:p-24">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="lg:mb-18 mx-auto max-w-3xl text-center">
            <h1 className="text-foreground text-5xl font-bold sm:text-6xl">
              Creating the Rio Grande Valley's{" "}
              <span className="text-gradient-primary">
                Cybersecurity Trailblazers
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8">
              VISI Lab equips UTRGV students with hands-on experience in
              penetration testing, threat analysis, and security operations to
              defend tomorrow's digital frontier.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="outline" asChild>
                <a href="/#our-work">Our Work</a>
              </Button>
              <Button size="lg" variant="default" asChild>
                <WaspRouterLink to={routes.LoginRoute.to}>
                  Access the Lab <span aria-hidden="true">→</span>
                </WaspRouterLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopGradient() {
  return (
    <div
      className="absolute right-0 top-0 -z-10 w-full transform-gpu overflow-hidden blur-3xl sm:top-0"
      aria-hidden="true"
    >
      <div
        className="aspect-1020/880 w-280 flex-none bg-linear-to-tr from-blue-600 to-cyan-400 opacity-10 sm:right-1/4 sm:translate-x-1/2 dark:hidden"
        style={{
          clipPath:
            "polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)",
        }}
      />
    </div>
  );
}

function BottomGradient() {
  return (
    <div
      className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-65rem)]"
      aria-hidden="true"
    >
      <div
        className="relative aspect-1020/880 w-360 bg-linear-to-br from-blue-600 to-cyan-400 opacity-10 sm:-left-3/4 sm:translate-x-1/4 dark:hidden"
        style={{
          clipPath: "ellipse(80% 30% at 80% 50%)",
        }}
      />
    </div>
  );
}
