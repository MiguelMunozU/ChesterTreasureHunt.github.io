window.addEventListener('load', function() {
    // Obtén una referencia al contenedor del video
    var videoContainer = document.getElementById("videoContainer");

    // Configura un temporizador para cambiar la opacidad del contenedor del video después de 6 segundos
    setTimeout(function() {
        videoContainer.style.opacity = "0";

        // Añade otro temporizador para ocultar completamente el contenedor del video después de que la opacidad llegue a 0
        setTimeout(function() {
            videoContainer.style.display = "none";
        }, 1000); // 1000 milisegundos = 1 segundo
    }, 6000); // 6000 milisegundos = 6 segundos

    // Inicializa localStorage si no está definido
    const locations = ['rawmaterials', 'production', 'sales', 'transportation', 'warehouse'];
    locations.forEach(location => {
        if (localStorage.getItem(location) === null) {
            localStorage.setItem(location, 0);
        }
    });

    if (localStorage.getItem('contar') === null) {
        localStorage.setItem('contar', 0);
    }

    if (localStorage.getItem('incorrect') === null) {
        localStorage.setItem('incorrect', 0);
    }

    if (localStorage.getItem('lives') === null) {
        localStorage.setItem('lives', 3); // Inicializamos las vidas en 3
    }

    if (localStorage.getItem('usedQuestions') === null) {
        localStorage.setItem('usedQuestions', JSON.stringify([]));
    }

    // Verifica si la URL actual es una de las páginas especificadas
    if (window.location.pathname.includes('RawMaterials.html')) {
        localStorage.setItem('rawmaterials', 1);
        console.log('Valor de rawmaterials:', localStorage.getItem('rawmaterials'));
    } else if (window.location.pathname.includes('Production.html')) {
        localStorage.setItem('production', 1);
        console.log('Valor de production:', localStorage.getItem('production'));
    } else if (window.location.pathname.includes('Sales.html')) {
        localStorage.setItem('sales', 1);
        console.log('Valor de sales:', localStorage.getItem('sales'));
    } else if (window.location.pathname.includes('Transportation.html')) {
        localStorage.setItem('transportation', 1);
        console.log('Valor de transportation:', localStorage.getItem('transportation'));
    } else if (window.location.pathname.includes('Warehouse.html')) {
        localStorage.setItem('warehouse', 1);
        console.log('Valor de warehouse:', localStorage.getItem('warehouse'));
    } else if (window.location.pathname.includes('instructions.html')) {
        // Asigna valores iniciales a tus variables aquí
        locations.forEach(location => localStorage.setItem(location, 0));
        localStorage.setItem('contar', 0);
        localStorage.setItem('incorrect', 0);
        localStorage.setItem('lives', 3); // Reiniciamos las vidas a 3
        localStorage.setItem('usedQuestions', JSON.stringify([])); // Reiniciamos el registro de preguntas usadas
        console.log('Valores iniciales establecidos');
        console.log("rawmaterials:", localStorage.getItem('rawmaterials'));
        console.log("production:", localStorage.getItem('production'));
        console.log("sales:", localStorage.getItem('sales'));
        console.log("transportation:", localStorage.getItem('transportation'));
        console.log("warehouse:", localStorage.getItem('warehouse'));
        console.log("contar:", localStorage.getItem('contar'));
    }
});

document.addEventListener('DOMContentLoaded', function() {
    //Check if is set in localStorage
    let rawMaterials = localStorage.getItem('rawmaterials');
    let production = localStorage.getItem('production');
    let sales = localStorage.getItem('sales');
    let transportation = localStorage.getItem('transportation');
    let warehouse = localStorage.getItem('warehouse');
    //Set default image source based on localStorage value
    let imgSrcRM = +rawMaterials == 0 ? 'RawMaterialsland.png' : 'RawMaterialslandVisited.png';
    let imgSrcProd = +production === 0 ? 'ProductionIsland.png' : 'ProductionIslandVisited.png';
    let imgSrcSales= +sales === 0 ? 'SalesIsland.png' : 'SalesIslandVisited.png';
    let imgSrcTrans = +transportation === 0 ? 'TransportationIsland.png' : 'TransportationIslandVisited.png';
    let imgSrcWare = +warehouse === 0 ? 'WarehouseIsland.png' : 'WarehouseIslandVisited.png';
    //Set the image source dynamically
    document.getElementById('rawMaterialsImage').src = "../Debanhi/resources/" + imgSrcRM;
    document.getElementById('productionImage').src = "../Debanhi/resources/" + imgSrcProd;
    document.getElementById('salesImage').src = "../Debanhi/resources/" + imgSrcSales;
    document.getElementById('transportationImage').src = "../Debanhi/resources/" + imgSrcTrans;
    document.getElementById('warehouseImage').src = "../Debanhi/resources/" + imgSrcWare;
});

var myAudio = document.getElementById("myAudio");

