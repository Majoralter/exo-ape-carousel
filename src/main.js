import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const totalSlides = 5;
  let currentSlide = 1,
    isAnimating = false,
    scrollAllowed = true,
    lastScrollTime = 0;

  const slideTitles = [
      "Red & Bold",
      "Fractal Rose",
      "Sea Wonder",
      "Arcade Mania",
      "Caravaggio",
    ],
    slideDescriptions = [
      "Very red Very bold",
      "Photography",
      "Natural art",
      "Retro gaming",
      "Baroque painting",
    ];

  function createSlide(slideNumber, direction) {
    const slide = document.createElement("div");
    slide.className = "slide";
    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = `./assets/img${slideNumber}.jpg`;
    img.alt = slideTitles[slideNumber - 1];

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    if (direction === "down") {
      slideBgImg.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    } else {
      slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    }

    return slide;
  }

  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = `./assets/img${slideNumber}.jpg`;
    img.alt = slideTitles[slideNumber - 1];

    wrapper.appendChild(img);

    if (direction === "down") {
      wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    } else {
      wrapper.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    }

    return wrapper;
  }

  function createTextElements(slideNumber, direction) {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    gsap.set(newTitle, { y: direction === "down" ? 50 : -50 });

    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[slideNumber - 1];
    gsap.set(newDescription, { y: direction === "down" ? 20 : -20 });

    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber;
    gsap.set(newCounter, { y: direction === "down" ? 18 : -18 });

    return { newTitle, newDescription, newCounter };
  }

  function animateSlide(direction) {
    if (isAnimating || !scrollAllowed) return;

    isAnimating = true;
    scrollAllowed = false;

    const slider = document.querySelector(".slider"),
      currentSlideElement = document.querySelector(".slide"),
      mainImageContainer = document.querySelector(".slide-main-img"),
      currentMainWrapper = document.querySelector(".slide-main-img-wrapper");

    const titleContainer = document.querySelector(".slide-title"),
      descriptionContainer = document.querySelector(".slide-description"),
      counterContainer = document.querySelector(".count");

    const currentTitle = titleContainer.querySelector("h1"),
      currentDescription = descriptionContainer.querySelector("p"),
      currentCounter = counterContainer.querySelector("p");

    if (direction === "down") {
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    const newSlide = createSlide(currentSlide, direction),
      newMainWrapper = createMainImageWrapper(currentSlide, direction),
      { newTitle, newDescription, newCounter } = createTextElements(
        currentSlide,
        direction
      );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);
    counterContainer.appendChild(newCounter);

    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach((el) => el?.remove());

        isAnimating = false;
        setTimeout(() => {
          scrollAllowed = true;
          lastScrollTime = Date.now();
        }, 50);
      },
    });

    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: .75,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    )
      .to(
        currentSlideElement.querySelector("img"),
        {
          scale: 1.5,
          rotate: direction === "down" ? 4 : -4,
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === "down"
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentMainWrapper.querySelector("img"),
        {
          y: direction === "down" ? "50%" : "-50%",
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          y: "0%",
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentTitle,
        {
          y: direction === "down" ? -50 : 50,
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newTitle,
        {
          y: "0",
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentDescription,
        {
          y: direction === "down" ? -20 : 20,
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newDescription,
        {
          y: "0",
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        currentCounter,
        {
          y: direction === "down" ? -18 : 18,
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      )
      .to(
        newCounter,
        {
          y: "0",
          duration: .75,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      );
  }

  function handleScroll(direction) {
    const now = Date.now();
    if (isAnimating || !scrollAllowed) return;
    if (now - lastScrollTime < 1000) return;
    lastScrollTime = now;
    animateSlide(direction);
  }

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    },
    {
      passive: false,
    }
  );

  let touchStartY = 0;
  let isTouchActive = false;

  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    },
    {
      passive: false,
    }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;

      const touchCurrentY = e.touches[0].clientY,
        difference = touchStartY - touchCurrentY;
      if (Math.abs(difference) > 10) {
        isTouchActive = false;
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    },
    {
      passive: false,
    }
  );

  window.addEventListener("touchend", () => {
    isTouchActive = false;
  });
});
