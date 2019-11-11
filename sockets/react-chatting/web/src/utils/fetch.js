export default {
  fetchInitialData: async roomNumber => {
    return fetch("http://localhost:8000/initial-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ roomNumber: roomNumber })
    })
      .then(res => res.json())
      .then(response => response)
      .catch(error => console.error("Error:", error));
  }
};
