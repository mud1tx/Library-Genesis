"use strict";
const loginArrow = document.querySelector(".login_arrow");
const userName = document.querySelector(".user_name");
const pin = document.querySelector(".pin");
const loginPage = document.querySelector(".login_page");
const slidingBtn = document.querySelector(".front_page_btns");
const banner = document.getElementById("banner");
const ul = document.querySelector(".lists");
const loggingOut = document.querySelector(".log_out_button");
const luck = document.querySelector(".luck");
const front_page_container = document.querySelector(".front_page_container");
const menuBar = document.querySelector(".menu");
const header_links = document.querySelector(".header_links");
const navCross = document.querySelector(".nav_cross");
const books = document.querySelectorAll("#books");
const pdf = document.querySelector(".pdf");
const overlay = document.querySelector(".overlay");
const navOverlay = document.querySelector(".nav_overlay");
const author = document.querySelectorAll(".author");
const title = document.querySelectorAll(".title");
const search = document.querySelector(".search_box");
const bookCont = document.querySelectorAll(".book_context");
const bookmarker = document.querySelector(".bookmarker");
const bookmarks = document.querySelectorAll(".bookmark");
const bookmarkerContainer = document.querySelector(".bookmark_container");
const seebk = document.querySelector(".see_bookmark");
const bookScroll = document.querySelector(".front_page_btn");
const bookSection = document.querySelector(".book_section");
const bookHeaderScroll = document.querySelector(".book_Selecter");
const AboutScroll = document.querySelector(".About_Scrooler");
const ContactScroll = document.querySelector(".Contact_Scrooler");
const aboutSection = document.querySelector(".about_us_section");
const contactSection = document.querySelector(".contact_us_section");

///////////////////////
// users and there pin
/////////////////////
const account1 = {
  firstName: "Mudit",
  lastName: "Agarwal",
  pin: 1111,
};
const account2 = {
  firstName: "Aman",
  lastName: "Trivedi",
  pin: 2222,
};
const account3 = {
  firstName: "Yash",
  lastName: "Tiwari",
  pin: 3333,
};
const account4 = {
  firstName: "Khushi",
  lastName: "Singh",
  pin: 4444,
};

///////////////////////////
// contain all users array
/////////////////////////
const accounts = [account1, account2, account3, account4];

///////////////////////////////////////////////////////
//creating username and adding in each account program
/////////////////////////////////////////////////////
accounts.forEach(function (acc) {
  const fullName = (
    acc.firstName.slice(0, 1) + acc.lastName.slice(0, 1)
  ).toLowerCase();
  acc.userName = fullName;
});
// console.log(accounts);

///////////////////////////////////////////////////////
//checking the inputs and performing operation program
/////////////////////////////////////////////////////

let currentUser;
loginArrow.addEventListener("click", function () {
  accounts.forEach(function (acc) {
    if (userName.value === acc.userName && Number(pin.value) === acc.pin) {
      userName.value = "";
      pin.value = "";
      loginPage.classList.add("hidden_div");
      currentUser = acc.firstName;
      luck.classList.remove("hidden_div");

      var node = document.createElement("h1");
      node.innerHTML = `Hello ${acc.firstName},<br />Welcome back!!😁`;
      node.style.fontSize = "2.8rem";
      front_page_container.insertAdjacentElement("afterbegin", node);
    } else if (
      userName.value !== acc.userName ||
      Number(pin.value) !== acc.pin
    ) {
    }
  });
});

///////////
// log out
/////////
loggingOut.addEventListener("click", function () {
  luck.classList.add("hidden_div");
  loginPage.classList.remove("hidden_div");
  front_page_container.removeChild(front_page_container.firstElementChild);
});

//////////////////////////////////////////////////
// main page image change button programmatically
////////////////////////////////////////////////
const kp = [...ul.children];

kp.forEach(function (mov, ind) {
  mov.addEventListener("click", function () {
    kp.forEach(function (move) {
      move.classList.remove("front_page_btn_active");
    });
    mov.classList.add("front_page_btn_active");
    banner.src = `./image/front_image ${ind + 1}.jpg`;
    banner.classList.add("zoom");
    setTimeout(function () {
      banner.classList.remove("zoom");
    }, 500);
  });
});

////////////////////////////////
// open and close modal program
//////////////////////////////

const arr = [...pdf.children];
const b = [...books];

bookCont.forEach(function (bk, ind) {
  bk.addEventListener("click", function () {
    openModal(ind);
    closeModal(ind);
  });
});

