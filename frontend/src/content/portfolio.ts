/**
 * Things that run here, shown as proof. Only `kind: "own"` entries may ship;
 * `client` entries are added solely after the client's written OK — the
 * content test enforces this.
 */
export type PortfolioItem = {
  name: string;
  url: string;
  blurb: string;
  kind: "own" | "client";
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    name: "CUTPOINT Community",
    url: "https://social.navonsimon.com",
    blurb: "רשת חברתית בעברית — נבנתה, מאוחסנת ומנוהלת כאן.",
    kind: "own",
  },
  {
    name: "Screening Room",
    url: "https://videos.navonsimon.com",
    blurb: "ספריית וידאו מהירה — אפליקציית Go שרצה על התשתית שלנו.",
    kind: "own",
  },
  {
    name: "פנים",
    url: "https://panim.navonsimon.com",
    blurb: "דף השקה לאפליקציית היכרויות וידאו — מהרעיון לאוויר.",
    kind: "own",
  },
];
