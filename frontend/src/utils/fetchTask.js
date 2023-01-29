export const fetchTask = async id => {
  try {
    const response = await fetch(`/api/tasks/${id}`);

    if (!response.ok) {
      throw new Error(`Oops, ${response.status}: ${response.statusText}`);
    }

    const data = response.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
