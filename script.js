const analysisBaseUrl = "https://gabr1elastasz3wska-del.github.io/CYBER-MIRROR-ANALYSIS/";

const questions = [
  {
    id: 1,
    title: "Wiadomość ze szkolnego systemu",
    scenario:
      "Otrzymujesz e-mail: „Twoje konto ucznia zostało zablokowane. Kliknij link, aby odzyskać dostęp w ciągu 10 minut”.",
    options: [
      { text: "Klikam link od razu", points: 0 },
      { text: "Ignoruję wiadomość, ale zapisuję sobie temat na później", points: 1 },
      { text: "Sprawdzam adres nadawcy i link", points: 2 }
    ],
    explain:
      "Najbezpieczniej najpierw sprawdzić nadawcę i adres strony. Jeśli ktoś każe Ci działać natychmiast, bardzo możliwe, że właśnie na to liczy."
  },
  {
    id: 2,
    title: "SMS o paczce",
    scenario:
      "Dostajesz SMS: „Twoja paczka nie zostanie dostarczona. Dopłać 1,23 zł natychmiast”.",
    options: [
      { text: "Sprawdzam status paczki na oficjalnej stronie firmy", points: 2 },
      { text: "Usuwam wiadomość bez sprawdzania", points: 1 },
      { text: "Klikam i płacę", points: 0 }
    ],
    explain:
      "Fałszywe SMS-y kurierskie są bardzo częste. Najbezpieczniej samodzielnie wejść na oficjalną stronę przewoźnika, a nie klikać w link z wiadomości."
  },
  {
    id: 3,
    title: "Kod BLIK od znajomego",
    scenario:
      "Znajomy pisze na komunikatorze: „Hej, pilne, podeślij szybko kod BLIK, oddam za chwilę”.",
    options: [
      { text: "Odpisuję, że nie mogę", points: 1 },
      { text: "Wysyłam kod, bo to przecież znajomy", points: 0 },
      { text: "Dzwonię i upewniam się, że to naprawdę on", points: 2 }
    ],
    explain:
      "W takich sytuacjach problemem nie jest technologia, tylko zaufanie. Przejęte konto znajomego może wyglądać zupełnie normalnie."
  },
  {
    id: 4,
    title: "Fałszywa strona logowania",
    scenario:
      "Wchodzisz na stronę przypominającą bank. Wszystko wygląda wiarygodnie, ale adres strony jest lekko zmieniony.",
    options: [
      { text: "Zamykam stronę", points: 1 },
      { text: "Sprawdzam dokładnie adres URL", points: 2 },
      { text: "Loguję się, skoro wygląda prawdziwie", points: 0 }
    ],
    explain:
      "Dziś wiele fałszywych stron wygląda bardzo profesjonalnie. To, co naprawdę ma znaczenie, to adres URL, a nie sam wygląd strony."
  },
  {
    id: 5,
    title: "Super okazja w sklepie",
    scenario:
      "Widzisz reklamę: „Nowy telefon 70% taniej, tylko dziś, zostały 3 sztuki”.",
    options: [
      { text: "Kupuję szybko, zanim zniknie oferta", points: 0 },
      { text: "Sprawdzam opinie o sklepie i domenę", points: 2 },
      { text: "Odkładam decyzję na później", points: 1 }
    ],
    explain:
      "To właśnie tu bardzo często zaczyna się problem: oferta wygląda świetnie, a czas rzekomo się kończy. Fałszywe sklepy uwielbiają taki mechanizm."
  },
  {
    id: 6,
    title: "Nagranie od dyrektora",
    scenario:
      "Dostajesz wiadomość z krótkim nagraniem audio rzekomo od dyrektora szkoły z prośbą o pilne przesłanie danych.",
    options: [
      { text: "Weryfikuję prośbę innym kanałem kontaktu", points: 2 },
      { text: "Ignoruję wiadomość", points: 1 },
      { text: "Wysyłam dane, bo głos brzmi wiarygodnie", points: 0 }
    ],
    explain:
      "To, że coś brzmi wiarygodnie, nie znaczy jeszcze, że jest prawdziwe. AI potrafi dziś bardzo dobrze imitować głos i styl wypowiedzi."
  }
];

let answers = {};
let finished = false;

function getProfile(percent) {
  if (percent >= 80) return "Ostrożny użytkownik";
  if (percent >= 50) return "Użytkownik średniego ryzyka";
  return "Impulsywny użytkownik";
}

function getResultDescription(percent) {
  if (percent >= 80) {
    return "Masz w sobie sporo cyfrowej czujności. Nie działasz odruchowo i potrafisz zauważyć moment, w którym ktoś próbuje wymusić na Tobie pośpiech albo zaufanie.";
  }
  if (percent >= 50) {
    return "Widać, że część zagrożeń rozpoznajesz, ale nie zawsze od razu. W codziennych sytuacjach online możesz działać dobrze, dopóki nie pojawi się presja czasu, emocje albo coś, co wygląda bardzo zwyczajnie.";
  }
  return "Najgroźniejsze nie jest to, że brakuje Ci wiedzy, tylko to, że można Cię wciągnąć w szybką decyzję. Cyberzagrożenia często przypominają wiadomość, link albo prośbę, która wydaje się normalna.";
}

