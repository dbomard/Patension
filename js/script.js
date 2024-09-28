document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const bibSelectElt = document.querySelector("#bibSelect");
  console.log(bibSelectElt);
  bibSelectElt.addEventListener("change", bibSelect);
  const weekendSelectors = document.querySelectorAll("#wekendSelect select");
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
  const weekendListElt = document.querySelector("#wekendSelect");
  const easter = document.querySelector("#easter");
  const pentecost = document.querySelector("#pentecost");
  const fridayAsc = document.querySelector("#fridayAsc");
  const saturdayAsc = document.querySelector("#saturdayAsc");

  if (weekendListHide) {
    const weekSelectEaster = document.querySelector("#weekSelectEaster");
    weekSelectEaster.value = "";
    const weekSelectPentecost = document.querySelector("#weekSelectPentecost");
    weekSelectPentecost.value = "";
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
      easterText = "je ne pose rien (jour de weekend)";
      fridayAscText = "je ne pose rien (jour de repos en compensation du lundi de Pâques)";
    } else {
      easterText = "je ne pose rien (je bénéficie du jour férié)";
      fridayAscText = "je pose CA, RTT ou RECHS";
    }
  } else if (weekend.name === "weekSelectPentecost") {
    if (e.currentTarget.value.includes("L")) {
      pentecostText =
        "je ne pose rien (jour de weekend)";
      saturdayAscText = "je pose RTT ou RECHS pour journée de solidarité";
    } else {
      pentecostText =
        "je pose RTT ou RECHS pour journée de solidarité";
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
        "jour de weekend",
        "jour de weekend",
        "jour de repos en compensation du lundi de Pâques",
        "je pose RTT ou RECHS pour journée de solidarité"
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
