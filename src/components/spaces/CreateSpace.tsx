import { SyntheticEvent, useState } from "react";
import { DataService } from "../../services/DataService";

interface CustomEvent {
  target: HTMLInputElement;
}
export interface ICreateSpaceState {
  name?: string;
  location?: string;
  description?: string;
  photoURL?: string;
  photo?: File;
}
interface ICreateSpaceProps {
  dataService: DataService;
}

const CreateSpace = (props: ICreateSpaceProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File>();

  function setPhotoURLHandler(event: CustomEvent) {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const stateClone = { name, location, description, photo };
    try {
      const id = await props.dataService.createSpace(stateClone);
      alert(`created space with id ${id}`);
    } catch (error: any) {
      alert(`Error while creating space:  ${error.message}`);
      console.error(error);
    }
  }

  let photoSpace;
  if (photo) {
    const localPhotoURL = URL.createObjectURL(photo);
    photoSpace = <img alt="" src={localPhotoURL} />;
  } else {
    photoSpace = <div></div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <br />
        <input
          name="space name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <br />
        <input
          name="space location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <br />
        <input
          name="space location"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Photo:
        <br />
        <input
          name="photo"
          type="file"
          onChange={(e) => setPhotoURLHandler(e)}
        />
      </label>
      <br />
      {photoSpace}
      <br />
      <input data-test="submit-button" type="submit" value="Create space" />
    </form>
  );
};

export default CreateSpace;
