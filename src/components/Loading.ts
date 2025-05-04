export function Loading(): string {
  return `
      <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
      </div>
    `;
}

let currentLoadingTimeout: number;

export function showLoading(delay: number = 300): void {
  currentLoadingTimeout = window.setTimeout(() => {
    const loadingElement = document.createElement("div");
    loadingElement.id = "global-loading";
    loadingElement.innerHTML = Loading();
    document.body.appendChild(loadingElement);
  }, delay);
}

export function hideLoading(): void {
  clearTimeout(currentLoadingTimeout);
  const loadingElement = document.getElementById("global-loading");
  if (loadingElement) {
    loadingElement.remove();
  }
}
