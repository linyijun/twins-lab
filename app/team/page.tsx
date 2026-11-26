import { permanentRedirect } from "next/navigation";
import { sitePath } from "../../lib/site";

export default function Team() {
  permanentRedirect(sitePath("/#team"));
}
