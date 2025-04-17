import { useEffect, useState } from 'react';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user details');
        const data = await response.json();
        setUser({
          aadhar: data.aadhar || '',
          avatar: data.avatar || '',
          contact_no: data.contact_no || '',
          email: data.email || '',
          emergency_no: data.emergency_no || '',
          name: data.name || '',
          pet_type: data.pet_type || '',
          total_points: data.total_points || 0,
          visited_location: data.visited_location || []
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500 text-center mt-4">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8 border">
      <div className="flex items-center space-x-4">
        {user.avatar ? (
          <img
            src={`/path/to/avatars/${user.avatar}`}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p><strong>Aadhar:</strong> {user.aadhar}</p>
        <p><strong>Contact No:</strong> {user.contact_no}</p>
        <p><strong>Emergency No:</strong> {user.emergency_no}</p>
        <p><strong>Pet Type:</strong> {user.pet_type}</p>
        <p><strong>Total Points:</strong> {user.total_points}</p>
        <p><strong>Visited Locations:</strong></p>
        {user.visited_location.length > 0 ? (
          <ul className="list-disc list-inside">
            {user.visited_location.map((loc, index) => (
              <li key={index}>{loc}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No visited locations</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
