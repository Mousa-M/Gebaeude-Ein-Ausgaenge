document.addEventListener('DOMContentLoaded', () => {

    const logTableBody = document.getElementById('logTable').getElementsByTagName('tbody')[0];
    const totalPeopleElement = document.getElementById('totalPeople');
    const update = document.getElementById('update');

    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const continueBtn = document.getElementById('continueBtn');
    const resetBtn = document.getElementById('resetBtn');

    const status = document.getElementById('status');

    const peopleEntered = { count: 0 };
    const peopleExited = { count: 0 };
    const totalPeople = { count: 0 };

    let simulationInterval;

    startBtn.addEventListener('click', startSimulation);
    pauseBtn.addEventListener('click', pauseSimulation);
    continueBtn.addEventListener('click', continueSimulation);
    resetBtn.addEventListener('click', resetSimulation);

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    continueBtn.disabled = true;
    resetBtn.disabled = true;

    // Ein-/Ausgänge erstellen
    const entrancesExits = [
        { name: "Ein-/Ausgang 1", entries: 0, exits: 0 },
        { name: "Ein-/Ausgang 2", entries: 0, exits: 0 },
        { name: "Ein-/Ausgang 3", entries: 0, exits: 0 },
        { name: "Ein-/Ausgang 4", entries: 0, exits: 0 },
        { name: "Ein-/Ausgang 5", entries: 0, exits: 0 },
        { name: "Ein-/Ausgang 6", entries: 0, exits: 0 },
        { name: "Ein-/Ausgang 7", entries: 0, exits: 0 },
    ];

    // Anzahl personen im Gebäude updaten
    function updateTotalPeople() {
        totalPeopleElement.textContent = `${totalPeople.count}`;
    }

    // Zeilen der Tabelle erstellen
    function createTableRow(data) {
        const newRow = logTableBody.insertRow();
        const nameCell = newRow.insertCell(0);
        const entriesCell = newRow.insertCell(1);
        const exitsCell = newRow.insertCell(2);

        nameCell.textContent = data.name;
        entriesCell.textContent = data.entries;
        exitsCell.textContent = data.exits;

        return { entriesCell, exitsCell };
    }

    const tableRows = entrancesExits.map(createTableRow);

    // Eintritt angeben
    function simulateEntry(index) {
        entrancesExits[index].entries++;
        tableRows[index].entriesCell.textContent = entrancesExits[index].entries;
        totalPeople.count++;
        updateTotalPeople();
    }

    // Austritt angeben
    function simulateExit(index) {
        entrancesExits[index].exits++;
        tableRows[index].exitsCell.textContent = entrancesExits[index].exits;
        totalPeople.count--;
        updateTotalPeople();
    }

    // Ein-/Austreten simulieren
    function simulateRandomEntriesExits() {
        entrancesExits.forEach((entranceExit, index) => {
            // Zufällige Anzahl an Eintretungen (max. 5)
            const randomEntries = Math.floor(Math.random() * 6);
            peopleEntered.count += randomEntries;

            for (let i = 0; i < randomEntries; i++) {
                simulateEntry(index);
            }

            // Zufällige ANzahl an Austretungen (max. Anzahl Personen im Gebäude)
            const randomExits = Math.floor(Math.random() * totalPeople.count);
            peopleExited.count += randomExits;

            for (let i = 0; i < randomExits; i++) {
                simulateExit(index);
            }
        });

        // Anzeigen, wieviele in diesem Update ein-/ausgetreten sind
        update.textContent = `${peopleEntered.count} eingetreten. ${peopleExited.count} ausgetreten.`;

        peopleEntered.count = 0;
        peopleExited.count = 0;
    }

    // Simulation starten
    function startSimulation() {
        clearInterval(simulationInterval);
        simulationInterval = setInterval(simulateRandomEntriesExits, 5000);

        simulateRandomEntriesExits();
        status.textContent = 'Am Laufen'

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        continueBtn.disabled = true;
        resetBtn.disabled = false;
    }

    // Simulation pausieren
    function pauseSimulation() {
        clearInterval(simulationInterval); 
        status.textContent = 'Pausiert'

        startBtn.disabled = true;
        pauseBtn.disabled = true;
        continueBtn.disabled = false;
        resetBtn.disabled = false;
    }

    // Simulation weiterführen
    function continueSimulation() {
        startSimulation(); 
        status.textContent = 'Am Laufen'

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        continueBtn.disabled = true;
        resetBtn.disabled = false;
    }

    // Simulation zurücksetzen
    function resetSimulation() {
        // Simulation pausieren
        pauseSimulation(); 

        // Alle Werte zurücksetzen
        totalPeople.count = 0; 
        totalPeopleElement.textContent = 0; 
        entrancesExits.forEach((entranceExit, index) => {
            entrancesExits[index].entries = 0;
            entrancesExits[index].exits = 0;
            tableRows[index].entriesCell.textContent = 0;
            tableRows[index].exitsCell.textContent = 0;
        });

        update.textContent = `0 eingetreten. 0 ausgetreten.`;
        status.textContent = 'Default'

        startBtn.disabled = false;
        pauseBtn.disabled = true;
        continueBtn.disabled = true;
        resetBtn.disabled = true;
    }
});
