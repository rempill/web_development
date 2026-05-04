// handle field dependencies
$(function() {
    // county -> city dependency
    const $countySelect = $("#county");
    const $citySelect = $("#city");
    if ($countySelect.length && $citySelect.length && typeof counties !== "undefined") {
        $countySelect.on("change", function () {
            const selected=counties.find(c => c.name === $countySelect.val());
            $citySelect.html('<option value="">Alege orașul</option>');
            if (selected) {
                selected.cities.forEach(city =>{
                    const $opt=$("<option>");
                    $opt.val(city);
                    $opt.text(city);
                    $citySelect.append($opt);
                });
            }
        });
        // trigger once on load
        $countySelect.trigger("change");
    }

    // feedback/newsletter option -> types of feedbacks/newsletters
    const $optionSelect = $("#fb-option");
    const $typeSelect = $("#fb-type");
    if ($optionSelect.length && $typeSelect.length && typeof fb_options !== "undefined") {
        $optionSelect.on("change", function () {
            const selected=fb_options.find(o => o.name === $optionSelect.val());
            $typeSelect.html('<option value="">Alege tipul</option>');
            if (selected) {
                selected.fb_types.forEach(type =>{
                    const $opt=$("<option>");
                    $opt.val(type);
                    $opt.text(type);
                    $typeSelect.append($opt);
                });
            }
        });
        // trigger once on load
        $typeSelect.trigger("change");
    }
});