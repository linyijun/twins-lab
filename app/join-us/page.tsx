import { permanentRedirect } from "next/navigation";
import { sitePath } from "../../lib/site";

export default function Join() {
  permanentRedirect(sitePath("/#join-us"));
}
