let hotelsArray = (function () {
    let hotels = [
        {
            name: 'Ozkayamag Falez',
            rating: 5,
            description: 'This property is 4 minutes walk from the beach. Ozkaymak Falez Hotel offers 2 outdoor pools, a children’s pool, an indoor pool, and a water slide. The hotel has a spa centre and 4 tennis courts. Ozkaymak’s private beach is 200 m away, and a shuttle is provided.',
            mealType: 'AI',
            features: ['wifi', 'beach', 'gym', 'conference'],
            region: 'Istanbul'
        },
        {
            name: 'Hotel SU And Aqualand',
            rating: 3,
            description: 'All rooms and suites at Hotel SU & Aqualand feature trendy interiors and mood lighting. Each has a private balcony with a sofa and central heating/cooling system. Special treats and complimentary toiletries are offered for each guest.',
            mealType: 'OB',
            features: ['wifi', 'beach'],
            region: 'Istanbul'
        },
        {
            name: 'Sealife Family',
            rating: 4,
            description: 'This property is 3 minutes walk from the beach. Directly facing blue-flagged Konyaalti Beach, Sealife is an extensive resort with facilities and activities for the whole family. It features pools with slides, a spa with body treatments, diving and snorkeling equipment.',
            mealType: 'BB',
            features: ['wifi', 'conference', 'beach'],
            region: 'Istanbul'
        },
        {
            name: 'Crowne Plaza',
            rating: 2,
            description: 'This property is 4 minutes walk from the beach. Set along the famous Konyaalti Beach, Crowne Plaza Antalya offers luxurious 5-star accommodation and open views of the Mediterranean Sea. It has indoor and outdoor pools, an extensive spa and free WiFi.',
            mealType: 'AI',
            features: ['wifi'],
            region: 'Antalya'
        },
        {
            name: 'Ritz Carlton',
            rating: 5,
            description: 'The most luxurious place in the world',
            mealType: 'AI',
            features: ['wifi', 'conference', 'beach'],
            region: 'Kemer'
        },
        {
            name: 'Royal Plaza',
            rating: 4,
            description: 'The most luxurious place in the world',
            mealType: 'BB',
            features: ['gym'],
            region: 'Istanbul'
        },
        {
            name: 'Sultan Palace',
            rating: 3,
            description: 'The most luxurious place in the world',
            mealType: 'OB',
            features: ['beach', 'gym'],
            region: 'Antalya'
        }
    ];
    return hotels;
})();


let render = (function () {
    const catalog = document.querySelector('.catalog');
    return {
        renderCards: renderCards,
        rerenderCards: rerenderCards
    };
    function renderCards(hotels) {
        let cardsArray = document.createDocumentFragment();
        hotels.forEach(function (hotel) {
            setValue(hotel, cardsArray);
        });
        catalog.appendChild(cardsArray);
    }
    function setValue(hotel, cardsArray) {
        const features = {
            'wifi': '💻',
            'beach': '🏖️',
            'gym': '🏋️',
            'conference': '👨‍💼'
        };
        const mealType = {
            'AI': 'All Inclusive',
            'OB': 'Breakfast only',
            'BB': 'Breakfast and Bed'
        };
        let offer = document.getElementById('offer').content.cloneNode(true);
        let newCard = offer.querySelector('.card');
        let featuresList = newCard.querySelector('.features-list');
        newCard.querySelector('.card-name').textContent = hotel.name;
        newCard.querySelector('.stars').textContent = '⭐'.repeat(hotel.rating);
        newCard.querySelector('.description').textContent = hotel.description;
        newCard.querySelector('.meal-type').textContent = mealType[hotel.mealType];
        newCard.querySelector('.region').textContent = hotel.region;
        for (let j = 0; j < hotel.features.length; j++) {
            for (let key in features) {
                if (hotel.features[j] === key) {
                    let li = document.createElement('li');
                    li.classList.add('feature-' + hotel.features[j]);
                    li.textContent = features[key];
                    featuresList.appendChild(li);
                }
            }
        }
        cardsArray.appendChild(newCard, featuresList);
    }
    function rerenderCards(arr) {
        while (catalog.firstChild) {
            catalog.removeChild(catalog.firstChild);
        }
        if (arr === undefined) {
            renderCards(hotelsArray);
        } else {
            renderCards(arr);
        }
    }
})();


