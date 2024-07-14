async function fetchPeople() {
    try {
      const response = await fetch('http://localhost:3000/api/v1/person');
      return await response.json();
    } catch (error) {
      console.error('Error fetching people:', error);
      return [];
    }
  }

  async function fetchRooms() {
    try {
      const response = await fetch('http://localhost:3000/api/v1/room');
      return await response.json();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
  }

  async function populateSelects() {
    const people = await fetchPeople();
    const rooms = await fetchRooms();

    const personSelect = document.getElementById('personId');
    const roomSelect = document.getElementById('roomId');
    const getSelect = document.getElementById('getId');
    const unRoomSelect = document.getElementById('unRoomId');
    people.forEach(person => {
      const option = document.createElement('option');
      option.value = person.id;
      option.textContent = person.name; // Предполагается, что у объекта person есть поле name
      personSelect.appendChild(option);
    });

    rooms.forEach(room => {
      const postOption = document.createElement('option');
      const getOption = document.createElement('option');
      const unbookOption = document.createElement('option');
      postOption.value = room.id;
      postOption.textContent = room.id+" - "+room.name; // Предполагается, что у объекта room есть поле name
      getOption.value = room.id;
      getOption.textContent = room.id+" - "+room.name;
      unbookOption.value = room.id;
      unbookOption.textContent = room.id+" - "+room.name;
      roomSelect.appendChild(postOption);
      getSelect.appendChild(getOption);
      unRoomSelect.appendChild(unbookOption);
    });
  }

  document.addEventListener('DOMContentLoaded', populateSelects);

function drawTable(headers, data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);   

    data.forEach(item => {
      const row = document.createElement('tr');
      Object.values(item).forEach(cellText => {
        const cell = document.createElement('td');
        cell.textContent = cellText;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    contentDiv.appendChild(table);
}

async function getRooms() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/room');
    const data = await response.json();
    const headers = ['№', 'Название'];
    document.getElementById('tablabel').innerHTML='Список комнат';
    drawTable(headers, data);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
}

async function getPeople() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/person');
    const data = await response.json();
    const headers = ['№', 'ФИО'];
    document.getElementById('tablabel').innerHTML='Список преподавателей';
    drawTable(headers, data);
  } catch (error) {
    console.error('Error fetching people:', error);
  }
}

async function getBooking(event) {
    event.preventDefault();
    const roomId = document.getElementById('getId').value;
    try {
        const response = await fetch(`http://localhost:3000/api/v1/room/${roomId}`);
        const data = await response.json();
        console.log(data);
        const headers = ['Дата', 'Преподаватель'];
        drawTable(headers, data);
        } catch (error) {
        console.error('Error fetching people:', error);
    }
  }

async function bookRoom(event) {
    event.preventDefault();

    const personId = document.getElementById('personId').value;
    const roomId = document.getElementById('roomId').value;
    const date = document.getElementById('date').value;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/person/${personId}/room/${roomId}/date/${date}`, {
        method: 'POST',
      });

      const result = await response.json();
      alert(result.message || 'Ошибка бронирования');
    } catch (error) {
      console.error('Error booking room:', error);
    }
  }

async function unbookRoom(event) {
    event.preventDefault();

    const roomId = document.getElementById('unRoomId').value;
    const date = document.getElementById('unDate').value;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/room/${roomId}/date/${date}`, {
        method: 'POST',
      });

      const result = await response.json();
      alert(result.message || 'Ошибка удаления брони');
    } catch (error) {
      console.error('Error unbooking room:', error);
    }
  }