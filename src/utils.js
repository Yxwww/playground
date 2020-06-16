export function track(tag) {
  return (data) => {
    console.log(`TAG ${tag}: `, data);
    return data;
  };
}
