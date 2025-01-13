const PropertyPage = ({ params, searchParams}) => {
  return (
    <div>
      <h1>Property Page {params.id} {searchParams.name}</h1>
    </div>
  );
};

export default PropertyPage;



