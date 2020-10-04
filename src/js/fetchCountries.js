import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import debounce from "lodash.debounce"
import template from "../template.hbs"
// import { data } from "autoprefixer";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";


defaultModules.set(PNotifyMobile, {});

let name, notice;
const input = document.getElementById("get-country")
const url = `https://restcountries.eu/rest/v2/name/`
const countryBox = document.getElementById("country-box")



input.addEventListener("input", debounce(() => {
    name = input.value
    countryBox.innerHTML = ""

    fetch(`${url}${name}`)
        .then(data => {
            if (data.status == 200) {
                return data.json();
            } else if (!name) {
                countryBox.innerHTML = "";
            } else {
                notice = alert({ title: "Страна не найдена.", hide: true, delay: 1000 });
            }
            if (data.status == 404) {
                error({ text: "error 404" })
            }
        })
        .then(data => {
            if (data.length > 10) {
                return error({ text: "Введите более точный запрос страны" });
            }
            if (!data.length) {
                return error({ text: "Пустой запрос" })
            }
            const country = template(data)
            countryBox.insertAdjacentHTML("beforeend", country)
        })
        .catch((error) => console.log(error.message))
}, 400))