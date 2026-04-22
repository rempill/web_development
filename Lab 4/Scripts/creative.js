// Live Coffee Order Summary
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('order-form');
    const summary = document.getElementById('order-summary');
    if (!form || !summary) return;
    function updateSummary() {
        let txt = '<h3>Rezumat comandă:</h3><ul>';
        const data = new FormData(form);
        for (const [key, value] of data.entries()) {
            if (value) txt += `<li><b>${key}:</b> ${value}</li>`;
        }
        txt += '</ul>';
        summary.innerHTML = txt;
    }
    form.addEventListener('input', updateSummary);
    form.addEventListener('change', updateSummary);
    updateSummary();
});

