export function HomeBanner(): string {
  return `
      <div class="home-banner w-full h-[60vh] flex flex-col-reverse md:flex-row items-center justify-between mt-[60px]">
        <div
          class="relative w-full h-full flex items-center justify-center bg-cover bg-center"
          style="background-image: url('./public/banner-image.png')"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0"
          ></div>
  
          <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              <span class="text-yellow-400">Page</span> Turner Books
            </h1>
            <p class="text-xl md:text-2xl text-gray-100 font-light mb-8 max-w-2xl mx-auto">
              Discover your next adventure in our curated collection of classics
              and contemporary masterpieces
            </p>
          </div>
        </div>
      </div>
    `;
}
