document.addEventListener("DOMContentLoaded", function() {
    loadProblems();
});

function showPopup() {
    document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}

function showPasswordPopup() {
    document.getElementById("password-popup").style.display = "flex";
}

function hidePasswordPopup() {
    document.getElementById("password-popup").style.display = "none";
}

function addProblem() {
    var week = document.getElementById("week").value;
    var title = document.getElementById("title").value;
    var link = document.getElementById("link").value;
    var explanation = document.getElementById("explanation").value;
    var code = document.getElementById("code").value;
    var codeExplanation = document.getElementById("codeExplanation").value;

    var problemHTML = `
        <div class="problem">
            <h3>${title}</h3>
            <p>문제 링크: <a href="${link}" target="_blank">${link}</a></p>
            <div class="explanation">
                <h4>문제 해설</h4>
                <p>${explanation}</p>
            </div>
            <div class="code">
                <h4>코드</h4>
                <pre><code>${code}</code></pre>
            </div>
            <div class="explanation">
                <h4>코드 해설</h4>
                <p>${codeExplanation}</p>
            </div>
        </div>
    `;

    document.getElementById(week).insertAdjacentHTML('beforeend', problemHTML);
    saveProblem(week, title, link, explanation, code, codeExplanation);
    hidePopup();
}

function saveProblem(week, title, link, explanation, code, codeExplanation) {
    var problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems.push({ week, title, link, explanation, code, codeExplanation });
    localStorage.setItem("problems", JSON.stringify(problems));
}

function loadProblems() {
    var problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems.forEach(problem => {
        var problemHTML = `
            <div class="problem">
                <h3>${problem.title}</h3>
                <p>문제 링크: <a href="${problem.link}" target="_blank">${problem.link}</a></p>
                <div class="explanation">
                    <h4>문제 해설</h4>
                    <p>${problem.explanation}</p>
                </div>
                <div class="code">
                    <h4>코드</h4>
                    <pre><code>${problem.code}</code></pre>
                </div>
                <div class="explanation">
                    <h4>코드 해설</h4>
                    <p>${problem.codeExplanation}</p>
                </div>
            </div>
        `;
        document.getElementById(problem.week).insertAdjacentHTML('beforeend', problemHTML);
    });
}

function deleteProblem() {
    var week1Problems = document.getElementById("week1").getElementsByClassName("problem");
    var week2Problems = document.getElementById("week2").getElementsByClassName("problem");

    if (week2Problems.length > 0) {
        week2Problems[week2Problems.length - 1].remove();
        removeProblemFromStorage(week2Problems.length - 1, "week2");
    } else if (week1Problems.length > 0) {
        week1Problems[week1Problems.length - 1].remove();
        removeProblemFromStorage(week1Problems.length - 1, "week1");
    } else {
        alert("삭제할 문제가 없습니다.");
    }

    location.reload(); // 페이지 새로 고침
}

function removeProblemFromStorage(index, week) {
    var problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems = problems.filter((problem, i) => !(i === index && problem.week === week));
    localStorage.setItem("problems", JSON.stringify(problems));
}

function verifyPassword() {
    var password = document.getElementById("password").value;
    if (password === "skibidiToilet") {
        hidePasswordPopup();
        deleteProblem();
    } else {
        alert("암호가 틀렸습니다.");
    }
}
