import { PlayCircle } from "lucide-react";
import HighlightedFeature from "./components/HighlightedFeature";

export default function VideoShowcase() {
  return (
    <HighlightedFeature
      name="Watch & Learn"
      description={
        <div>
          <p className="text-muted-foreground mb-4">
            Explore our video content covering cybersecurity concepts, lab
            walkthroughs, CTF write-ups, and conference presentations from VISI
            Lab members.
          </p>
          <p className="text-muted-foreground text-sm italic">
            Video content coming soon. Stay tuned for tutorials and
            walkthroughs.
          </p>
        </div>
      }
      highlightedComponent={<YouTubePlaceholder />}
      direction="row-reverse"
    />
  );
}

function YouTubePlaceholder() {
  return (
    <div className="w-full">
      <div className="border-border bg-muted/30 flex aspect-video w-full items-center justify-center rounded-lg border">
        <div className="text-center">
          <PlayCircle className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
          <p className="text-muted-foreground text-sm font-medium">
            Video Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
