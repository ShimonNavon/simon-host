/**
 * The site's one recurring device: how the work splits between us.
 * Solid orange is my share, hatched is yours. In RTL the bar fills from
 * the right, so the orange visibly recedes as you take over more.
 */
export default function InvolvementBar({ mine }: { mine: number }) {
  const yours = 100 - mine;

  return (
    <div
      className="involve-track"
      role="img"
      aria-label={`חלוקת העבודה: אני ${mine} אחוז, אתה ${yours} אחוז`}
    >
      <div className="involve-mine" style={{ width: `${mine}%` }} />
      {yours > 0 && <div className="involve-yours" style={{ width: `${yours}%` }} />}
    </div>
  );
}
