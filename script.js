document.addEventListener('DOMContentLoaded', () => {
    // 1. Question Pool (4 per trait)
    const questionPool = {
        E: [
            { text: "주말에 약속이 없다면?", a: "집에서 푹 쉬며 에너지를 충전한다", b: "친구들을 만나 밖에서 시간을 보낸다", trait: "E", bAdds: true },
            { text: "새로운 모임에 갔을 때 나의 모습은?", a: "주로 남의 이야기를 듣는 편이다", b: "먼저 말을 걸어 대화를 주도한다", trait: "E", bAdds: true },
            { text: "당신이 에너지를 얻는 방법은?", a: "조용한 곳에서 혼자만의 시간을 가질 때", b: "다양한 사람들과 어울리고 대화할 때", trait: "E", bAdds: true },
            { text: "친해지고 싶은 사람이 생기면?", a: "상대방이 먼저 다가와 주길 기다린다", b: "먼저 인사를 건네며 질문을 던진다", trait: "E", bAdds: true }
        ],
        S: [
            { text: "사물을 바라볼 때 나의 스타일은?", a: "세부적인 부분과 현재의 사실에 집중한다", b: "전체적인 흐름과 가능성을 먼저 본다", trait: "S", bAdds: false },
            { text: "이야기를 할 때 나는 어떤 편인가요?", a: "구체적이고 현실적인 경험담을 주로 말한다", b: "비유나 상상을 섞어 미래지향적으로 말한다", trait: "S", bAdds: false },
            { text: "새로운 물건을 샀을 때 나는?", a: "사용 설명서를 꼼꼼히 읽어본다", b: "일단 직접 만져보며 기능을 익힌다", trait: "S", bAdds: false },
            { text: "'꽃'이라는 단어를 들으면 떠오르는 것은?", a: "장미, 향기, 예쁘다", b: "꽃말, 졸업식, 설렘", trait: "S", bAdds: false }
        ],
        T: [
            { text: "친구가 고민을 털어놓을 때 나의 반응은?", a: "상황을 분석하고 현실적인 조언을 해준다", b: "친구의 감정에 공감하며 위로해준다", trait: "T", bAdds: false },
            { text: "무언가를 결정할 때 더 중요하게 생각하는 것은?", a: "객관적인 논리와 원칙", b: "나와 주변 사람들의 감정과 관계", trait: "T", bAdds: false },
            { text: "친구가 '나 시험 떨어졌어'라고 할 때?", a: "무슨 시험이었어? 왜 떨어진 것 같아?", b: "정말 고생 많았는데... 너무 속상하겠다", trait: "T", bAdds: false },
            { text: "거절해야 하는 상황에서 나는?", a: "이유를 논리적으로 설명하며 딱 잘라 말한다", b: "상대방이 상처받지 않게 최대한 돌려 말한다", trait: "T", bAdds: false }
        ],
        J: [
            { text: "여행 짐을 쌀 때 나의 습관은?", a: "미리 필요한 목록을 작성해 꼼꼼히 챙긴다", b: "떠나기 직전에 손에 잡히는 대로 챙긴다", trait: "J", bAdds: false },
            { text: "중요한 약속이 있을 때 나는?", a: "미리 경로를 파악하고 여유 있게 도착한다", b: "가면서 경로를 확인하고 시간에 맞춰 간다", trait: "J", bAdds: false },
            { text: "갑자기 새로운 일정이 생겼을 때?", a: "원래 계획이 틀어져서 스트레스를 받는다", b: "새로운 상황에 맞춰 유연하게 대처한다", trait: "J", bAdds: false },
            { text: "책상 위를 정리할 때 나는?", a: "모든 물건이 정해진 위치에 있어야 편하다", b: "어느 정도 어질러져 있어도 찾는 데 문제없다", trait: "J", bAdds: false }
        ]
    };

    const resultData = {
        "ISTJ": { alias: "청렴결백한 논리주의자", desc: "한 번 시작한 일은 끝까지 해내는 성실함의 정석입니다.", humor: "계획에 차질 생겼을 때: '엑셀 파일 17행 수정해야겠네... (침착하지만 동공지진)'" },
        "ISFJ": { alias: "용감한 수호자", desc: "주변 사람들을 세심하게 챙기며 헌신하는 따뜻한 마음을 가졌습니다.", humor: "부탁 거절하고 나서: '아, 아까 그냥 들어줄 걸 그랬나? 기분 나쁘면 어떡하지? (밤새 고민함)'" },
        "INFJ": { alias: "선의의 옹호자", desc: "높은 통찰력으로 사람들에게 영감을 주는 이상주의자입니다.", humor: "혼자 있을 때: '인간 문명의 끝은 어디일까... (갑자기 철학의 늪에 빠짐)'" },
        "INTJ": { alias: "전략가", desc: "세상의 모든 일을 분석하고 체계적으로 계획하는 독립적인 영혼입니다.", humor: "대화할 때: '그 말에 논리적 오류가 3개 있는데, 들어볼래? (의도치 않은 팩폭)'" },
        "ISTP": { alias: "만능 재주꾼", desc: "냉철한 이성과 왕성한 호기심으로 세상을 관찰하는 분석가입니다.", humor: "카톡 답장 안 하는 이유: '읽었는데 답장하는 걸 까먹음. 아니면 굳이 할 말 없어서 안 함.'" },
        "ISFP": { alias: "호기심 많은 예술가", desc: "따뜻하고 자유로운 영혼을 가진 다정다감한 예술가형입니다.", humor: "침대에 누웠을 때: '아... 누워있는 게 세상에서 제일 짜릿해. (한 번 누우면 안 일어남)'" },
        "INFP": { alias: "열정적인 중재자", desc: "자기만의 가치관이 뚜렷하고 공감 능력이 뛰어난 몽상가입니다.", humor: "상상할 때: '나중에 초능력 생기면 뭐부터 하지? (이미 히어로 영화 한 편 찍음)'" },
        "INTP": { alias: "논리적인 사색가", desc: "끊임없이 새로운 지식을 탐구하며 비판적인 사고를 즐기는 지성인입니다.", humor: "누가 '너 내 말 이해했어?' 물으면: '이해는 했는데, 니 가정이 틀린 것 같아.'" },
        "ESTP": { alias: "모험을 즐기는 사업가", desc: "에너지가 넘치고 현실적인 감각이 뛰어나 문제 해결에 능숙합니다.", humor: "위기 상황에서: '일단 해보자고! 어떻게든 되겠지! (실제로 어떻게든 해냄)'" },
        "ESFP": { alias: "자유로운 영혼의 연예인", desc: "사람들과 어울리는 것을 좋아하며 인생을 즐겁게 살아가는 분위기 메이커입니다.", humor: "쇼핑할 때: '와 이거 진짜 예쁘다! 내 거네! (정신 차리면 결제 완료)'" },
        "ENFP": { alias: "재기발랄한 활동가", desc: "풍부한 상상력과 열정으로 주위 사람들에게 즐거움을 전파합니다.", humor: "의욕 넘칠 때: '오! 나 이제부터 갓생 산다! (30분 후: 유튜브 쇼츠 보는 중)'" },
        "ENTP": { alias: "뜨거운 논쟁을 즐기는 변론가", desc: "고정관념을 타파하고 새로운 아이디어를 제시하는 지적인 탐험가입니다.", humor: "반대 의견 낼 때: '아니, 그건 아니지. 만약 이렇다면 어떨까? (사실 본인도 확신 없음)'" },
        "ESTJ": { alias: "엄격한 관리자", desc: "규칙을 중시하고 체계적인 일 처리를 선호하는 실질적인 지도자입니다.", humor: "모임 장소 정할 때: '몇 시, 어디서, 메뉴 뭐로. 이미 다 정했으니까 몸만 와.'" },
        "ESFJ": { alias: "사교적인 친선도모자", desc: "타인의 감정을 잘 살피며 조화로운 분위기를 만드는 배려의 아이콘입니다.", humor: "리액션할 때: '진짜?! 대박!! 헐!!! (영혼 없다는 소리 가끔 들음)'" },
        "ENFJ": { alias: "정의로운 사회운동가", desc: "넘치는 카리스마와 공감 능력으로 사람들을 이끄는 따뜻한 리더입니다.", humor: "친구들 고민 상담해줄 때: '우리 다 같이 잘 이겨낼 수 있어! 내가 도와줄게! (이미 지인들의 비축 에너지 셰프)'" },
        "ENTJ": { alias: "대담한 지도자", desc: "장기적인 안목으로 목표를 설정하고 효율적으로 조직을 이끄는 지휘관입니다.", humor: "일 안 하는 사람 볼 때: '효율 0에 수렴하네... 내가 그냥 하고 만다. 비켜.'" }
    };

    let scoreE = 0, scoreS = 0, scoreT = 0, scoreJ = 0;
    let selectedQuestions = [];
    let currentIdx = 0;

    // Shuffle Array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Pick 2 random from pool each trait
    function generateTestSet() {
        selectedQuestions = [];
        const traits = ['E', 'S', 'T', 'J'];

        traits.forEach(trait => {
            const pool = questionPool[trait];
            const picked = shuffle([...pool]).slice(0, 2);
            selectedQuestions.push(...picked);
        });

        // Shuffle the final 8 questions
        shuffle(selectedQuestions);

        // Shuffle choices for each question
        selectedQuestions.forEach(q => {
            if (Math.random() > 0.5) {
                // Swap A and B
                const oldA = q.a, oldB = q.b;
                q.a = oldB; q.b = oldA;
                q.bAdds = !q.bAdds;
            }
        });
    }

    const screens = {
        start: document.getElementById('start-screen'),
        question: document.getElementById('question-screen'),
        result: document.getElementById('result-screen')
    };

    const elements = {
        qNumber: document.getElementById('q-number'),
        qText: document.getElementById('q-text'),
        btnA: document.getElementById('btn-a'),
        btnB: document.getElementById('btn-b'),
        progressBar: document.getElementById('progress-bar'),
        resultType: document.getElementById('result-type'),
        resultAlias: document.getElementById('result-alias'),
        resultDesc: document.getElementById('result-desc'),
        resultHumor: document.getElementById('result-humor'),
        resultImg: document.getElementById('result-img')
    };

    document.getElementById('start-btn').addEventListener('click', () => {
        scoreE = 0; scoreS = 0; scoreT = 0; scoreJ = 0;
        currentIdx = 0;
        generateTestSet();
        renderQuestion();
        showScreen('question');
    });

    elements.btnA.addEventListener('click', () => handleAnswer('a'));
    elements.btnB.addEventListener('click', () => handleAnswer('b'));
    document.getElementById('retry-btn').addEventListener('click', () => showScreen('start'));

    function showScreen(key) {
        Object.values(screens).forEach(s => s.classList.add('hidden'));
        screens[key].classList.remove('hidden');
    }

    function renderQuestion() {
        const q = selectedQuestions[currentIdx];
        elements.qNumber.innerText = `Q${currentIdx + 1}.`;
        elements.qText.innerText = q.text;
        elements.btnA.innerText = q.a;
        elements.btnB.innerText = q.b;

        const progress = ((currentIdx + 1) / selectedQuestions.length) * 100;
        elements.progressBar.style.width = `${progress}%`;
    }

    function handleAnswer(choice) {
        const q = selectedQuestions[currentIdx];
        const isB = choice === 'b';
        const addPoint = (q.bAdds && isB) || (!q.bAdds && !isB);

        if (addPoint) {
            if (q.trait === "E") scoreE++;
            if (q.trait === "S") scoreS++;
            if (q.trait === "T") scoreT++;
            if (q.trait === "J") scoreJ++;
        }

        currentIdx++;
        if (currentIdx < selectedQuestions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        const mbti =
            (scoreE >= 1 ? "E" : "I") +
            (scoreS >= 1 ? "S" : "N") +
            (scoreT >= 1 ? "T" : "F") +
            (scoreJ >= 1 ? "J" : "P");

        const data = resultData[mbti];
        elements.resultType.innerText = mbti;
        elements.resultAlias.innerText = data.alias;
        elements.resultDesc.innerText = data.desc;
        elements.resultHumor.innerText = data.humor;

        // Show Image
        elements.resultImg.src = `assets/characters/${mbti}.png`;
        elements.resultImg.alt = mbti;

        showScreen('result');
    }
});
