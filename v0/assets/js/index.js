document.querySelector("#dropdown").addEventListener("change", (event) => {
  const value = event.target.value;
  if (value == "studiengang") {
    document.querySelector("#section_studiengange").classList.remove("hidden");
    document.querySelector("#section_semester").classList.add("hidden");
  }
  if (value == "semester") {
    document.querySelector("#section_semester").classList.remove("hidden");
    document.querySelector("#section_studiengange").classList.add("hidden");
  }
});
