const host = "http://localhost:8080/api";
const url = (path) => `${host}/${path}`;

const header = {
  headers: {
    "Content-Type": "application/json",
  },
};
//json で送っているということをサーバーに通知する必要があるので、HTTP のヘッダーにContent-Type: application/jsonを指定しています。

export const get = async (path) => {
  const resp = await fetch(url(path));
  checkError(resp.status);
  const result = await resp.json();

  return result;
};

export const post = async (path, body) => {
  const options = { ...header, method: "POST", body: JSON.stringify(body) };

  const resp = fetch(url(path), options).catch((e) => {
    console.log(e);
  });
  checkError(resp.status);
  const result = await resp.json();

  return result;
};

export const deleteRequest = async (path) => {
  const options = { method: "DELETE" };

  const resp = await fetch(url(path), options);
  checkError(resp.status);

  // 204 No Contentが返ってくるので成功の場合は何もreturnしない
  return;
};

const checkError = (status) => {
  // 今回は400以上の場合は全部まとめてエラーとして処理
  if (status >= 400) {
    throw new Error("エラーが発生しました。時間を置いて再度お試しください。");
  }
};
