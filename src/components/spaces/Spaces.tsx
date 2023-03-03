import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space } from "../../models/model";
import { DataService } from "../../services/DataService";
import Modal from "./Modal";
import SpaceComponent from "./SpaceComponent";

interface SpacesProps {
  dateService: DataService;
}

const Spaces = (props: SpacesProps) => {
  const [spacesState, setSpacesState] = useState<Space[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    async function getSpacesAsync() {
      const spaces = await props.dateService.getSpaces();
      setSpacesState(spaces);
    }

    getSpacesAsync();
  }, []);

  function closeModal() {
    setModalContent("");
    setShowModal(false);
  }

  async function reserveSpace(spaceId: string) {
    const reservationResult = await props.dateService.reserveSpace(spaceId);

    if (reservationResult) {
      setShowModal(true);
      setModalContent(
        `You reserved the space with id ${spaceId} and got the reservation number ${reservationResult}`
      );
    } else {
      setShowModal(true);
      setModalContent(`You cant reserve space: ${spaceId}`);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome to the Spaces Page</h2>

      <Link to="/create-space">Create Space</Link>
      <br />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {spacesState.map((space) => (
          <SpaceComponent
            spaceId={space.spaceId}
            location={space.location}
            reserveSpace={reserveSpace}
            name={space.name}
            photoURL={space.photoURL}
          />
        ))}
      </div>
      {showModal && (
        <Modal show={showModal} content={modalContent} close={closeModal} />
      )}
    </div>
  );
};

export default Spaces;