const openModal = function (ind) {
  arr[ind].classList.remove("hidden_div");
  overlay.classList.remove("hidden_overlay");
  pdf.classList.remove("hidden_div");
};
const closeModal = function (ind) {
  overlay.addEventListener("click", function () {
    pdf.classList.add("hidden_div");
    arr[ind].classList.add("hidden_div");
    overlay.classList.add("hidden_overlay");
  });
};

//////////////////
// search program
////////////////
const titleContainer = [];
const authorContainer = [];

const authors = [...author];
authors.forEach(function (au) {
  authorContainer.push(
    au.textContent
      .split(" ")
      .map((v) => v.toLowerCase())
      .join(" ")
  );
});
const titles = [...title];
titles.forEach(function (tit) {
  titleContainer.push(
    tit.textContent
      .split(" ")
      .map((v) => v.toLowerCase())
      .join(" ")
  );
});
search.addEventListener("keyup", function () {
  search.value = search.value.toLowerCase();
  books.forEach(function (bk) {
    bk.classList.add("hidden_div");
  });
  titleContainer.forEach(function (tit, ind) {
    if (tit.includes(search.value)) {
      books[ind].classList.remove("hidden_div");
    }
  });
  authorContainer.forEach(function (au, ind) {
    if (au.includes(search.value)) {
      books[ind].classList.remove("hidden_div");
    }
  });
});

///////////
//bookmark
/////////

const bkm = [...bookmarks];

const titleCo = [];
const authorCo = [];

titles.forEach(function (tit) {
  titleCo.push(tit.textContent);
});
authors.forEach(function (au) {
  authorCo.push(au.textContent);
});
bkm.forEach(function (bm, index) {
  bm.addEventListener("click", function () {
    var node = document.createElement("LI");
    node.classList.add(`book_lol`);

    node.innerHTML = `
    <p class="cross">❌</p>
  <div class="lister">
      <div class="book_imga">
        <img class="booker_first_image"
        src="./image/${titleCo[index]}.jpeg"
        alt=""
        />
      </div>
    <div class="texter">
      <p class="title">${titleCo[index]}<br>By <br>${authorCo[index]}</p>
    </div>
  </div>`;
    bookmarker.appendChild(node);
    const cross = document.querySelectorAll(".cross");

    for (var i = 0; i < cross.length; i++) {
      cross[i].onclick = function () {
        var element = this.parentElement;
        bookmarker.removeChild(element);
      };
    }
  });
});

seebk.addEventListener("click", function (e) {
  e.preventDefault();
  bookmarkOpener();
  closeBookmarkModal();
});

const bookmarkOpener = function () {
  bookmarkerContainer.classList.remove("hidden_bookmark");
  overlay.classList.remove("hidden_overlay");
};

const closeBookmarkModal = function () {
  overlay.addEventListener("click", function () {
    bookmarkerContainer.classList.add("hidden_bookmark");
    overlay.classList.add("hidden_overlay");
  });
};

const menuBarModal = function () {
  header_links.classList.toggle("side_header_links");
  header_links.classList.toggle("header_links");
  navCross.classList.toggle("hide_nav_cross");
  navModalOpener();
};

const navModalOpener = function () {
  navOverlay.classList.toggle("hidden_nav_overlay");
};
menuBar.addEventListener("click", function () {
  menuBarModal();
});

const navModelClose = function () {
  navOverlay.classList.toggle("hidden_nav_overlay");
  header_links.classList.toggle("side_header_links");
  header_links.classList.toggle("header_links");
  navCross.classList.toggle("hide_nav_cross");
};

navCross.addEventListener("click", function () {
  navModelClose();
});
navOverlay.addEventListener("click", function () {
  navModelClose();
});
//////////////////////////////////

//////////////////
// book scroll
////////////////

bookScroll.addEventListener("click", function () {
  bookScroller();
});
bookHeaderScroll.addEventListener("click", function () {
  bookScroller();
});
const bookScroller = function () {
  bookSection.scrollIntoView({ behavior: "smooth" });
};

//////////////////
// about scroll
////////////////
AboutScroll.addEventListener("click", function () {
  aboutSection.scrollIntoView({ behavior: "smooth" });
});

//////////////////
// contact scroll
////////////////
ContactScroll.addEventListener("click", function () {
  contactSection.scrollIntoView({ behavior: "smooth" });
});
