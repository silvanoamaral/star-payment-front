import { useState, useEffect } from "react";
import "./App.css";

const eventsPrd = "https://projeto-ssr-example.herokuapp.com/events";
// const eventsLocal = "http://localhost:8000/events";

const eventsEnvironment = eventsPrd;

const iframePrd = "https://projeto-ssr-example.herokuapp.com/server-client";
// const iframeLocal = "http://localhost:8000/server-client";

const iframeEnvironment = iframePrd;

function App() {
  const [dataEvent, setDataEvent] = useState(null);
  const [listening, setListening] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(eventsEnvironment);

      events.onmessage = (event) => {
        setDataEvent(event.data);
      };

      events.onerror = () => {
        setDataEvent("Server closed connection");
        events.close();
      };

      setListening(true);
    }
  }, [listening]);

  useEffect(() => {
    if (dataEvent) {
      const data = JSON.parse(dataEvent);
      setDisabled(data.isDisabled);
    }
  }, [dataEvent]);

  return (
    <div className="App">
      <h3>Dados do cartão</h3>
      <iframe
        src={iframeEnvironment}
        title="An iframe with options of payment"
        height="90%"
      ></iframe>
      <button className="button" disabled={disabled}>
        Continuar para pagamento
      </button>
    </div>
  );
}

export default App;
