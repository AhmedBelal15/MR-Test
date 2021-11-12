const getTableData = async (setTableData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/get-random`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({
        input: "",
        data: data[i],
        average: "",
      });
    }

    if (response.status !== 200) {
      throw data;
    }
    setTableData(newData)
  } catch (error) {
    return [null, error];
  }
};

export default getTableData;
