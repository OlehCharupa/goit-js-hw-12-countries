import debounce from "lodash.debounce"
import template from "../template.hbs"
import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

let name;
const input = document.getElementById("get-country")
const url = `https://restcountries.eu/rest/v2/name/`
const countryBox = document.getElementById("country-box")



input.addEventListener("input", debounce(() => {
    name = input.value
    countryBox.innerHTML = ""
    fetch(`${url}${name}`)
        .then(data => data.json())
        .then(data => {
            const country = template(data)
            countryBox.insertAdjacentHTML("beforeend", country)
        })
        .catch((error) => console.log(error.message))
}, 1700))