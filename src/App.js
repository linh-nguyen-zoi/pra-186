import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { getToken, onMessageListener } from './firebase';
import {Button, Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false)

  getToken(setTokenFound);

  onMessageListener().then(message => {
    setShow(true);
    setNotification({title: message.notification.title, body: message.notification.body})
    console.log(message);
  }).catch(err => console.log('failed: ', err));

  return (
    <div className="App">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Notification</strong>
            <small>12 mins ago</small>
          </Toast.Header>
          <Toast.Body>There are some new updates that you might love!</Toast.Body>
        </Toast>
      <header className="App-header">
        {isTokenFound && <h1> TOKEN FOUND </h1>}
        {!isTokenFound && <h1> TOKEN ERROR. FAILED </h1>}

        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>


    </div>
  );
}

export default App;