export default {
  fetchInitialData: async () => {
    return fetch("http://localhost:8000/initial-data", {
      method: "GET"
    })
      .then(res => res.json())
      .then(response => response)
      .catch(error => console.error("Error:", error));
  }
};
