document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const bibSelectElt = document.querySelector("#bibSelect");
  console.log(bibSelectElt);
  bibSelectElt.addEventListener("change", bibSelect);
  const weekendSelectors = document.querySelectorAll("#weekendSelect select");
  weekendSelectors.forEach((elt) => {
    elt.addEventListener("change", weekendSelect);
  });
});

function setResults(
  weekendListHide,
  easterText,
  pentecostText,
  fridayAscText,
  saturdayAscText
) {
  const weekendListElt = document.querySelector("#weekendSelect");
  const easter = document.querySelector("#easter");
  const pentecost = document.querySelector("#pentecost");
  const fridayAsc = document.querySelector("#fridayAsc");
  const saturdayAsc = document.querySelector("#saturdayAsc");

  if (weekendListHide) {
    const weekSelectEaster = document.querySelector("#weekSelectEaster");
    weekSelectEaster.value = "";
    const weekSelectPentecost = document.querySelector("#weekSelectPentecost");
    weekSelectPentecost.value = "";
    const weekSelectAscension = document.querySelector("#weekSelectAscension");
    weekSelectAscension.value = "";
  }
  weekendListElt.hidden = weekendListHide;
  easter.innerText = easterText;
  pentecost.innerText = pentecostText;
  fridayAsc.innerText = fridayAscText;
  saturdayAsc.innerText = saturdayAscText;
}

function weekendSelect(e) {
  const weekend = e.currentTarget;
  let easterText = document.querySelector("#easter").innerText;
  let pentecostText = document.querySelector("#pentecost").innerText;
  let fridayAscText = document.querySelector("#fridayAsc").innerText;
  let saturdayAscText = document.querySelector("#saturdayAsc").innerText;

  if (weekend.name === "weekSelectEaster") {
    if (e.currentTarget.value.includes("L")) {
      easterText = "je ne pose rien (jour de weekend). Jour férié perdu";
    } else {
      easterText = "je ne pose rien (je bénéficie du jour férié)";
    }
  } else if (weekend.name === "weekSelectPentecost") {
    if (e.currentTarget.value.includes("L")) {
      pentecostText = "je ne pose rien (jour de weekend). Jour férié perdu";
      fridayAscText = "je pose RTT ou RECHS pour journée de solidarité";
    } else {
      pentecostText = "je pose RTT ou RECHS pour journée de solidarité";
      fridayAscText = "je pose CA, RTT ou RECHS";
    }
  } else if (weekend.name === "weekSelectAscension") {
    if (e.currentTarget.value.includes("S")) {
      saturdayAscText = "je ne pose rien (jour de weekend)";
    } else {
      saturdayAscText = "je pose CA, RTT ou RECHS";
    }
  }
  setResults(false, easterText, pentecostText, fridayAscText, saturdayAscText);
}

function bibSelect(e) {
  const currentBib = e.currentTarget.value;
  switch (currentBib) {
    case "VAL":
    case "GIB":
    case "PIL":
      setResults(
        true,
        "je ne pose rien. jour de weekend",
        "je ne pose rien. jour de weekend",
        "je pose RTT ou RECHS pour journée de solidarité",
        "je ne pose rien. jour de repos en compensation du lundi de Pâques"
      );
      break;
    case "MED":
      console.log("Médiathèque");
      setResults(false, "", "", "", "");
      break;
    default:
      setResults(true, "", "", "", "");
      break;
  }
}
