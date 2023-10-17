"Use strict"


import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
// import { faker } from '../@faker-js/faker';

const alert = document.querySelector("#alert");

const searchKey = document.querySelector("#search");

// const sortSelect = document.querySelector("#sortSelect");

const chooseSort = document.querySelector("#chooseSort");

let dropdown = false   //dropdown is close in the first
const dropdownList = document.querySelector("#dropdown");
const AZ = document.querySelector("#AZ"); 
const ZA = document.querySelector("#ZA"); 

let allData = {};

searchKey.addEventListener("keyup", ()=> {
    searchItems(searchKey.value);
})




async function getData() {
    let result = await fetch('https://jsonplaceholder.typicode.com/users');
    allData = await result.json();
    // console.log(allData);
    displayData(allData);
}
getData()



function displayData(allData) {

    let details = "";
    for (const item of allData) {
        let randomImage = faker.image.urlLoremFlickr({ category: 'person' }, { randomize: true })

        let finalAddress = {
            ...item.address
        }
        let Address = JSON.parse(JSON.stringify(item.address));
        // console.log(Address)

        details += `
        <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="card mx-auto">
            <div class="caption">
                <div class="pic">
                    <img src='${randomImage}' class="card-img-top w-100" alt="photo of customer /">
                </div>
                <div class="caption-cutsom">
                    <h2 class="card-title fw-1 mb-0">${item.name}</h2>
                    <p>@${item.username}</p>
                    <p>"${item.company.catchPhrase}"</p>
                </div>
            </div>
            <div class="icons">
                <ul>
                    <li><div class="icon"><img src="icon/Group.jpg" /></div>
                        <p>${item.email}</p>
                    </li>
                    <li class="listOfAddress"><div class="icon"><img src="icon/Icons.jpg" /></div>
                        <p>${finalAddress.street}, ${finalAddress.suite}, ${finalAddress.city}, ${finalAddress.zipcode}, ${finalAddress.geo.lat}, ${finalAddress.geo.lng} </p>
                    </li>
                    <li><div class="icon"><img src="icon/Icons (1).jpg" /></div>
                        <p>${item.phone}</p>
                    </li>
                    <li><div class="icon"><img src="icon/Icons (2).jpg" /></div>
                        <p>${item.website}</p>
                    </li>
                    <li><div class="icon"><img src="icon/Icons (3).jpg" /></div>
                        <p>${item.company.name}</p>
                    </li>
                    <li><div class="icon"><img src="icon/industrial 1.jpg"/></div>
                    <p>${item.company.bs}</p>
                </li>
                </ul>
            </div>

        </div>

    </div>
        `
    }
    document.querySelector("#demo").innerHTML = details;
}


function searchItems(term) {
    let itemFounded = false; // Initialize as false
    let foundedItems = [];
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].name.toLowerCase().includes(term.toLowerCase())) {
            foundedItems.push(allData[i]);
            itemFounded = true; 
        }
    }
    if (itemFounded) { 
        displayData(foundedItems);
        alert.classList.replace("d-block", "d-none");
    } else {
        alert.classList.replace("d-none", "d-block");
        document.querySelector("#demo").innerHTML = ""
    }
}

// sortSelect.addEventListener("change", (e) => {
//     if (e.target.value === "az") {
//         allData.sort((a, b) => a.name.localeCompare(b.name));
//         displayData(allData);
//     }else if (e.target.value === "za"){
//         allData.sort((a, b) => b.name.localeCompare(a.name));
//         displayData(allData);
//     }
// })



chooseSort.addEventListener("click" , ()=>{
    if(dropdown){
        dropdownList.classList.replace("d-flex", "d-none");
        dropdown = false;       
    }else{
        dropdown = true;
        dropdownList.classList.replace("d-none", "d-flex");
    }
})

AZ.addEventListener("click" ,()=>{
    allData.sort((a, b) => a.name.localeCompare(b.name));
    dropdownList.classList.replace("d-flex", "d-none");
        dropdown = false;
       displayData(allData);
})

ZA.addEventListener("click" ,()=>{
    allData.sort((a, b) => b.name.localeCompare(a.name));
    dropdownList.classList.replace("d-flex", "d-none");
        dropdown = false;
             displayData(allData);
})