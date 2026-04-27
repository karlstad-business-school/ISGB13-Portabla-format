async function loadApi() {
  //let url = "https://xkcd.com/rss.xml";
  let url = "https://corsproxy.io/?url=" + encodeURIComponent("https://xkcd.com/rss.xml");
  let feedContainer = document.getElementById("feed");

  try {
    let response = await fetch(url);
    let xmlString = await response.text();

    console.log("Xml texten: " + xmlString);

    let parser = new DOMParser();
    let data = parser.parseFromString(xmlString, "application/xml");

    console.log("Parsad XML:" + data);

    let items = data.querySelectorAll("item");
    
    
    for(let i=0; i<items.length; i++) {
      let item = items[i];

      let title = item.querySelector("title").textContent;
      let image = item.querySelector("description").textContent;

      // Create a container div
      let containerDiv = document.createElement("div");
      containerDiv.className = "bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center";

      // Create a title (h2)
      let h2 = document.createElement("h2");
      h2.className = "text-xl font-bold mb-4 text-indigo-900";
      h2.textContent = title;

      // Create a content container
      let contentDiv = document.createElement("div");
      contentDiv.innerHTML = image;

      // Style the image inside content
      let img = contentDiv.querySelector("img");
      if (img) {
        img.className = "mx-auto mb-4 h-auto max-w-full rounded";
      }

      // Append elements
      containerDiv.appendChild(h2);
      containerDiv.appendChild(contentDiv);

      // Add to DOM
        feedContainer.appendChild(containerDiv);
    }


  } catch (err) {
    console.log("FEEEL: " + err);
  }
}

window.addEventListener("load", loadApi);