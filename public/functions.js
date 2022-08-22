async function newNote(){
    if (document.getElementById("note").value != ''){
        let data = {"Note": document.getElementById("note").value};

        document.getElementById("note").value = "";

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch('/api', options);
        const json = await response.json();
        
        console.log(json);

        updateNotes(json);
    }
    
}

async function getNotes(){
    const response = await fetch('/api');
    const data = await response.json();

    console.log(data)

    const list = document.getElementById('noteList');
    

    for (let i = 0; i < data.length; i++){
        console.log(data[i]);

        const listItem = document.createElement("li");
        listItem.innerText = data[i].Note + " - " + data[i].Date;
        list.appendChild(listItem)

    }

}

function updateNotes(data){
    const list = document.getElementById('noteList');
    console.log(data.Note);

    const listItem = document.createElement("li");
    listItem.innerText = data.Note + " - " + data.Date;
    list.appendChild(listItem)
}

const input = document.getElementById("note");
input.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        newNote();
    }
})

getNotes()