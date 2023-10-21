import { useParams } from "react-router-dom";
export const PetPage = () => {
  const { name, id } = useParams();

  return (
    <main className="pet-page">
      <h1 className="page-heading">{name}</h1>
      <div className="pet-page-inner"></div>
    </main>
  );
};

export default PetPage;
