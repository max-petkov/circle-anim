gsap.registerPlugin(MotionPathPlugin);

showCircles();

function showCircles() {
  const circles = document.querySelectorAll(".circles path");
  const tl = gsap.timeline();

  tl.fromTo(
    circles,
    {
      autoAlpha: 0,
      scale: 0.5,
      transformOrigin: "center",
    },
    {
      autoAlpha: 1,
      scale: 1,
      ease: Back.easeInOut.config(1.7),
      duration: 0.8,
      stagger: {
        each: 0.15,
        from: "end",
      },
      onComplete: attachShapes,
    }
  );
}

function attachShapes() {
  const circleBig = document.querySelector(".circles .big");
  const shapes = document.querySelectorAll(".shapes img");
  const duration = 180;
	let tl = null;

	moveShapes();
  onResize(moveShapes);

  function moveShapes() {
		if(tl) tl = null;
    tl = gsap.timeline({
      defaults: {
        duration: duration,
        repeat: -1,
        ease: Power0.easeNone,
      },
    });

    tl.to(shapes, {
      motionPath: {
        path: circleBig,
        align: circleBig,
        alignOrigin: [0.5, 0.5],
        autoRotate: function (i, el) {
          if (el.getAttribute("data-shape") === "person") return false;
        },
        start: function (i) {
          if (!i) return 0.6;
          if (i === 1) return 0.1;
          if (i === 2) return 0.4;
          if (i === 3) return 0.2;
          if (i === 4) return 0.8;
        },
        end: function (i) {
          if (!i) return 1.6;
          if (i === 1) return 1.1;
          if (i === 2) return 1.4;
          if (i === 3) return 1.2;
          if (i === 4) return 1.8;
        },
        onEnter: function (i) {
          const lastShape = i === shapes.length - 1;
          if (lastShape) return showShapes();
        },
      },
    });

  }

  function showShapes() {
    const tl = gsap.timeline();
    tl.fromTo(
      [shapes[0], shapes[1]],
      {
        rotate: 90,
        scale: 0,
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        rotate: 0,
        scale: 1,
        duration: 0.25,
        ease: Power0.easeNone,
        stagger: 0.05,
      }
    )
      .fromTo(
        [shapes[2], shapes[3], shapes[4]],
        {
          rotate: 180,
          scale: 0,
          autoAlpha: 0,
        },
        {
          rotate: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: Back.easeInOut.config(0.6),
          stagger: 0.05,
        },
        0
      )
      .to(
        [shapes[2], shapes[3], shapes[4]],
        {
          rotate: 360,
          repeat: -1,
          duration: duration / 4,
          ease: Power0.easeNone,
        },
        "<90%"
      );
  }
}

function onResize(cb) {
  let w = window.innerWidth;
  let h = window.innerHeight;

  window.addEventListener("resize", function () {
    if (w !== window.innerWidth || h !== window.innerHeight) {
      w = window.innerWidth;
      h = window.innerHeight;
      cb();
    }
  });
}
