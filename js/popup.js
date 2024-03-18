const input = document.querySelector("#input-text");
const output = document.querySelector("#output-text");
const switchBtn = document.querySelector("#switch-btn");
const copyBtn = document.querySelector("#copy-btn");
const refreshBtn = document.querySelector("#refresh-btn");
const langsLabels = document.querySelectorAll(".lang");
const textCopiedBanner = document.querySelector(".text-copied");
const refreshTextBanner = document.querySelector(".refresh-text");
const translateBtn = document.querySelector("#translate-btn");

output.value = "";
const enCode = "en-GB";
const rusCode = "ru-RU";

translateBtn.addEventListener("click", () => {
  if (input.value == "") {
    output.value = "";
  } else {
    if (langsLabels[0].textContent == "English") {
      translate(enCode, rusCode, input.value);
    } else {
      translate(rusCode, enCode, input.value);
    }
  }
});

switchBtn.addEventListener("click", () => {
  langsLabels[0].textContent = [
    langsLabels[1].textContent,
    (langsLabels[1].textContent = langsLabels[0].textContent),
  ][0];
});

copyBtn.addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(output.value)
      .then(
        () => {
          textCopiedBanner.classList.remove("text-copied-animation");
        },
        (err) => {
          window.alert("There is an error during text coping", err);
        }
      )
      .then(() => {
        setTimeout(() => {
          textCopiedBanner.classList.add("text-copied-animation");
        }, 20);
      });
  } else {
    window.alert("copying to buffer is not possible");
  }
});

refreshBtn.addEventListener("click", () => {
  refreshTextBanner.classList.remove("refresh-text-animation");
  input.value = "";
  output.value = "";
  setTimeout(() => {
    refreshTextBanner.classList.add("refresh-text-animation");
  }, 20);
});

function translate(translateFrom, translateTo, textIn) {
  let apiURL = `https://api.mymemory.translated.net/get?q=${textIn}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => (output.value = data.responseData.translatedText));
}
