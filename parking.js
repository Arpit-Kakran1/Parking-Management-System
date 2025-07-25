let button = document.getElementById('btn1');
button.addEventListener('click', createTable);

let names = document.getElementById('name');
let plate = document.getElementById('plate');
let model = document.getElementById('model');
let phone = document.getElementById('phone');
let nameErrors = document.getElementById('nameError');
let phoneErrors = document.getElementById('phoneError');
let plateErrors = document.getElementById('plateError');
let modelErrors = document.getElementById('modelError');
let ModalFooter = document.getElementById("modalFooter");
let ModalBody = document.getElementById("modalBody");
let ModalHeader = document.getElementById("modalHeader");
let Modaltitle = document.getElementById("receiptModalLabel");
const myModal = document.getElementById('receiptModal');

let plateArray = [];

let print = document.createElement('input');
print.type = "button";
print.id = "downloadBtn"
print.value = "DOWNLOAD";
print.style = " background: yellow; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;";

function clear() {
  names.value = ``;
  plate.value = ``;
  model.value = ``;
  phone.value = '+251';
}

let counter = 0;

function createTable() {
  let na = document.getElementById('name').value;
  if (na == "") {
    nameErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> Name must be filled out`;
    nameErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
    return;
  }
  if (na != "") {
    nameErrors.innerHTML = ``;
  }

  let pho = document.getElementById('phone').value;
  if (pho == "") {
    phoneErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> Phone Number must be filled out`;
    phoneErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
    return;
  }
  if (pho.length != 10) {
    phoneErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> Phone Number must be 10 digits`;
    phoneErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
    return;
  }
  if (pho != "") {
    phoneErrors.innerHTML = ``;
  }

  let pla = document.getElementById('plate').value;
  if (pla == "") {
    plateErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> License plate must be filled out`;
    plateErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
    return;
  }
  if (/\s/.test(pla)) {
    plateErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> No spaces allowed`;
    plateErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
    return;
  }
  if (pla != "") {
    plateErrors.innerHTML = ``;
  }

  let mod = document.getElementById('model').value;
  if (mod == "") {
    modelErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> Car Model must be filled out`;
    modelErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
    return;
  }
  if (mod != "") {
    modelErrors.innerHTML = ``;
  }

  let table = document.getElementById("parkingtable");
  let row = table.insertRow();
  let innerRow = document.getElementById('parkingtable').rows.length;
  row.id = innerRow;

  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);
  let cell5 = row.insertCell(5);
  let cell6 = row.insertCell(6);
  counter++;

  cell0.innerHTML = counter;
  cell1.innerHTML = names.value;
  cell2.innerHTML = phone.value;
  cell4.innerHTML = model.value;
  plateArray[counter] = plate.value;
  cell3.innerHTML = plateArray[counter];

  for (var i = 0; i < plateArray.length - 1; i++) {
    if (plateArray.length > 2 && plateArray[i] == plateArray[counter]) {
      plateErrors.innerHTML = `<i class="bi bi-exclamation-circle"></i> License plate number already exists`;
      plateErrors.style = `color: red;font-size: 11px;margin-top:0.3em`;
      const element = document.getElementById(innerRow);
      element.remove(innerRow);
      return;
    }
    else if (plateArray.length > 2 && plateArray[i] != plateArray[counter]) {
      plateErrors.innerHTML = ``;
    }
  }

  clear();

  let date = new Date();
  cell5.innerHTML = date.toUTCString();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let secondsinMinutes = seconds / 60;
  let arrivalTimeinMinutes = (hours * 60) + minutes + (Math.floor(secondsinMinutes));

  let remover = document.createElement('input');
  remover.type = "button";
  remover.id = "removebtn"
  remover.value = "REMOVE";
  remover.style = " background: red; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 .3rem;padding-left: .9rem;padding-right: .9rem; text-align: center;color:black;border-radius:7px;";
  cell6.appendChild(remover);

  remover.onclick = function removeRow() {
    const element = document.getElementById(innerRow);
    element.remove(innerRow);
    createReceiptTable();
  }

  function createReceiptTable() {
    let Rtable = document.getElementById("receipttable");
    let rowr = Rtable.insertRow();
    rowr.id = 'receiptTableRow';

    let Rcell0 = rowr.insertCell(0);
    let Rcell1 = rowr.insertCell(1);
    let Rcell2 = rowr.insertCell(2);
    let Rcell3 = rowr.insertCell(3);
    let Rcell4 = rowr.insertCell(4);
    let Rcell5 = rowr.insertCell(5);
    let Rcell6 = rowr.insertCell(6);

    let currrentTime = new Date();
    let currenthours = currrentTime.getHours();
    let currentminutes = currrentTime.getMinutes();
    let currentSeconds = currrentTime.getSeconds();
    let currentSecondsinMinutes = (currentSeconds) / 60;
    let currrentTimeinMinutes = (currenthours * 60) + currentminutes + (Math.floor(currentSecondsinMinutes));

    let minutesLapsed = currrentTimeinMinutes - arrivalTimeinMinutes;
    let totaldue = Math.floor(minutesLapsed) * 1;

    Rcell0.innerHTML = cell1.innerHTML;
    Rcell1.innerHTML = cell2.innerHTML;
    Rcell2.innerHTML = cell3.innerHTML;
    Rcell3.innerHTML = cell4.innerHTML;
    Rcell4.innerHTML = minutesLapsed;
    Rcell5.innerHTML = totaldue;

    let view = document.createElement('input');
    view.type = "button";
    view.id = "downloadBtn"
    view.value = "VIEW";
    view.style = " background: royalblue; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 .3rem;padding-left: .8rem;padding-right: .8rem; text-align: center;color:black;border-radius:7px;margin-right:.2rem;";
    Rcell6.appendChild(view);
    view.setAttribute("data-bs-toggle", "modal");
    view.setAttribute("data-bs-target", "#receiptModal");

    let removerR = document.createElement('input');
    removerR.type = "button";
    removerR.id = "removebtn2";
    removerR.value = "REMOVE";
    removerR.style = " background: red; border: 0; font-size: 11px; font-weight: 600;padding-left: .9rem;padding-right: .9rem; line-height: 2.5;  outline: transparent; padding: 0 .3rem; text-align: center;color:black;border-radius:7px;margin-top:0.3em;";
    Rcell6.appendChild(removerR);

    function removeRows() {
      for (var i = 0; i < plateArray.length; i++) {
        if (plateArray[i] == plate.value) {
          delete plateArray[i];
        }
      }
      const elements = document.getElementById('receiptTableRow');
      elements.remove('receiptTableRow');
      return
    }

    removerR.addEventListener('click', removeRows);

    ModalFooter.appendChild(print);

    let receiptDateandTime = new Date()
    let receiptDate = receiptDateandTime.getDate() + "/" + receiptDateandTime.getMonth() + "/" + receiptDateandTime.getFullYear()

    ModalBody.innerHTML = `
          <center><h3><i class="fa fa-info-circle" aria-hidden="true"></i> Parking Details </h3></center>
          <br>
          <p style="text-align:right;position:relative;">Date: ${receiptDate}<p>
          <br>
          <p><i class="bi bi-person"></i> Name : &ensp;${Rcell0.innerHTML}</p>
          <p><i class="bi bi-telephone-forward"></i> Phone	: &ensp;${Rcell1.innerHTML}</p>
          <p><i class="fa fa-list-alt" aria-hidden="true"></i> Plate	:  &ensp;${Rcell2.innerHTML}<p>
          <p><i class="lni lni-car-alt"></i> Model	:  ${Rcell3.innerHTML}</p> 
          <p><i class="bi bi-clock"></i> Time In Minutes :  &ensp;${minutesLapsed}</p>	
          <p><i class="bi bi-cash"></i> Total Due In Rupes :  &ensp;${totaldue}</p>
          <br>
          <center><p><i class="bi bi-emoji-smile"></i> Thank you, come again</p></center>
          `;

    ModalHeader.style = `
          background-color:black;
          color:yellow;
          border-color: black;
          width: 22rem;
          `;
    ModalBody.style = `
          background-color:black;
          color:yellow;
          border-color: black;
          width: 22rem;
          `;
    Modaltitle.style = `
          background-color:black;
          color:yellow;
          text-align:center;
          border-color: black;
          width: 22rem;
          `;
    ModalFooter.style = `
          background-color:black;
          color:yellow;
          border-color: black;
          width: 22rem;
          `;

    print.onclick = function myfunc() {
      html2canvas(ModalBody).then(function (canvas) {
        canvas.toBlob(function (blob) {
          window.saveAs(blob, "Screenshot.png");
        });
      });
    };
  }
}
