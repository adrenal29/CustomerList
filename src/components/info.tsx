import React, { useEffect, useState } from "react";
import { Customer } from "../types/customer";
import { fetchPhotos } from "../services/customer";

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const newPhotos = await fetchPhotos();
      setPhotos(newPhotos.slice(0, 9)); // Get 9 photos for the grid
    };

    getPhotos(); // Initial photo fetch

    const interval = setInterval(() => {
      getPhotos();
    }, 10000); // Update photos every 10 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [customer]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{customer.name}</h2>
        <p className="text-lg md:text-xl">{customer.title}</p>
        <p className="text-sm md:text-base">{customer.address}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {photos.map((photoUrl, index) => (
          <img
            key={index}
            src={photoUrl}
            alt={`Customer Photo ${index + 1}`}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