let addNewHotel = (function () {
    return {
        newHotelForm: document.getElementById('new-hotel'),
        btnToCreateNewHotel: document.getElementById('create-new-hotel-btn'),
        newHotel: newHotel,
        toValidation: toValidation,
        checkRules: checkRules
    };


    function addError(name , errorWindow) {
        errorWindow.classList.add('error-window_' + name);
        const errorWindowField = document.querySelector('.error-window_' + name);
        const errorWindowFieldWrapp = document.querySelector('.error-window-' + name);
        if (name === 'name') {
            errorWindow.textContent = 'Пожалуйста, заполните данное поле! Название отеля должно иметь длину от 10 до 30 символов!';
        }
        if (name === 'rating') {
            errorWindow.textContent = 'Пожалуйста, заполните данное поле! Введите число от 1 до 5!';
        }
        if (errorWindowField !== null) {
            errorWindowField.remove();
        }
        errorWindowFieldWrapp.appendChild(errorWindow);
    }
    function removeError(name) {
        const errorWindowField = document.querySelector('.error-window_' + name);
        if(errorWindowField !== null) {
            errorWindowField.remove();
        }
    }
    function newHotel(valid) {
        if (valid === 4) {
            let newHotels = {
                name: '',
                rating: '',
                description: '',
                mealType: '',
                features: [],
                region: ''
            };
            for (let key in newHotels) {
                let i = key + '-new-hotel';
                if (key === 'features') {
                    for (let j = 0; j < addNewHotel.newHotelForm[i].length; j++) {
                        if (addNewHotel.newHotelForm[i][j].checked) {
                            newHotels[key].push(addNewHotel.newHotelForm[i][j].value)
                        }
                    }
                    continue;
                }
                if (key === 'rating') {
                    newHotels[key] = +addNewHotel.newHotelForm[i].value;
                    continue;
                }
                newHotels[key] = addNewHotel.newHotelForm[i].value;
            }
            hotelsArray.push(newHotels);
            congratulation();
            return hotelsArray;
        }
    }
    function congratulation() {
        addNewHotel.newHotelForm.reset();
        for (let j = 0; j < addNewHotel.newHotelForm['features-new-hotel'].length; j++) {
            addNewHotel.newHotelForm['features-new-hotel'][j].disabled = false;
        }
        const congratulation = document.querySelector('.congratulation');
        congratulation.classList.add('congratulation_animation');
        setTimeout(function () {
            congratulation.classList.remove('congratulation_animation');
        }, 1500);
    }
    function toValidation() {
        let errorWindow = document.createElement('span');
        errorWindow.classList.add('error-window');
        errorWindow.textContent = 'Пожалуйста, заполните данное поле!';
        let count = 0;
        if (addNewHotel.newHotelForm['name-new-hotel'].validity.valid === false) {
            addError('name', errorWindow);
            return;
        } else {
            if(addNewHotel.newHotelForm['name-new-hotel'].value.indexOf('  ') > -1) {
                addError('name', errorWindow);
                errorWindow.textContent = 'Название не может включать в себя более одного пробела подряд';
                return;
            }
            for (let i = 0; i < hotelsArray.length; i++) {
                if (hotelsArray[i].name === addNewHotel.newHotelForm['name-new-hotel'].value) {
                    addError('name', errorWindow);
                    errorWindow.textContent = 'Отель с таким именем уже существует :(';
                    return;
                }
            }
            removeError('name');
            count++;
        }
        if (addNewHotel.newHotelForm['rating-new-hotel'].validity.valid === false) {
            addError('rating', errorWindow);
            return;
        } else {
            removeError('rating');
            count++;
        }
        if (addNewHotel.newHotelForm['region-new-hotel'].value === '') {
            addError('region', errorWindow);
            return;
        } else {
            removeError('region');
            count++;
        }
        if (addNewHotel.newHotelForm['mealType-new-hotel'].validity.valid === false) {
            addError('mealType', errorWindow);
            return;
        } else {
            removeError('mealType');
            count++
        }
        return count;
    }
    function checkRules() {
        if (addNewHotel.newHotelForm['rating-new-hotel'].value < 4) {
            addNewHotel.newHotelForm['mealType-new-hotel'][1].disabled = true;
            M.FormSelect.init(addNewHotel.newHotelForm['mealType-new-hotel']);
        } else if (addNewHotel.newHotelForm['rating-new-hotel'].value >= 4) {
            addNewHotel.newHotelForm['mealType-new-hotel'][1].disabled = false;
            M.FormSelect.init(addNewHotel.newHotelForm['mealType-new-hotel']);
        }
        if (addNewHotel.newHotelForm['region-new-hotel'].value === 'Istanbul') {
            addNewHotel.newHotelForm['features-new-hotel'][1].disabled = true;
            addNewHotel.newHotelForm['features-new-hotel'][0].disabled = false;
        } else if (addNewHotel.newHotelForm['region-new-hotel'].value === 'Antalya' || addNewHotel.newHotelForm['region-new-hotel'].value === 'Kemer') {
            addNewHotel.newHotelForm['features-new-hotel'][1].disabled = false;
            addNewHotel.newHotelForm['features-new-hotel'][0].disabled = true;
            addNewHotel.newHotelForm['features-new-hotel'][0].checked = true;
        }
        if (addNewHotel.newHotelForm['features-new-hotel'][1].checked) {
            addNewHotel.newHotelForm['region-new-hotel'][3].disabled = true;
            M.FormSelect.init(addNewHotel.newHotelForm['mealType-new-hotel']);
        } else {
            addNewHotel.newHotelForm['region-new-hotel'][3].disabled = false;
            M.FormSelect.init(addNewHotel.newHotelForm['mealType-new-hotel']);
        }
    }
})();


