import { useEffect, useState } from "react";


const Admin = () => {


 const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/admin')
      .then(res => res.json())      // correctly parse JSON
      .then(fetchedData => setData(fetchedData)) // set state
      .catch(err => console.log(err));
  }, []);

console.log(data)


  return <>
<div className="min-h-screen bg-gray-100 p-8">
  <div className="max-w-5xl mx-auto">
    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <h2 className="text-lg text-gray-600">Current Users Login to Your Application</h2>
    </div>

    {/* Users Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data
        ?.filter(user => !(user.name === "Admin" && user.email === "admin333@gmail.com")) // filter out admin
        .map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
    </div>
  </div>
</div>



  </>
    
};

export default Admin;