const button = $('.open-button');
const envelope = $('.envelope');
const card = $('.card');
const mask = $('.mask');
const invitationCard = $('.face.front');
let isOpen = false;

button.on('click', function () {
    if (!isOpen) {
        openEnvelope();
    } else {
        closeEnvelope();
    }
});

function openEnvelope() {
    const tl = new TimelineMax();
    tl.to('.flap', 1, {
        rotationX: 180,
        ease: Power1.easeInOut
    }, 'scaleBack')
    .to('.invitation', 1, {
        scale: 0.8,
        ease: Power4.easeInOut
    }, 'scaleBack')
    .set('.flap', {
        zIndex: 0
    })
    .to('.card', 1, {
        y: '0%',
        scaleY: 1,
        ease: Circ.easeInOut,
        onComplete: function() {
            showImage();
        }
    })
    .set('.mask', {
        overflow: 'visible',
        onComplete: function() {
            envelope.toggleClass('is-open');
        }
    })
    .to('.mask', 1.3, {
        'clip-path': 'inset(0 0 0% 0)',
        ease: Circ.easeInOut
    }, 'moveDown')
    .to('.open-button', 1, {
        y: '180px',
        ease: Circ.easeInOut,
        onComplete: toggleText
    }, 'moveDown+=0.15')
    .to('.card', 1, {
        y: '0%',
        scaleY: 1,
        ease: Circ.easeInOut,
    }, 'moveDown'); 

    isOpen = true;
    return tl;
}

function closeEnvelope() {
    const tl = new TimelineMax();
    tl.to('.card', 1, {
        rotationX: 0,
        ease: Power4.easeInOut,
        onComplete: function() {
            card.css('transform', 'translate(-50%, -50%) rotateX(0deg)');
        }
    })
    .to('.mask', 1.3, {
        'clip-path': 'inset(0 0 50% 0)',
        ease: Circ.easeInOut
    }, 'moveUp')
    .to('.card', 1.3, {
        y: '100%',
        scaleY: 1,
        ease: Circ.easeInOut
    }, 'moveUp')
    .to('.flap', 1, {
        rotationX: 0,
        ease: Power1.easeInOut
    }, 'scaleUp')
    .to('.invitation', 1, {
        scale: 1,
        ease: Power4.easeInOut
    }, 'scaleUp')
    .to('.open-button', 1, {
        y: '0px',
        ease: Circ.easeInOut,
        onComplete: function() {
            button.css('display', 'block');
        }
    }, 'moveUp+=0.15')
    .to('.card', 1, {
        y: '0%',
        scaleY: 1,
        ease: Circ.easeInOut,
    }, 'moveUp');

    isOpen = false;
    return tl;
}

function toggleText() {
    var text = isOpen ? 'Tell me more!' : 'See you there!';
    button.toggleClass('invert', !isOpen).text(text);
}

function showImage() {
    invitationCard.find('img').fadeIn();
}
