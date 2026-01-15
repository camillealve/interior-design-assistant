import RoomForm from '../components/RoomForm';

function Home() {
  return (
    <div className="page">
      <h1>Interior Design Assistant</h1>
      <p>Enter your room details to get AI-generated design ideas.</p>
      <RoomForm />
    </div>
  );
}

export default Home;
