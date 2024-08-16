import { Customer } from "../types/customer";

export const fetchCustomers = async (): Promise<Customer[]> => {
  return [
    
      { id: 1, name: "John Doe", title: "CEO", address: "123 Elm Street" },
      { id: 2, name: "Jane Smith", title: "CTO", address: "456 Oak Avenue" },
      { id: 3, name: "Sam Johnson", title: "CFO", address: "789 Pine Road" },
      { id: 4, name: "Alice Brown", title: "COO", address: "321 Birch Lane" },
      { id: 5, name: "Bob White", title: "CMO", address: "654 Cedar Drive" },
      { id: 6, name: "Eve Black", title: "VP of Sales", address: "987 Maple Blvd" },
      { id: 7, name: "Charlie Blue", title: "VP of Marketing", address: "246 Spruce St" },
      { id: 8, name: "Diana Gray", title: "HR Manager", address: "135 Elm Street" },
      { id: 9, name: "Eric Green", title: "Product Manager", address: "246 Oak Avenue" },
      { id: 10, name: "Fiona Red", title: "UX Designer", address: "357 Pine Road" },
      { id: 11, name: "George Purple", title: "Software Engineer", address: "468 Birch Lane" },
      { id: 12, name: "Helen White", title: "Business Analyst", address: "579 Cedar Drive" },
      { id: 13, name: "Ian Black", title: "Marketing Specialist", address: "680 Maple Blvd" },
      { id: 14, name: "Jane Blue", title: "Sales Manager", address: "791 Spruce St" },
      { id: 15, name: "Kevin Gray", title: "Customer Support", address: "902 Elm Street" },
      { id: 16, name: "Laura Green", title: "Office Manager", address: "213 Oak Avenue" },
      { id: 17, name: "Mike Red", title: "Finance Manager", address: "324 Pine Road" },
      { id: 18, name: "Nina Purple", title: "Technical Lead", address: "435 Birch Lane" },
      { id: 19, name: "Oscar White", title: "Content Writer", address: "546 Cedar Drive" },
      { id: 20, name: "Paul Black", title: "Web Developer", address: "657 Maple Blvd" },
      { id: 21, name: "Quinn Blue", title: "Graphic Designer", address: "768 Spruce St" },
      { id: 22, name: "Rachel Gray", title: "Product Owner", address: "879 Elm Street" },
      { id: 23, name: "Steve Green", title: "Quality Analyst", address: "980 Oak Avenue" },
      { id: 24, name: "Tina Red", title: "Project Coordinator", address: "291 Pine Road" },
      { id: 25, name: "Ursula Purple", title: "Data Scientist", address: "402 Birch Lane" },
      { id: 26, name: "Victor White", title: "Business Development", address: "513 Cedar Drive" },
      { id: 27, name: "Wendy Black", title: "Social Media Manager", address: "624 Maple Blvd" },
      { id: 28, name: "Xander Blue", title: "DevOps Engineer", address: "735 Spruce St" },
      { id: 29, name: "Yvonne Gray", title: "Research Analyst", address: "846 Elm Street" },
      { id: 30, name: "Zara Green", title: "Lead Designer", address: "159 Willow Way" },
    ];
};


export const fetchPhotos = async (): Promise<string[]> => {
  const response = await fetch("https://api.unsplash.com/photos/random?count=9&client_id=G73sfWIJBf0Ucr_u309muqtF-2e34jR5lgD0cBigRyU");
  const data = await response.json();
  return data.map((photo: any) => photo.urls.small); // Return an array of photo URLs
};
