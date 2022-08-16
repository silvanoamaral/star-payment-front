import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dataEvent, setDataEvent] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(
        "https://projeto-ssr-example.herokuapp.com/events"
      );

      events.onmessage = (event) => {
        setDataEvent(event.data);
      };

      setListening(true);
    }
  }, [listening]);

  return (
    <div className="App">
      <h3>Dados do cartão</h3>
      <iframe
        src="https://projeto-ssr-example.herokuapp.com/server-client"
        title="An iframe with options of payment"
        height="100%"
      ></iframe>

      <strong>server sent events: {dataEvent}</strong>
    </div>
  );
}

export default App;
