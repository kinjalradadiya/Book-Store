import { HomeBanner } from "../components/HomeBanner";
import { BookCollection } from "../components/BookCollection";

export function renderHomePage() {
  return `<div class="main">
      ${HomeBanner()}
      ${BookCollection()}
    </div>`;
}