function togglePlayPause() {
    if (myAudio.paused) {
        myAudio.play();
    } else {
        myAudio.pause();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bottle = document.getElementById('bottle');
    const popup = document.getElementById('popup');
    const questionText = document.getElementById('questionText');
    const answerInput = document.getElementById('answerInput');
    const submitAnswer = document.getElementById('submitAnswer');

    const rawMaterialsRiddles = [
        "Guess how many potatoes I have treasured or get a pegleg…",
        "In fields so vast, where seeds do grow, what treasure can be hidden that only farmers know?",
        "Harvested with care, it rests in the barn. Tell me, what bounty lies in these chests?",
        "Guarded by scarecrows and nestled in hay, what riches lie in wait at the end of the day?"
    ];

    const productionRiddles = [
        "When someone tells you that 13 is an unlucky number… think twice",
        "From raw to finished, in the blink of an eye, what treasure emerges, savvy guy?",
        "Machines do roar, and sparks do fly, in the heart of the plant, where treasures lie?",
        "From metal to magic, what prize shines so bright in a pirate's delight?"
    ];

    const transportationRiddles = [
        "A box in a box is not a good place to hide a smile unless someone distracts the overseer",
        "In a vessel or a wagon, swift and decisive, what is the loot that travels along?",
        "Bound for adventure through storm and gale, what is this epic tale's bounty?",
        "Transported with care, through night and day; what be the prize on its way?"
    ];

    const salesRiddles = [
        "Don't you miss anything? There are no further opportunities once you are out...",
        "On the shelf or rack, it catches the eye. What is the jewel that one might buy?",
        "What riches make the heart sing in the market where coins ring?",
        "Displayed for all in a shining array, what fortune will shoppers pay?"
    ];

    const warehouseRiddles = [
        "The treasure is protected by death… and until death",
        "A treasure awaits among the stacks so tall; what be the riches that answer the call?",
        "From here to there, it travels far; what is the jewel in this bustling bazaar?",
        "Moved with care, from near to far; what treasure rests beneath the stars?"
    ];

    const allRiddles = {
        rawmaterials: rawMaterialsRiddles,
        production: productionRiddles,
        sales: salesRiddles,
        transportation: transportationRiddles,
        warehouse: warehouseRiddles
    };

    const quiz = [
        {
            question: "It’s the core strategy that will guide how our business will grow for decades to come, all while having a positive impact on the planet and people. From the agriculture practices our farmers use, to the way we package the iconic brands our consumers love. From increasing representation to reflect the communities we serve, to incorporating more diverse ingredients in our food and beverage portfolio.", 
            choices: ["PepsiCo Positive (pep +)", "PepsiCo Global strategy", "New ways of working"], 
            answer: "PepsiCo Positive (pep +)"
        },
        {
            question: "Working to source our crops and ingredients in ways that restore the earth and strengthen farming communities", 
            choices: ["Positive Agriculture", "Positive Value Chain", "Positive Choices"], 
            answer: "Positive Agriculture"
        },
        {
            question: "Helping to build a circular and inclusive value chain", 
            choices: ["Positive Value Chain", "Positive Agriculture ", "Positive Choices"], 
            answer: "Positive Value Chain"
        },
        {
            question: "Inspiring people through our brands to make choices that create more smiles for them and the planet", 
            choices: ["Positive Choices", "Positive Agriculture", "Positive Value Chain"], 
            answer: "Positive Choices"
        },
        {
            question: "It's PepsiCo's mission", 
            choices: ["Create more smiles with every sip and every bite.", "Faster, Stronger and Better.", "Building a stronger, more sustainable future."], 
            answer: "Create more smiles with every sip and every bite."
        },
        {
            question: "What year was PepsiCo born?", 
            choices: ["1900", "1965", "1952"], 
            answer: "1965"
        },
        {
            question: "PepsiCo was created after the merger of Pepsi-Cola Company and Frito-Lay?", 
            choices: ["No", "Yes", "Maybe"], 
            answer: "Yes"
        },
        {
            question: "Is the method used to determine the requirements and quantities of raw materials to implement production.", 
            choices: ["Engineering", "Demand Planning", "Materials planning"], 
            answer: "Materials planning"
        },
        {
            question: "What is involved in transportation management?", 
            choices: ["The processes and systems used to manage the specific needs and requirements of the transportation of finished products.", "The processes and systems used to manage the needs and requirements specific to the physical transportation of goods and cargo as part of Supply Chain.", "The processes and systems used to manage the specific needs and requirements of the transportation of raw material."], 
            answer: "The processes and systems used to manage the needs and requirements specific to the physical transportation of goods and cargo as part of Supply Chain."
        },
        {
            question: "Food Safety refers to practices and conditions that preserve food quality to prevent contamination and food-borne illnesses during preparation, handling, and storage.", 
            choices: ["Yes", "No", "Maybe"], 
            answer: "Yes"
        }
    ];

    function getRandomRiddle() {
        const visitedLocations = ['rawmaterials', 'production', 'sales', 'transportation', 'warehouse'].filter(location => Number(localStorage.getItem(location)) === 1);
        const unvisited = ['rawmaterials', 'production', 'sales', 'transportation', 'warehouse'].filter(location => Number(localStorage.getItem(location)) === 0);
        if (unvisited.length === 0) return "All riddles have been found!";
        const randomLocation = unvisited[Math.floor(Math.random() * unvisited.length)];
        const riddles = allRiddles[randomLocation];
        const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];

        // Incrementar el contador de respuestas correctas
        //localStorage.contar = Number(localStorage.getItem('contar')) + 1;
        console.log("Contador de respuestas correctas:", localStorage.getItem('contar'));

        // Mostrar en consola las ubicaciones y su estado
        console.log("Ubicaciones visitadas:", visitedLocations);
        console.log("Ubicaciones no visitadas:", unvisited);
        console.log("rawmaterials:", localStorage.getItem('rawmaterials'));
        console.log("production:", localStorage.getItem('production'));
        console.log("sales:", localStorage.getItem('sales'));
        console.log("transportation:", localStorage.getItem('transportation'));
        console.log("warehouse:", localStorage.getItem('warehouse'));

        return randomRiddle;
    }

    function getRandomQuizQuestion() {
        let usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

        // Filtrar las preguntas que no se han utilizado todavía
        const availableQuestions = quiz.filter(questionObj => !usedQuestions.some(usedQuestion => usedQuestion.question === questionObj.question));

        // Si no quedan preguntas disponibles, reiniciar el registro
        if (availableQuestions.length === 0) {
            usedQuestions = [];
        }

        // Elegir aleatoriamente una pregunta de las disponibles
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const randomQuestion = availableQuestions[randomIndex];

        // Agregar la pregunta al registro de usadas
        usedQuestions.push(randomQuestion);

        // Almacenar el registro actualizado en localStorage
        localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));

        console.log(randomIndex);
        console.log(usedQuestions); // Para verificar en la consola

        return randomQuestion;
    }

    function showQuizQuestion(questionObj) {
        questionText.textContent = questionObj.question;
        answerInput.innerHTML = ''; // Clear previous options

        questionObj.choices.forEach(choice => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'quizChoice';
            input.value = choice;
            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            answerInput.appendChild(label);
            answerInput.appendChild(document.createElement('br'));
        });
    }

    // Simula encontrar una botella después de 5 segundos
    setTimeout(() => {
        if (bottle) {
            bottle.classList.remove('hidden');
        }
    }, 5000);

    if (bottle) {
        bottle.addEventListener('click', () => {
            const randomQuestion = getRandomQuizQuestion();
            showQuizQuestion(randomQuestion);
            popup.classList.remove('hidden');
    
            if (submitAnswer) {
                submitAnswer.addEventListener('click', () => {
                    const selectedOption = document.querySelector('input[name="quizChoice"]:checked');
                    if (!selectedOption) {
                        popup.textContent = "Please select an answer.";
                        popup.classList.remove('hidden');
                        return;
                    }
    
                    const answer = selectedOption.value;
                    if (answer === randomQuestion.answer) {
                        let contar = Number(localStorage.getItem('contar')) + 1;
                        console.log("Contador de respuestas correctas:", localStorage.getItem('contar'));
                        localStorage.setItem('contar', contar);
                        if (contar === 3) {
                            popup.textContent = "Congratulations! You've proved to be worthy of Chester's treasure";
                            popup.classList.remove('hidden');
                            setTimeout(() => {
                                window.location.href = 'win.html';
                            }, 5000); // Espera 2 segundos antes de redirigir
                        } else {
                            const nextRiddle = getRandomRiddle();
                            popup.textContent = "Correct! Here is your next clue: " + nextRiddle;
                            popup.classList.remove('hidden');
                            mapButton.classList.remove('hidden'); // Mostrar el botón de Mapa
                        }
                    } else {
                        // Incrementar el contador de respuestas incorrectas
                        localStorage.incorrect = Number(localStorage.getItem('incorrect')) + 1;
                        console.log("Contador de respuestas incorrectas:", localStorage.getItem('incorrect'));
    
                        // Reducir el número de vidas
                        let lives = Number(localStorage.getItem('lives')) - 1;
                        localStorage.setItem('lives', lives);
    
                        // Mostrar mensaje con las vidas restantes
                        if (lives <= 0) {
                            popup.textContent = "Incorrect! You have no lives left. Game Over.";
                            popup.classList.remove('hidden');
                            setTimeout(() => {
                                window.location.href = 'loose.html';
                            }, 5000); // Espera 2 segundos antes de redirigir
                        } else {
                            popup.textContent = `Incorrect! You have ${lives} lives left. Choose another place on the map.`;
                            popup.classList.remove('hidden');
                            mapButton.classList.remove('hidden'); // Mostrar el botón de Mapa
                        }
                    }
                });
            }
        });
    }
    
    // Manejar la redirección del botón de Mapa
    const mapButton = document.getElementById('mapButton');
    if (mapButton) {
        mapButton.addEventListener('click', () => {
            window.location.href = 'map.html';
        });
    }    
});