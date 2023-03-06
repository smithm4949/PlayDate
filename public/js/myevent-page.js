// DELETE an event FROM My Event Page

// DELETE EVENT
const myEventsDeleteEventHandler = async (event) => {

    const myEventSection = document.querySelector('.myevents-list');
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        location.reload();
        myEventSection.scrollIntoView({behavior: 'smooth'});    
      } else {
        alert('Failed to delete event profile');
      }
    }
  };
  
  document
    .querySelector('.myEventsPage-list').addEventListener('click', myEventsDeleteEventHandler);
  