import { useEffect, useState } from "react";
import styles from "./SpaceComponent.module.css";

const defaultPhoto =
  "https://images.unsplash.com/photo-1517664604184-9c1d2962d0a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1078&q=80";

interface SpaceProps {
  spaceId: string;
  name: string;
  location: string;
  photoURL?: string;
  reserveSpace: (spaceId: string) => void;
}

const SpaceComponent = (props: SpaceProps) => {
  const { name, location, photoURL, reserveSpace, spaceId } = props;
  const [imageUrl, setImageUrl] = useState<string>(defaultPhoto);

  useEffect(() => {
    if (photoURL) {
      setImageUrl(photoURL);
    }
  }, [photoURL]);

  return (
    <div className={styles.space}>
      <img className={styles.image} src={imageUrl} alt="" />
      <div className={styles.container}>
        <label className={styles.name}>{name}</label>
        <label className={styles.spaceId}>{spaceId}</label>
        <label className={styles.location}>{location}</label>
        <button onClick={() => reserveSpace(spaceId)}>Reservce</button>
      </div>
    </div>
  );
};

export default SpaceComponent;
