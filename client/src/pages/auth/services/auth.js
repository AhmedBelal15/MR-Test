const auth = async (body, route) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/${route}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw data;
    }
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default auth;