let filter = (function () {
    return {
        filter: document.getElementById('filter'),
        setCardsFilter: setCardsFilter,
        makeFilter: makeFilter
    };

    function setCardsFilter() {
        const checkValue = {
            features: document.getElementsByClassName('filled-in'),
            mealType: filter.filter['check-meal'].value,
            stars: filter.filter['check-stars'].value,
            region: filter.filter['region'].value
        };
        let cardsFilter = new Map();
        let featuresCheckedValue = [];
        for (let i = 0; i < checkValue.features.length; i++) {
            if (checkValue.features[i].checked) {
                featuresCheckedValue.push(checkValue.features[i].value);
            }
        }
        cardsFilter.set('features', featuresCheckedValue);
        if (checkValue.region) {
            cardsFilter.set('region', checkValue.region);
        }
        if (checkValue.stars) {
            cardsFilter.set('rating', checkValue.stars);
        }
        if (checkValue.mealType) {
            cardsFilter.set('mealType', checkValue.mealType);
        }
        return cardsFilter;
    }
    function makeFilter(cardsFilter) {
        let cardsAfterFilter;
        for (let key of cardsFilter.keys()) {
            if (cardsFilter.has('rating')) {
                if (cardsAfterFilter === undefined) {
                    cardsAfterFilter = hotelsArray.filter(function(item) {
                        return item.rating >= cardsFilter.get('rating');
                    });
                } else {
                    cardsAfterFilter = cardsAfterFilter.filter(function(item) {
                        return item.rating >= cardsFilter.get('rating');
                    });
                }

            }
            if (cardsFilter.has('mealType')) {
                if (cardsAfterFilter === undefined) {
                    cardsAfterFilter = hotelsArray.filter(function(item) {
                        return item.mealType === cardsFilter.get('mealType');
                    });
                } else {
                    cardsAfterFilter = cardsAfterFilter.filter(function(item) {
                        return item.mealType === cardsFilter.get('mealType');
                    });
                }

            }
            if (cardsFilter.has('region')) {
                if (cardsAfterFilter === undefined) {
                    cardsAfterFilter = hotelsArray.filter(function(item) {
                        return item.region === cardsFilter.get('region');
                    });
                } else {
                    cardsAfterFilter = cardsAfterFilter.filter(function(item) {
                        return item.region === cardsFilter.get('region');
                    });
                }

            }
            if (cardsFilter.has('features')) {
                if (cardsAfterFilter === undefined) {
                    cardsAfterFilter = hotelsArray.filter(function (item) {
                        return cardsFilter.get('features').every(function (elem) {
                            return item.features.indexOf(elem) > -1;
                        })
                    });
                } else {
                    cardsAfterFilter = cardsAfterFilter.filter(function (item) {
                        return cardsFilter.get('features').every(function (elem) {
                            return item.features.indexOf(elem) > -1;
                        })
                    });
                }
            }
        }
        return cardsAfterFilter;
    }
})();


let modal = (function () {
    return {
        btnToOpenNewHotel: document.getElementById('add-new-hotel-btn'),
        btnToCloseNewHotel: document.getElementById('close-new-hotel'),
        createNewHotelField: document.querySelector('.create-new-hotel'),
        openNewHotelFrom: openNewHotelFrom,
        closeNewHotelForm: closeNewHotelForm
    };
    function openNewHotelFrom() {
        modal.createNewHotelField.classList.add('create-new-hotel_active');
        document.body.style.overflowY = 'hidden';
    }
    function closeNewHotelForm() {
        modal.createNewHotelField.classList.remove('create-new-hotel_active');
        document.body.style.overflowY = 'scroll';
    }
})();
(function() {
    render.renderCards(hotelsArray);
    filter.filter.addEventListener('change', function() {
        render.rerenderCards(filter.makeFilter(filter.setCardsFilter()));
    });
    addNewHotel.newHotelForm.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
    });
    addNewHotel.newHotelForm.addEventListener('change', function () {
        addNewHotel.checkRules();
    });
    addNewHotel.btnToCreateNewHotel.addEventListener('click', function () {
        render.rerenderCards(addNewHotel.newHotel(addNewHotel.toValidation()));
    });
    modal.btnToOpenNewHotel.addEventListener('click', function (e) {
        modal.openNewHotelFrom();
        e.preventDefault();
    });
    modal.btnToCloseNewHotel.addEventListener('click', function (e) {
       modal.closeNewHotelForm();
        e.preventDefault();
    });
    modal.createNewHotelField.addEventListener('click', function () {
        modal.closeNewHotelForm()
    });
    addNewHotel.btnToCreateNewHotel.addEventListener('blur', function () {
        modal.btnToCloseNewHotel.focus();
    });
})();





