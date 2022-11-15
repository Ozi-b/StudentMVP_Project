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
newItemCont.hide();
newHomeCont.hide();
newRoomCont.hide();

fetch("http://localhost:4000/api/mvp/home")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      console.log(element);
    });
  });

function addNewHome() {
  fetch("http://localhost:4000/api/mvp/home/1")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        typeIn.val();
      });
    });
}

showRoomsButton.on("click", function () {
  main.show();
  const hideRoomsButton = $(
    "<button type='button' class='btn btn-light ms-2'>Hide Rooms</button>"
  );
  contFluid.append(hideRoomsButton);
  fetch("http://localhost:4000/api/mvp/rooms")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        let $mainRoomCont = $(`<div
      id="mainRoomCont"
      class="container bg-light d-flex justify-content-start mb-2"
      >
      <div id="roomCont" class="container">
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
  fetch("http://localhost:4000/api/mvp/home/1", {
    method: "PUT",
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
  newRoomCont.toggle();
});

newRoomSubmit.on("click", function () {
  let body = {
    home: homeRoomIn.val(),
    type: typeRoomIn.val(),
    name: nameRoomIn.val(),
  };
  fetch("http://localhost:4000/api/mvp/rooms/", {
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
