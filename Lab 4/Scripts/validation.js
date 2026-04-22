console.log("validation.js loaded");
document.addEventListener('DOMContentLoaded', function () {
    // Attach validation to all forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function (e) {
            let valid = true;
            let messages = [];

            function setFieldValidity(field, isValid) {
                if (!isValid) {
                    field.classList.add('invalid');
                } else {
                    field.classList.remove('invalid');
                }
            }

            // Nume
            const numeField = form.elements['nume'];
            if (numeField) {
                const nume = numeField.value.trim();
                const numeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(nume);
                setFieldValidity(numeField, numeValid);
                if (!numeValid) {
                    valid = false;
                    messages.push('Introduceți un nume valid (doar litere, 2-50 caractere).');
                }
            }

            // Prenume
            const prenumeField = form.elements['prenume'];
            if (prenumeField) {
                const prenume = prenumeField.value.trim();
                const prenumeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(prenume);
                setFieldValidity(prenumeField, prenumeValid);
                if (!prenumeValid) {
                    valid = false;
                    messages.push('Introduceți un prenume valid (doar litere, 2-50 caractere).');
                }
            }

            // sg-nume (widgets)
            const sgNumeField = form.elements['sg-nume'];
            if (sgNumeField) {
                const sgNume = sgNumeField.value.trim();
                const sgNumeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(sgNume);
                setFieldValidity(sgNumeField, sgNumeValid);
                if (!sgNumeValid) {
                    valid = false;
                    messages.push('Introduceți un nume valid pentru sugestie (doar litere, 2-50 caractere).');
                }
            }

            // sg-prenume (widgets)
            const sgPrenumeField = form.elements['sg-prenume'];
            if (sgPrenumeField) {
                const sgPrenume = sgPrenumeField.value.trim();
                const sgPrenumeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(sgPrenume);
                setFieldValidity(sgPrenumeField, sgPrenumeValid);
                if (!sgPrenumeValid) {
                    valid = false;
                    messages.push('Introduceți un prenume valid pentru sugestie (doar litere, 2-50 caractere).');
                }
            }

            // sg-description (widgets)
            const sgDescField = form.elements['sg-description'];
            if (sgDescField) {
                const sgDesc = sgDescField.value.trim();
                const sgDescValid = sgDesc.length >= 10;
                setFieldValidity(sgDescField, sgDescValid);
                if (!sgDescValid) {
                    valid = false;
                    messages.push('Descrierea sugestiei trebuie să aibă cel puțin 10 caractere.');
                }
            }

            // sg-data (widgets, optional, but if present must be a valid date >= today)
            const sgDataField = form.elements['sg-data'];
            if (sgDataField && sgDataField.value) {
                const sgData = sgDataField.value;
                const today = new Date();
                const inputDate = new Date(sgData);
                // Only check if input is a valid date and not in the past
                const sgDataValid = !isNaN(inputDate) && inputDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
                setFieldValidity(sgDataField, sgDataValid);
                if (!sgDataValid) {
                    valid = false;
                    messages.push('Data preferată trebuie să fie astăzi sau în viitor.');
                }
            }

            // fb-name (feedback/newsletter)
            const fbNameField = form.elements['fb-name'];
            if (fbNameField) {
                const fbName = fbNameField.value.trim();
                const fbNameValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(fbName);
                setFieldValidity(fbNameField, fbNameValid);
                if (!fbNameValid) {
                    valid = false;
                    messages.push('Introduceți un nume valid pentru feedback/newsletter (doar litere, 2-50 caractere).');
                }
            }

            // fb-message (feedback/newsletter)
            const fbMsgField = form.elements['fb-message'];
            if (fbMsgField) {
                const fbMsg = fbMsgField.value.trim();
                const fbMsgValid = fbMsg.length >= 10;
                setFieldValidity(fbMsgField, fbMsgValid);
                if (!fbMsgValid) {
                    valid = false;
                    messages.push('Mesajul trebuie să aibă cel puțin 10 caractere.');
                }
            }

            // Telefon
            const telefonField = form.elements['telefon'];
            if (telefonField) {
                const telefon = telefonField.value.trim();
                const telefonValid = /^(07\d{8}|(\+40|0040)7\d{8})$/.test(telefon);
                setFieldValidity(telefonField, telefonValid);
                if (!telefonValid) {
                    valid = false;
                    messages.push('Introduceți un număr de telefon valid din România.');
                }
            }

            // Județ
            const countyField = form.elements['county'];
            if (countyField) {
                const county = countyField.value;
                const countyValid = !!county;
                setFieldValidity(countyField, countyValid);
                if (!countyValid) {
                    valid = false;
                    messages.push('Selectați județul.');
                }
            }

            // Oraș
            const cityField = form.elements['city'];
            if (cityField) {
                const city = cityField.value;
                const cityValid = !!city;
                setFieldValidity(cityField, cityValid);
                if (!cityValid) {
                    valid = false;
                    messages.push('Selectați orașul.');
                }
            }

            // Adresă
            const adresaField = form.elements['adresa'];
            if (adresaField) {
                const adresa = adresaField.value.trim();
                const adresaValid = adresa.length >= 5 && adresa.length <= 100;
                setFieldValidity(adresaField, adresaValid);
                if (!adresaValid) {
                    valid = false;
                    messages.push('Introduceți o adresă validă (5-100 caractere).');
                }
            }

            // Selecția de boabe
            const boabeField = form.elements['nume_boabe'];
            if (boabeField) {
                let selectedBoabe = 0;
                for (let i = 0; i < boabeField.options.length; i++) {
                    if (boabeField.options[i].selected) selectedBoabe++;
                }
                const boabeValid = selectedBoabe > 0;
                setFieldValidity(boabeField, boabeValid);
                if (!boabeValid) {
                    valid = false;
                    messages.push('Selectați cel puțin un sortiment de boabe.');
                }
            }

            // Gramaj (radio buttons)
            const gramajFields = form.elements['gramaj'];
            if (gramajFields) {
                let gramaj = '';
                if (gramajFields.length !== undefined) {
                    for (let i = 0; i < gramajFields.length; i++) {
                        if (gramajFields[i].checked) {
                            gramaj = gramajFields[i].value;
                            break;
                        }
                    }
                } else {
                    if (gramajFields.checked) gramaj = gramajFields.value;
                }
                const gramajValid = ['250', '500', '1000'].includes(gramaj);
                if (gramajFields.length !== undefined) {
                    for (let i = 0; i < gramajFields.length; i++) {
                        setFieldValidity(gramajFields[i], gramajValid);
                    }
                } else {
                    setFieldValidity(gramajFields, gramajValid);
                }
                if (!gramajValid) {
                    valid = false;
                    messages.push('Selectați gramajul.');
                }
            }

            // Cantitate pungi
            const cantitateField = form.elements['cantitate'];
            if (cantitateField) {
                const cantitate = parseInt(cantitateField.value, 10);
                const cantitateValid = !isNaN(cantitate) && cantitate >= 1 && cantitate <= 20;
                setFieldValidity(cantitateField, cantitateValid);
                if (!cantitateValid) {
                    valid = false;
                    messages.push('Introduceți o cantitate de pungi între 1 și 20.');
                }
            }

            // Show errors if any
            if (!valid) {
                e.preventDefault();
                alert(messages.join('\n'));
            }
        });
    });
});
