function main() {
  startRunning();
  setTimeout(jump, 1000);
  setTimeout(bonusActivate, 1400);
  setTimeout(mushroomAppears, 1400);

  let flowerParts = flowerGrows();

  playAndStop(flowerParts);
}

function startRunning() {
  let mario = anime({
    targets: '.mario',
    translateX: 250,
    duration: 2000,
    easing: 'linear',
  });

  setTimeout(() => mario.pause(), 1000);

  // Левая нога стартует
  let runningLeft = anime({
    targets: '.left-leg',
    translateY: -5,
    duration: 200,
    direction: 'alternate',
    easing: 'linear',
    loop: true,
  });

  // Левая нога стопается
  setTimeout(() => anime({
    targets: '.left-leg',
    translateY: 0,
    duration: 200,
    easing: 'linear',
  }), 1000);

  setTimeout(() => runningLeft.pause(), 1000);

  // Правая нога объявлена и сразу стопается
  let runningRight = anime({
    targets: '.right-leg',
    translateY: -5,
    duration: 200,
    direction: 'alternate',
    easing: 'linear',
    loop: true,
  })
  runningRight.pause();

  // Запуск правой ноги
  setTimeout(() => runningRight.play(), 200);

  // Остановка правой ноги
  setTimeout(() => anime({
    targets: '.right-leg',
    translateY: 0,
    duration: 200,
    easing: 'linear',
  }), 1000);

  setTimeout(() => runningRight.pause(), 1000);
}

function jump() {
  anime({
    targets: ['.right-hand', '.right-palm'],
    rotate: '-110deg',
    duration: 400,
    easing: 'linear',
    direction: 'alternate',
  });

  anime({
    targets: ['.left-hand', '.left-palm'],
    rotate: '40deg',
    duration: 400,
    easing: 'linear',
    direction: 'alternate',
  });

  anime({
    targets: '.mario',
    translateY: -40,
    duration: 400,
    direction: 'alternate',
    easing: 'cubicBezier(.5, .05, .05, .5)',
  })
}

function bonusActivate() {
  anime({
    targets: '.bonus',
    translateY: -10,
    duration: 150,
    direction: 'alternate',
    easing: 'easeInOutCubic',
  });

  anime({
    targets: '.bonus',
    backgroundColor: '#FFFF00',
    color: '#FFFF00'
  });
}

function mushroomAppears() {
  anime({
    targets: '.mushroom',
    translateY: -40,
  });
}

function flowerGrows() {
  let flower = anime({
    targets: '.flower',
    translateY: -80,
    duration: 1600,
    delay: 500,
    easing: 'easeOutQuad',
    direction: 'alternate',
    loop: true,
  });

  let flowerLeft = anime({
    targets: '.left-flower',
    rotate: [45, 90],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
  })
  
  let flowerRight = anime({
    targets: '.right-flower',
    rotate: [-45, -90],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
  })

  return [flower, flowerLeft, flowerRight];
}

function playAndStop(flowerParts, count=0) {
  let btn = document.querySelector('.btn');

  if (count % 2 == 0) {
    btn.addEventListener('click', stop);
  }
  else {
    btn.addEventListener('click', play);
  }

  function play() {
    for (part of flowerParts) {
      part.play();
    }
    count++;
    return playAndStop(flowerParts, count);
  }

  function stop() {
    for (part of flowerParts) {
      part.pause();
    }
    count++;
    return playAndStop(flowerParts, count);
  }
}

main();