document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const categoryButton = document.getElementById("categoryButton");
    const searchInput = document.getElementById("searchInput");
    const productList = document.getElementById("products");
    const otherproductList = document.getElementById("otherproducts");
    const responseFailed = document.getElementById("responseFailed");
    const startseite = document.getElementById("startseite");
    const ergebnis = document.getElementById("ergebnis");
    const ergebniskategorie = document.getElementById("ergebniskategorie");
    const kategorieAnzeige = document.getElementById("kategorieAnzeige");
    const neu = document.getElementById("neu");
    const produkt = document.getElementById("produkt");
    
    searchButton.addEventListener("click", fetchData);
    categoryButton.addEventListener("click", showCategoryList);

    function fetchData() {
        var xhr = new XMLHttpRequest();

        const searchString = searchInput.value;
        var apiUrl = "https://dummyjson.com/products/search?q=" + searchString;
        xhr.open("GET", apiUrl, true);

        productList.innerHTML = "";
        responseFailed.textContent = "";

        // Eventlistener implementieren
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Abfrage war erfolgreich
                var response = JSON.parse(xhr.responseText);
                const products = response.products;

                if (products.length === 0) {
                    showNoResult();
                } else {
                    products.forEach((product) => {
                        const productLink = document.createElement("a");
                        productLink.href = product.apiUrl; // Produkt-URL als Linkziel
                        productLink.textContent = product.title; // Produktname als Linktext
                        productList.appendChild(productLink);
                        productLink.addEventListener("click", function(event){
                            event.preventDefault();
                            showProduct(product);
                            showCategory(product.category);
                        });
                    });

                    showList();
                }
            } else {
                // Abfrage fehlgeschlagen
                responseFailed.textContent = "Error: " + xhr.status;
            }
        };

        // Netzwerk Error behandeln
        xhr.onerror = function () {
            responseFailed.textContent = "Netzwerkfehler!";
        };

        // Abfrage senden
        xhr.send();
    }

    function showCategory(kategorie) {
        var xhr = new XMLHttpRequest();
    
        var apiUrl = "https://dummyjson.com/products/category/" + kategorie;
        xhr.open("GET", apiUrl, true);
    
        otherproductList.innerHTML = "";
        responseFailed.textContent = "";
    
        // Eventlistener implementieren
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Abfrage war erfolgreich
                var response = JSON.parse(xhr.responseText);
                const products = response.products;
    
                if (products.length === 0) {
                    showNoResult();
                } else {
                    products.forEach((product) => {
                        const productLink = document.createElement("a");
                        productLink.href = product.apiUrl; // Produkt-URL als Linkziel
                        productLink.textContent = product.title; // Produktname als Linktext
                        otherproductList.appendChild(productLink);
                        productLink.addEventListener("click", function(event){
                            event.preventDefault();
                            showProduct(product);
                        });
                    });
    
                    //showCategoryList();
                    
                    
                }
            } else {
                // Abfrage fehlgeschlagen
                responseFailed.textContent = "Error: " + xhr.status;
            }
        };
    
        // Netzwerk Error behandeln
        xhr.onerror = function () {
            responseFailed.textContent = "Netzwerkfehler!";
        };
    
        // Abfrage senden
        xhr.send();
    }    

    // Die Seite für den Fall, dass keine Ergebnisse gefunden wurden wird angezeigt
    function showNoResult() {
        startseite.style.display = "none";
        ergebnis.style.display = "none";
        keine.style.display = "block";
        produkt.style.display = "none";
        neu.style.display= "block";
    }

    // Die Suche wird ausgeführt und die Produkte werden entsprechend gefüllt
    function showProduct (product) {
        startseite.style.display = "none";
        ergebnis.style.display = "none";
        keine.style.display = "none";
        produkt.style.display = "block";
        neu.style.display= "block";
        kategorieAnzeige.style.display= "block";
        ergebniskategorie.style.display = "none";


        // Einzelnen Daten den HTML-Blöcken zuordnen
        const titel = document.getElementById("produktname");
        const preis = document.getElementById("produktpreis");
        const kategorie = document.getElementById("produktkategorie");
        const beschreibung = document.getElementById("produktbeschreibung");
        const bild = document.getElementById("produktbild");
        const marke = document.getElementById("produktmarke");
        const lagerbestand = document.getElementById("produktbestand");

        // Text einfügen
        titel.textContent = product.title;
        bild.src = product.thumbnail;
        bild.alt = product.title;
        preis.textContent = product.price +" $";
        beschreibung.textContent = product.description;
        kategorie.textContent = product.category; 
        marke.textContent = product.brand; 
        lagerbestand.textContent = product.stock + " Stück";
    };

    // Die Ergebnissseite wird angezeigt
    function showList(){
        startseite.style.display = "none";
        ergebnis.style.display = "block";
        neu.style.display = "block";
        produkt.style.display = "none";
    }
    
    // Die Ergebnisse mit der selben Kategorie werden angezeigt
    function showCategoryList(){
        startseite.style.display = "none";
        ergebniskategorie.style.display = "block";
        neu.style.display = "block";
        produkt.style.display = "none";
        kategorieAnzeige.style.display = "none";
    }

    
});

// Seite neu laden
function refreshPage() {
    location.reload();
}


