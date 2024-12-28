const ParentComponent = () => {
    const [myEvents, setMyEvents] = useState([]);
    const handleRegister = (event) => {
      setMyEvents((prevMyEvents) => [...prevMyEvents, event]); 
      console.log('Event Registered:', event);
    };
  
    return (
      <div>
        <h2>My Events</h2>
        <AllEventsTab onRegister={handleRegister} />  
  
        <h3>Registered Events:</h3>
        {myEvents.length === 0 ? (
          <p>No events registered yet.</p>
        ) : (
          myEvents.map((event, index) => (
            <div key={index}>
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  