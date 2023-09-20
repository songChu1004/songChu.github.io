const button = $('.open-button');
const envelope = $('.envelope');
const card = $('.card');
const mask = $('.mask');
const invitationCard = $('.face.front');
let isOpen = false;

// 초기 상태에서 카드 숨김
card.css('transform', 'translate(0, 100%)');

// 봉투 클릭 이벤트 리스너
button.on('click', function () {
    if (!isOpen) {
        openEnvelope();
    } else {
        closeEnvelope();
    }
});

// 카드 클릭 이벤트 리스너
card.on('click', function () {
    if (isOpen) {
        flipCard();
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
        ease: Circ.easeInOut
    }, 'moveDown')
    .set('.mask', {
        overflow: 'visible',
        onComplete: function () {
            isOpen = true;
        }
    })
    .to('.mask', 1.3, {
        'clip-path': 'inset(0 0 0% 0)',
        ease: Circ.easeInOut
    }, 'moveDown')
    .to('.card', 1.3, {
        y: '0%', // 카드를 위로 이동
        ease: Circ.easeInOut,
        onComplete: function () {
            toggleCardFaces(); // 카드가 열릴 때 앞면과 뒷면을 보여주거나 숨기는 함수 호출
        }
    }, 'moveDown')
    .to('button', 1, {
        y: '-300px',
        ease: Circ.easeInOut,
    }, 'moveDown+=0.15')
    .set('card',{
        zIndex: 2
    });
}

function closeEnvelope() {
    const tl = new TimelineMax();
    tl.to('.card', 1, {
        y: '100%', // 카드를 아래로 이동
        ease: Circ.easeInOut,
        onComplete: function () {
            toggleCardFaces(); // 카드가 닫힐 때 앞면과 뒷면을 보여주거나 숨기는 함수 호출
        }
    }, 'moveUp')
    .to('.mask', 1.3, {
        'clip-path': 'inset(0 0 50% 0)',
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
    .to('button', 1, {
        y: '0px',
        ease: Circ.easeInOut,
        onComplete: function () {
            isOpen = false;
        }
    }, 'moveUp+=0.15')
    .set('.flap', {
        zIndex: 1
    })
    .set('button', {
        zIndex: 2 
    });
}

function flipCard() {
    const tl = new TimelineMax();
    tl.to('.card', 1, {
        rotationY: isOpen ? 0 : 180, // 카드를 뒤집음
        ease: Power1.easeInOut,
        onComplete: function () {
            isOpen = !isOpen; // 카드 상태를 업데이트
            toggleCardFaces(); // 카드를 뒤집을 때 앞면과 뒷면을 보여주거나 숨기는 함수 호출
        }
    });
}

function toggleCardFaces() {
    if (isOpen) {
        $('.face.front').css('display', 'none');
        $('.face.back').css('display', 'block');
    } else {
        $('.face.front').css('display', 'block');
        $('.face.back').css('display', 'none');
    }
}
