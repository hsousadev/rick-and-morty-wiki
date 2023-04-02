function scrollToDiv(id: string) {
  const div = document.querySelector(`#${id}`);

  if (div) {
    div.scrollIntoView({ block: "start", behavior: "smooth" });

    div.classList.add("div-animation");

    setTimeout(() => {
      div.classList.remove("div-animation");
    }, 1000);
  }
}

export default scrollToDiv;
