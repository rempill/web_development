console.log("validation.js loaded");
$(function () {
    // Attach validation to all forms on the page
    $('form').each(function() {
        const $form=$(this);
        $form.on('submit', function (e) {
            let valid = true;
            let messages = [];

            function setFieldValidity($field, isValid) {
                if (!isValid) {
                    $field.addClass('invalid');
                } else {
                    $field.removeClass('invalid');
                }
            }

            // Nume
            const $numeField= $form.find('[name="nume"]');
            if ($numeField.length) {
                const nume = $numeField.val().trim();
                const numeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(nume);
                setFieldValidity($numeField, numeValid);
                if (!numeValid) {
                    valid = false;
                    messages.push('Introduceți un nume valid (doar litere, 2-50 caractere).');
                }
            }

            // Prenume
            const $prenumeField = $form.find('[name="prenume"]');
            if ($prenumeField.length) {
                const prenume = $prenumeField.val().trim();
                const prenumeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(prenume);
                setFieldValidity($prenumeField, prenumeValid);
                if (!prenumeValid) {
                    valid = false;
                    messages.push('Introduceți un prenume valid (doar litere, 2-50 caractere).');
                }
            }

            // sg-nume (widgets)
            const $sgNumeField = $form.find('[name="sg-nume"]');
            if ($sgNumeField.length) {
                const sgNume = $sgNumeField.val().trim();
                const sgNumeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(sgNume);
                setFieldValidity($sgNumeField, sgNumeValid);
                if (!sgNumeValid) {
                    valid = false;
                    messages.push('Introduceți un nume valid pentru sugestie (doar litere, 2-50 caractere).');
                }
            }

            // sg-prenume (widgets)
            const $sgPrenumeField = $form.find('[name="sg-prenume"]');
            if ($sgPrenumeField.length) {
                const sgPrenume = $sgPrenumeField.val().trim();
                const sgPrenumeValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(sgPrenume);
                setFieldValidity($sgPrenumeField, sgPrenumeValid);
                if (!sgPrenumeValid) {
                    valid = false;
                    messages.push('Introduceți un prenume valid pentru sugestie (doar litere, 2-50 caractere).');
                }
            }

            // sg-description (widgets)
            const $sgDescField = $form.find('[name="sg-description"]');
            if ($sgDescField.length) {
                const sgDesc = $sgDescField.val().trim();
                const sgDescValid = sgDesc.length >= 10;
                setFieldValidity($sgDescField, sgDescValid);
                if (!sgDescValid) {
                    valid = false;
                    messages.push('Descrierea sugestiei trebuie să aibă cel puțin 10 caractere.');
                }
            }

            // sg-data (widgets, optional, but if present must be a valid date >= today)
            const $sgDataField = $form.find('[name="sg-data"]');
            if ($sgDataField.length && $sgDataField.val()) {
                const sgData = $sgDataField.val();
                const today = new Date();
                const inputDate = new Date(sgData);
                // Only check if input is a valid date and not in the past
                const sgDataValid = !isNaN(inputDate) && inputDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
                setFieldValidity($sgDataField, sgDataValid);
                if (!sgDataValid) {
                    valid = false;
                    messages.push('Data preferată trebuie să fie astăzi sau în viitor.');
                }
            }

            // fb-name (feedback/newsletter)
            const $fbNameField = $form.find('[name="fb-name"]');
            if ($fbNameField.length) {
                const fbName = $fbNameField.val().trim();
                const fbNameValid = /^[A-Za-zĂÂÎȘȚăâîșț\s-]{2,50}$/.test(fbName);
                setFieldValidity($fbNameField, fbNameValid);
                if (!fbNameValid) {
                    valid = false;
                    messages.push('Introduceți un nume valid pentru feedback/newsletter (doar litere, 2-50 caractere).');
                }
            }

            // fb-message (feedback/newsletter)
            const $fbMsgField = $form.find('[name="fb-message"]');
            if ($fbMsgField.length) {
                const fbMsg = $fbMsgField.val().trim();
                const fbMsgValid = fbMsg.length >= 10;
                setFieldValidity($fbMsgField, fbMsgValid);
                if (!fbMsgValid) {
                    valid = false;
                    messages.push('Mesajul trebuie să aibă cel puțin 10 caractere.');
                }
            }

            // Telefon
            const $telefonField = $form.find('[name="telefon"]');
            if ($telefonField.length) {
                const telefon = $telefonField.val().trim();
                const telefonValid = /^(07\d{8}|(\+40|0040)7\d{8})$/.test(telefon);
                setFieldValidity($telefonField, telefonValid);
                if (!telefonValid) {
                    valid = false;
                    messages.push('Introduceți un număr de telefon valid din România.');
                }
            }

            // Județ
            const $countyField = $form.find('[name="county"]');
            if ($countyField.length) {
                const county = $countyField.val();
                const countyValid = !!county;
                setFieldValidity($countyField, countyValid);
                if (!countyValid) {
                    valid = false;
                    messages.push('Selectați județul.');
                }
            }

            // Oraș
            const $cityField = $form.find('[name="city"]');
            if ($cityField.length) {
                const city = $cityField.val();
                const cityValid = !!city;
                setFieldValidity($cityField, cityValid);
                if (!cityValid) {
                    valid = false;
                    messages.push('Selectați orașul.');
                }
            }

            // Adresă
            const $adresaField = $form.find('[name="adresa"]');
            if ($adresaField.length) {
                const adresa = $adresaField.val().trim();
                const adresaValid = adresa.length >= 5 && adresa.length <= 100;
                setFieldValidity($adresaField, adresaValid);
                if (!adresaValid) {
                    valid = false;
                    messages.push('Introduceți o adresă validă (5-100 caractere).');
                }
            }

            // Selecția de boabe
            const $boabeField = $form.find('[name="nume_boabe"]');
            if ($boabeField.length) {
                let selectedBoabe = 0;
                $boabeField.find('option').each(function() {
                    if (this.selected) selectedBoabe++;
                });
                const boabeValid = selectedBoabe > 0;
                setFieldValidity($boabeField, boabeValid);
                if (!boabeValid) {
                    valid = false;
                    messages.push('Selectați cel puțin un sortiment de boabe.');
                }
            }

            // Gramaj (radio buttons)
            const $gramajFields = $form.find('[nume="gramaj"]');
            let gramaj='';
            $gramajFields.each(function(){
               if ($(this).is(':checked')) {
                   gramaj=$(this).val();
               }
            });
            const gramajValid=['250','500','1000'].includes(gramaj);
            $gramajFields.each(function(){
               setFieldValidity($(this),gramajValid);
            });
            if (!gramajValid){
                valid = false;
                messages.push('Selectati gramajul. ');
            }

            // Cantitate pungi
            const $cantitateField = $form.find('[name="cantitate"]');
            if ($cantitateField.length) {
                const cantitate=parseInt($cantitateField.val(),10);
                const cantitateValid=!isNaN(cantitate) && cantitate>=1 && cantitate <=20;
                setFieldValidity($cantitateField, cantitateValid);
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
