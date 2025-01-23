import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const SearchResultsPage = async ({ searchParams }) => {
  await connectDB();
  const { location, propertyType } = await searchParams;
  const locationPattern = new RegExp(location, 'i');

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType && propertyType !== 'All') {
    const propertyTypePattern = new RegExp(propertyType, 'i');
    query.type = propertyTypePattern;
  }

  const propertyQueryResults = await Property.find(query).lean();
  const properties = convertToSerializedObject(propertyQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="container-xl lg:container m-auto px-4 ">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <FaArrowAltCircleLeft className="mr-2" />
          Back to all properties
        </Link>
        <h1 className="text-2xl mb-4">Search Results</h1>
        {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
      </section>
    </>
  );
};

export default SearchResultsPage;
