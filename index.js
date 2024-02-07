const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-GHP-ET-WEB-FT-SF/events';
const state = {
  events: []
}

const eventsList = document.querySelector('#events');

const addEventsForm = document.querySelector('#addEvent');
addEventsForm.addEventListener('submit', createEvent);

async function render() {}
