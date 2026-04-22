// handle field dependencies
document.addEventListener("DOMContentLoaded", function() {
    // county -> city dependency
    const countySelect = document.getElementById("county");
    const citySelect = document.getElementById("city");
    if (countySelect && citySelect && typeof counties !== "undefined") {
        countySelect.addEventListener("change", function () {
            const selected=counties.find(c => c.name === countySelect.value);
            citySelect.innerHTML='<option value="">Alege orașul</option>';
            if (selected) {
                selected.cities.forEach(city =>{
                    const opt=document.createElement("option");
                    opt.value=city;
                    opt.textContent=city;
                    citySelect.appendChild(opt);
                });
            }
        });
        // trigger once on load
        countySelect.dispatchEvent(new Event("change"));
    }

    // feedback/newsletter option -> types of feedbacks/newsletters
    const optionSelect = document.getElementById("fb-option");
    const typeSelect = document.getElementById("fb-type");
    if (optionSelect && typeSelect && typeof fb_options !== "undefined") {
        optionSelect.addEventListener("change", function () {
            const selected=fb_options.find(o => o.name === optionSelect.value);
            typeSelect.innerHTML='<option value="">Alege tipul</option>';
            if (selected) {
                selected.fb_types.forEach(type =>{
                    const opt=document.createElement("option");
                    opt.value=type;
                    opt.textContent=type;
                    typeSelect.appendChild(opt);
                });
            }
        });
        // trigger once on load
        typeSelect.dispatchEvent(new Event("change"));
    }
});