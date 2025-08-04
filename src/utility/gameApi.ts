// services/gameApi.ts
export const createGame = async () => {    
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/game`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
};

export const getGame = async (id: string) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/game/${id}`);
  return res.json();
};
