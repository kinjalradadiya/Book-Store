import "./style.css";
import "flowbite";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { renderHomePage } from "./pages/home";
import { renderBookPage } from "./pages/bookDetails";
import { Loading } from "./components/Loading";

type Route = {
  path: string;
  title: string;
  render: (path?: string) => Promise<string>;
  match?: (path: string) => boolean;
  params?: (path: string) => Record<string, unknown>;
};

let currentLoadingTimeout: number;

function showLoading(delay: number = 300): void {
  currentLoadingTimeout = window.setTimeout(() => {
    const loadingElement = document.createElement("div");
    loadingElement.id = "global-loading";
    loadingElement.innerHTML = Loading();
    document.body.appendChild(loadingElement);
  }, delay);
}

function hideLoading(): void {
  clearTimeout(currentLoadingTimeout);
  const loadingElement = document.getElementById("global-loading");
  if (loadingElement) {
    loadingElement.remove();
  }
}

const routes: Route[] = [
  {
    path: "/",
    title: "Book Store - Home",
    render: async () => renderHomePage(),
  },
  {
    path: "/books/:id",
    title: "Book Details",
    match: (path) => path.startsWith("/books/"),
    params: (path) => ({ id: Number(path.split("/books/")[1]) }),
    render: async (path) => {
      if (!path) throw new Error("Path is required for this route.");
      const { id } = routes[1].params!(path);
      return renderBookPage(id as number);
    },
  },
];

function renderLayout(content: string): void {
  const app = document.getElementById("app");
  if (!app) throw new Error("App element not found");

  app.innerHTML = `
    ${Navbar()}
    <main class="min-h-screen">
      ${content}
    </main>
    ${Footer()}
  `;
}

async function navigate(
  path: string = window.location.pathname
): Promise<void> {
  showLoading();

  let content = "";
  let routeFound = false;

  try {
    for (const route of routes) {
      if (route.path === path || (route.match && route.match(path))) {
        document.title = route.title;
        content = await (route.match ? route.render(path) : route.render());
        routeFound = true;
        break;
      }
    }

    if (!routeFound) {
      document.title = "404 Not Found";
      content = `<div>
      404 Not Found
      </div>`;
    }
  } catch (error) {
    console.error("Navigation error:", error);
    document.title = "Error";
    content = `
      <div class="text-center py-20">
        <h1 class="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
        <p class="mb-4">${
          error instanceof Error ? error.message : "Unknown error"
        }</p>
        <button data-navigate="/" class="text-yellow-600 hover:underline">
          ← Back to Home
        </button>
      </div>
    `;
  } finally {
    renderLayout(content);
    hideLoading();
    if (path.startsWith("/books/")) {
      const { setupPurchaseButton } = await import("./pages/bookDetails");
      setupPurchaseButton();
    }
  }
}

function initializeRouter(): void {
  navigate();

  window.addEventListener("popstate", () => navigate());

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-navigate]");
    if (button) {
      e.preventDefault();
      const path = button.getAttribute("data-navigate");
      if (path) {
        history.pushState(null, "", path);
        navigate(path);
      }
    }
  });
}

initializeRouter();

export function navigateTo(path: string): void {
  history.pushState(null, "", path);
  navigate(path);
}
