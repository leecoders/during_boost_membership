export default {
  setInitialData: async () => {
    fetch("http://localhost:8000/initial-data", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        setMessages(res);
      })
      .catch(error => console.error("Error:", error));
  }
};
