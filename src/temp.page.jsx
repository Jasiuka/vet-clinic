export const TempPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const file = form.upload.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const response = fetch("/api/v1/files/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="upload" type="file" />
        <button>Submit</button>
      </form>
    </main>
  );
};

export default TempPage;
