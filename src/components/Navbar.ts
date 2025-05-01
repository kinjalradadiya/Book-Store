import logoUrl from "../../public/logo.png";
export function Navbar(): string {
  return `
      <nav class="fixed top-0 left-0 w-full z-20 bg-white shadow-sm">
        <div class="mx-auto flex justify-center items-center px-4 py-3">
          <a href="javascript:void(0)">
            <img src="${logoUrl}" class="h-[50px]" alt="Logo" />
          </a>
        </div>
      </nav>
    `;
}