function handleAnswer(questionId, optionIndex) {
  answers[questionId] = optionIndex;
  renderApp();
}

function finishQuiz() {
  if (Object.keys(answers).length !== questions.length) {
    alert("Najpierw odpowiedz na wszystkie pytania.");
    return;
  }

  finished = true;
  renderApp();
}

function getScore() {
  let totalPoints = 0;

  questions.forEach(function (q) {
    if (answers[q.id] !== undefined) {
      totalPoints += q.options[answers[q.id]].points;
    }
  });

  return Math.round((totalPoints / (questions.length * 2)) * 100) || 0;
}

function renderProjectInfo() {
  return `
    <div class="section">
      <h2 class="section-title">Dlaczego powstał CyberMirror User?</h2>
      <div class="info-panel">
        <p>
          Stworzyłam tę stronę z myślą o tym, że cyberzagrożenia nie wyglądają dziś jak coś z filmów o hakerach.
          Znacznie częściej przypominają zwykłą wiadomość, link, prośbę od znajomego albo pilny komunikat.
        </p>
        <p>
          Chciałam pokazać, że o bezpieczeństwie w sieci bardzo często nie decyduje sama wiedza techniczna,
          ale jeden moment: kliknąć czy sprawdzić, zaufać czy się zatrzymać.
        </p>
        <p>
          To trochę jak lustro — pokazuje nie to, co deklarujemy, tylko to, jak naprawdę reagujemy.
        </p>
      </div>
    </div>
  `;
}

function renderThreatCards() {
  return `
    <div class="section">
      <h2 class="section-title">Na co naprawdę najłatwiej się nabrać?</h2>
      <p class="section-text">
        Wiele zagrożeń nie wygląda groźnie. Ich siła polega na tym, że przypominają coś znajomego,
        pilnego albo po prostu bardzo wygodnego.
      </p>

      <div class="grid-4">
        <div class="threat-card">
          <div class="threat-icon">🎣</div>
          <h3 class="threat-title">Phishing</h3>
          <p class="threat-text">Wygląda jak zwykła wiadomość, ale liczy na Twój pośpiech i zaufanie.</p>
        </div>

        <div class="threat-card">
          <div class="threat-icon">💳</div>
          <h3 class="threat-title">Fałszywy sklep</h3>
          <p class="threat-text">Kusi ceną tak dobrą, że aż szkoda nie kliknąć. I właśnie na to liczy.</p>
        </div>

        <div class="threat-card">
          <div class="threat-icon">📱</div>
          <h3 class="threat-title">BLIK od znajomego</h3>
          <p class="threat-text">Wykorzystuje zaufanie, nie technologię. Czasem to najbardziej działa.</p>
        </div>

        <div class="threat-card">
          <div class="threat-icon">🌟</div>
          <h3 class="threat-title">Deepfake i AI</h3>
          <p class="threat-text">Coś brzmi albo wygląda wiarygodnie, ale wiarygodne wcale nie jest.</p>
        </div>
      </div>
    </div>
  `;
}

function renderFlow() {
  return `
    <div class="section">
      <h2 class="section-title">Jak ktoś próbuje Cię podejść krok po kroku?</h2>
      <p class="section-text">
        Większość ataków nie zaczyna się od skomplikowanego kodu. Zaczyna się od człowieka.
      </p>

      <div class="flow-grid">
        <div class="flow-step"><div class="flow-number">1</div><h3 class="flow-title">Wygląda normalnie</h3><div class="flow-text">Wiadomość przypomina coś, co już znasz.</div></div>
        <div class="flow-step"><div class="flow-number">2</div><h3 class="flow-title">Tworzy presję</h3><div class="flow-text">Pojawia się pośpiech: teraz, pilnie, ostatnia szansa.</div></div>
        <div class="flow-step"><div class="flow-number">3</div><h3 class="flow-title">Wymusza kliknięcie</h3><div class="flow-text">Masz kliknąć, zapłacić, podać kod albo zalogować się.</div></div>
        <div class="flow-step"><div class="flow-number">4</div><h3 class="flow-title">Przejmuje dostęp</h3><div class="flow-text">Można stracić konto, dane, pieniądze albo kontrolę nad profilem.</div></div>
        <div class="flow-step"><div class="flow-number">5</div><h3 class="flow-title">Zostawia skutki</h3><div class="flow-text">Problem często zaczyna dotyczyć też innych osób.</div></div>
      </div>
    </div>
  `;
}

