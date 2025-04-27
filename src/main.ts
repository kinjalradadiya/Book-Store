import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  
  <h1 class="text-3xl font-bold underline text-amber-400">
    Hello world!
  </h1>
`;

async function fetchData() {
  try {
    const response = await fetch("http://localhost:8000/books");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
