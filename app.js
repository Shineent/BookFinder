document.querySelector(".btn").addEventListener("click", getBooks);

function getBooks(e){

    const xhr = new XMLHttpRequest();

    const number = document.querySelector("input[type='number']").value;

    xhr.open("GET", `https://www.googleapis.com/books/v1/volumes?q=isbn:${number}`, true);

    xhr.onload = function(){

        if(this.status === 200){

            const books = JSON.parse(this.responseText);
            console.log(books);
            let output = " ";
            let link = " ";

            if(books.kind === "books#volumes" && books.totalItems >= 1){
               
            output = `
           
            <li class="collection-item">Title: ${books.items[0].volumeInfo.title}</li>
            <li class="collection-item">Author: ${books.items[0].volumeInfo.authors[0]}</li>
            <li class="collection-item">Info: ${books.items[0].searchInfo.textSnippet}</li>
            `;
            }   else{
                alert("Couldnt find book")
            }
            
            let learn = books.items[0].volumeInfo.previewLink;
            link = `<a href="${learn}" target="blank" class=' btn btn-large waves-effect waves-grey'>Learn More </a>`
            
               
            

            document.querySelector(".collection").innerHTML = output;

            document.querySelector(".link").innerHTML = link;

        }
    }



    xhr.send();

    e.preventDefault();
}