function renderFlags() {
  return `
    <div class="section">
      <h2 class="section-title">5 znaków ostrzegawczych</h2>
      <p class="section-text">
        To są momenty, przy których naprawdę warto się zatrzymać.
      </p>

      <div class="red-flags">
        <div class="flag-box"><span class="flag-emoji">⏰</span>Pośpiech i presja</div>
        <div class="flag-box"><span class="flag-emoji">🔗</span>Dziwny albo skrócony link</div>
        <div class="flag-box"><span class="flag-emoji">🔐</span>Prośba o kod lub dane</div>
        <div class="flag-box"><span class="flag-emoji">👤</span>Nietypowa wiadomość od znanej osoby</div>
        <div class="flag-box"><span class="flag-emoji">💥</span>Oferta zbyt dobra, by była prawdziwa</div>
      </div>
    </div>
  `;
}

function renderQuiz() {
  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  let questionsHtml = "";

  questions.forEach(function (q) {
    let optionsHtml = "";

    q.options.forEach(function (option, index) {
      const isSelected = answers[q.id] === index;
      const selectedClass = isSelected ? "selected" : "";

      optionsHtml += `
        <button class="answer-btn ${selectedClass}" onclick="handleAnswer(${q.id}, ${index})">
          ${option.text}
        </button>
      `;
    });

    let explainHtml = "";
    if (answers[q.id] !== undefined) {
      explainHtml = `
        <div class="explain-box">
          <strong>Dlaczego?</strong> ${q.explain}
        </div>
      `;
    }

    questionsHtml += `
      <div class="card">
        <h2 class="card-title">${q.id}. ${q.title}</h2>
        <p class="card-text">${q.scenario}</p>
        ${optionsHtml}
        ${explainHtml}
      </div>
    `;
  });

  return `
    <div class="section" id="quiz">
      <h2 class="section-title">Co byś zrobił na moim miejscu?</h2>
      <p class="section-text">
        Większość osób jest przekonana, że by się nie nabrała. Dopóki nie znajdzie się dokładnie w takiej sytuacji.
      </p>

      <div class="quiz-wrap">
        <div class="progress-box">
          <p class="progress-label">Postęp: ${progress}%</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>

        ${questionsHtml}

        <div class="footer-box">
          <button class="finish-btn" onclick="finishQuiz()">Sprawdź wynik</button>
        </div>
      </div>
    </div>
  `;
}

function renderResult() {
  let totalPoints = 0;

  questions.forEach(function (q) {
    if (answers[q.id] !== undefined) {
      totalPoints += q.options[answers[q.id]].points;
    }
  });

  const percent = Math.round((totalPoints / (questions.length * 2)) * 100) || 0;
  const profile = getProfile(percent);

  const analysisBaseUrl = "https://gabr1elastasz3wska-del.github.io/CYBER-MIRROR-ANALYSIS/";
  const analysisUrl = analysisBaseUrl + "?score=" + percent;

  return `
    <div class="result-box">
      <div class="result-score">${percent}%</div>
      <div class="result-profile">${profile}</div>

      <p class="result-text">
        ${getResultDescription(percent)}
      </p>

      <a class="next-btn" href="${analysisUrl}">
        Dowiedz się więcej
      </a>

      <div class="small-note">
        Link kontrolny:<br>
        <span style="word-break: break-all;">${analysisUrl}</span>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <div class="footer">
      <strong>Autorka projektu:</strong> Gabriela Staszewska ★<br>
      uczennica klasy 3b<br>
      LO im. Adama Mickiewicza w Żychlinie
    </div>
  `;
}

function renderApp() {
  const app = document.getElementById("app");

  if (!finished) {
    app.innerHTML = `
      <div class="container">
        <div class="hero">
          <div class="stars">
            <span class="star s1">★</span>
            <span class="star s2">★</span>
            <span class="star s3">★</span>
            <span class="star s4">★</span>
            <span class="star s5">★</span>
          </div>

          <div class="badge">Projekt konkursowy • Cyberbezpieczeństwo</div>
          <h1 class="title">CyberMirror User</h1>
          <p class="subtitle">
            Zanim klikniesz — sprawdź, kto naprawdę jest po drugiej stronie ekranu.
            Ta strona pokazuje, jak łatwo można dać się złapać na coś, co wygląda zwyczajnie.
          </p>
          <a class="hero-button" href="#quiz">Rozpocznij symulację</a>
          <div class="author-note">projekt Gabrieli Staszewskiej</div>
        </div>

        ${renderProjectInfo()}
        ${renderThreatCards()}
        ${renderFlow()}
        ${renderFlags()}
        ${renderQuiz()}
        ${renderFooter()}
      </div>
    `;
  } else {
    app.innerHTML = `
      <div class="container">
        <div class="hero">
          <div class="stars">
            <span class="star s1">★</span>
            <span class="star s2">★</span>
            <span class="star s3">★</span>
            <span class="star s4">★</span>
            <span class="star s5">★</span>
          </div>

          <div class="badge">Wynik symulacji</div>
          <h1 class="title">CyberMirror User</h1>
          <p class="subtitle">
            Twoje decyzje w sieci mówią o Tobie więcej, niż może się wydawać.
          </p>
        </div>

        ${renderResult()}
        ${renderFooter()}
      </div>
    `;
  }
}

renderApp();
