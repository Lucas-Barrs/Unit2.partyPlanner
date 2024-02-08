const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-GHP-ET-WEB-FT-SF/events';
const state = {
  events: []
}

const eventsList = document.querySelector('#events');

const addEventsForm = document.querySelector('#addEvent');
addEventsForm.addEventListener('submit', createEvent);

async function render() {
  await getEvents ()
  renderEvents ()
}
render();

async function getEvents() {
try {
  const responce = await fetch(API_URL)
  const json = await responce.json()
  state.events = json.data
  console.log(state.events)
} catch (error){
  console.error(error)
}
}

async function createEvent(event){
  event.preventDefault()

  const name = addEventsForm.title.value
  const date = addEventsForm.date.value
  const location = addEventsForm.location.value
  const details = addEventsForm.details.value

  try{
    const responce = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, date, location, details})
    })
    const json = await responce.json()
    render()
  
  } catch(error) {
    console.error(error)
  }
}

async function deleteEvent(id) {
  try {
    const responce = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.error(error)
  }
}

function renderEvents() {
  if(state.events.length < 1) {
    const newListItem = document.createElement('li')
    newListItem.textContent = 'No events added yet :('
    eventsList.append(newListItem)
  } else {
    recipesList.replaceChildren()
    state.events.forEach((eventObj) => {
      const newListItem = document.createElement("li")
      newListItem.classList.add("event")

      const newHeading = document.createElement("h2")
      newHeading.textContent = eventObj.name

      const newParagraph1 = document.createElement("p")
      newParagraph1.textContent = eventObj.date

      const newParagraph2 = document.createElement("p")
      newParagraph2.textContent = eventObj.location

      const newParagraph3 = document.createElement("p")
      newParagraph3.textContent = eventObj.details

      const deleteButton = document.createElement("button")
      deleteButton.textContent = "Delete"
      deleteButton.addEventListener("click", () => deleteRecipe(recipeObj.id))

      newListItem.append(newHeading, newParagraph1, newParagraph2, newParagraph3, deleteButton)
      // append to `recipesList`
      recipesList.append(newListItem) 
    })
  }
}