let main = $("#mainContainer");
const newHomeButton = document.getElementById("newHomeButton");
const newHomeCont = $("#newHomeCont");
const typeIn = $("#typeIn");
const nameIn = $("#nameIn");
const stateIn = $("#stateIn");
const cityIn = $("#cityIn");
const zipIn = $("#zipIn");
const newHomeSub = $("#newHomeSubmit");
const newHomeCancel = $("#newHomeCancel");
const newRoomButton = $("#newRoomButton");
const newRoomSubmit = $("#newRoomSubmit");
const newRoomCancel = $("#newRoomCancel");
const newRoomCont = $("#newRoomCont");
const typeRoomIn = $("#typeRoomIn");
const nameRoomIn = $("#nameRoomIn");
const homeRoomIn = $("#homeRoomIn");
let newItemCont = $("#newItemCont");
const showRoomsButton = $("#showRoomsButton");
const contFluid = $("#contFluid");
const startButton = $("#startButton");
const introCont = $("#introCont");
const showHomesButton = $("#showHomesButton");
const editHomeButton = $(
  "<button type='button' class='btn btn-primary mt-2 mb-2'>Edit Home</button>"
);
const editHomeSub = $(
  "<button type='button' class='btn btn-primary'>Submit</button>"
);
const delHomeButton = $(
  "<button type='button' class='btn btn-danger'>Delete Home</button>"
);
newItemCont.hide();
newHomeCont.hide();
newRoomCont.hide();

startButton.on("click", function () {
  introCont.detach();
  alert(
    "To get started, click on the 'Add New Home' button. Input your home details, then click on the 'Add New Room' button. Here you can add a room to your home and then add whatever items belong to that room by clicking on the 'Add New Item' button inside the room box. If you want to see all your rooms, click on 'Show Rooms' button. You can hide all the rooms by clicking on the 'Hide Rooms' button that appears. HAPPY ORGANIZING!!!"
  );
  alert(
    "DEV note: Adding a new home will not actually input a new home into the database. It will only update the current homes information. Show rooms currently has a bug where if you press it multiple times, it will duplicate the hide rooms button filling the Nav bar. Add new item functionality is not present (didnt have enough time to get to it). Still missing some major functionality."
  );
});

fetch("https://mvp-back-end.onrender.com/api/mvp/home")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      console.log(element);
    });
  });

function addNewHome() {
  fetch("https://mvp-back-end.onrender.com/api/mvp/home/1")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        typeIn.val();
      });
    });
}

showHomesButton.on("click", function () {
  main.show();
  const hideHomesButton = $(
    "<button type='button' class='btn btn-light ms-2'>Hide Homes</button>"
  );
  contFluid.append(hideHomesButton);
  fetch("https://mvp-back-end.onrender.com/api/mvp/home")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        let mainHomeCont = $(`<div
        id="mainRoomCont"
        class="container bg-light d-flex justify-content-start mb-2 rounded"
        >
        <div id="roomCont" class="container rounded-pill">
          <h1 id="roomName">
            ${element.name}
          </h1>
          <hr />
          <div id="homeColName" class="row row-cols-4">
            <div class="col">Type</div>
            <div class="col">State</div>
            <div class="col">City</div>
            <div class="col">Zip Code</div>
          </div>
          <hr />
          <div id="homeInfo" class="row row-cols-4 pb-4">
            <div class="col">${element.type}</div>
            <div class="col">${element.state}</div>
            <div class="col">${element.city}</div>
            <div class="col">${element.zip}</div>
          </div>
        </div>
        </div>`);
        main.append(mainHomeCont);
        mainHomeCont.append(editHomeButton);
        // editHomeSub.on("click", functrion() {
        //   let body = {
        //     type: typeIn.val(),
        //     name: nameIn.val(),
        //     state: stateIn.val(),
        //     city: cityIn.val(),
        //     zip: zipIn.val(),
        //   };
        //   fetch(`https://mvp-back-end.onrender.com/api/mvp/home/${element.id}`, {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(body),
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //     });
        //   newHomeCont.toggle();
        // })
        hideHomesButton.on("click", function () {
          main.hide();
          hideHomesButton.detach();
        });
        editHomeButton.on("click", function () {});
      });
    });
});

showRoomsButton.on("click", function () {
  main.show();
  const hideRoomsButton = $(
    "<button type='button' class='btn btn-light ms-2'>Hide Rooms</button>"
  );
  contFluid.append(hideRoomsButton);
  fetch("https://mvp-back-end.onrender.com/api/mvp/rooms")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        let $mainRoomCont = $(`<div
      id="mainRoomCont"
      class="container bg-light d-flex justify-content-start mb-2 rounded"
      >
      <div id="roomCont" class="container rounded-pill">
        <h1 id="roomName">
          ${element.id}: ${element.name} - ${element.type}
          <button type="button" class="btn btn-secondary ms-3" id="addNewItem">
            Add New Item
          </button>
        </h1>
        <hr />
        <div id="itemColName" class="row row-cols-3">
          <div class="col">Item number</div>
          <div class="col">Category</div>
          <div class="col">Item Name</div>
        </div>
        <hr />
      </div>
      </div>`);
        main.append($mainRoomCont);
        hideRoomsButton.on("click", function () {
          main.hide();
          hideRoomsButton.detach();
        });
      });
    });
});

newHomeButton.addEventListener("click", function () {
  main.show();
  newHomeCont.toggle();
});

newHomeSub.on("click", function () {
  let body = {
    type: typeIn.val(),
    name: nameIn.val(),
    state: stateIn.val(),
    city: cityIn.val(),
    zip: zipIn.val(),
  };
  fetch("https://mvp-back-end.onrender.com/api/mvp/home/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  newHomeCont.toggle();
});

newHomeCancel.on("click", function () {
  newHomeCont.toggle();
});

newRoomButton.on("click", function () {
  main.show();
  newRoomCont.toggle();
});

newRoomSubmit.on("click", function () {
  let body = {
    home: homeRoomIn.val(),
    type: typeRoomIn.val(),
    name: nameRoomIn.val(),
  };
  fetch("https://mvp-back-end.onrender.com/api/mvp/rooms/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  let $mainRoomCont = $(`<div
id="mainRoomCont"
class="container bg-light d-flex justify-content-start mb-2"
>
<div id="roomCont" class="container">
  <h1 id="roomName">
    ${body.name} - ${body.type}
    <button type="button" class="btn btn-secondary ms-3" id="addNewItem">
      Add New Item
    </button>
  </h1>
  <hr />
  <div id="itemColName" class="row row-cols-3">
    <div class="col">Item number</div>
    <div class="col">Category</div>
    <div class="col">Item Name</div>
  </div>
  <hr />
</div>
</div>`);
  main.append($mainRoomCont);
  newRoomCont.toggle();
});

newRoomCancel.on("click", function () {
  newRoomCont.toggle();
});
