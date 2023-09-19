const button = $('.open-button');
const envelope = $('.envelope');
const card = $('.card');
const mask = $('.mask');
const invitationCard = $('.face.front');
const image3 = $('.open-button .image3'); // 이미지 요소 추가
let isOpen = false;

// 초기 상태에서 카드 숨김
card.css('transform', 'translate(0, 100%)');

// 봉투 클릭 이벤트 리스너
button.on('click', function () {
    if (!isOpen) {
        openEnvelope();
        image3.css('display', 'none'); // 봉투를 열 때 이미지 숨김
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
        ease: Circ.easeInOut
    }, 'moveDown')
    .to('button', 1, {
        y: '-300px',
        ease: Circ.easeInOut,
    }, 'moveDown+=0.15')
    .to(image3, 0.5, {
        display: 'block', // 이미지를 열 때 다시 표시
        ease: Power1.easeInOut,
        delay: 0. // 이미지를 나타낼 딜레이 시간 조정
    });
}

function closeEnvelope() {
    const tl = new TimelineMax();
    tl.to('.card', 1, {
        y: '100%', // 카드를 다시 아래로 이동
        ease: Circ.easeInOut
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
            toggleText();
        }
    }, 'moveUp+=0.15')
    .set('.flap', {
        zIndex: 1
    })
    .set('button', {
        zIndex: 2 
    });
}
