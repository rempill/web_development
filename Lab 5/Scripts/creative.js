// Live Coffee Order Summary
$(function() {
    const $form = $('#order-form');
    const $summary = $('#order-summary');
    if (!$form.length || !$summary.length) return;
    function updateSummary() {
        let txt = '<h3>Rezumat comandă:</h3><ul>';
        const data = new FormData($form[0]);
        for (const [key, value] of data.entries()) {
            if (value) txt += `<li><b>${key}:</b> ${value}</li>`;
        }
        txt += '</ul>';
        $summary.html(txt);
    }
    $form.on('input', updateSummary);
    $form.on('change', updateSummary);
    updateSummary();
});

