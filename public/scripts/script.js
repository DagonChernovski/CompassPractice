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